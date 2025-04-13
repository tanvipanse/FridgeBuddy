from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from pydantic import BaseModel
from config import Config
from database import recipes_collection
from bson import ObjectId

app = Flask(__name__)
CORS(app, resources={r"/*": {
    "origins" : ["http://localhost:3000", "http://localhost:5000", "http://127.0.0.1:5000"],
    "methods": ["GET", "POST"]
}})


class Recipe(BaseModel):
    recipe_name: str
    concept: str
    ingredients: list[str]
    instructions: list[str]


client = genai.Client(api_key=Config.GEMINI_API_KEY)

@app.route("/your-fridge", methods=["POST"])
def generate_recipes():
    data = request.get_json()

    ingredients = data['ingredients']
    ingredients_str = ",".join(ingredients)

    prompt = f"""I have {ingredients_str} in my fridge. 
            Give me 3 recipes that i can make using ideally only these ingredients. 
            You are not required to utilize every single ingredient. Please do not 
            give me repeated recipes. 
            """

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
        config={
            'response_mime_type' : 'application/json',
            'response_schema' : list[Recipe],
        },
    )

    print(response.text)

    recipes: list[Recipe] = response.parsed
    inserted_ids = []
    for recipe in recipes:
        result = recipes_collection.insert_one(recipe.dict()) #adds each recipe as a dictionary to the mongodb recipes collection -- each recipe is a document in mongo
        inserted_ids.append(str(result.inserted_id)) #adds the recipe IDs to the inserted ids array so they can be accessed later

    return jsonify({"ids" : inserted_ids}) #returns the recipe IDS as json so that they can be accessed by the frontend


@app.route("/get-recipes", methods=["GET"])
def get_recipes():
    ids = request.args.get('ids', "").split(",")
    object_ids = [ObjectId(id.strip()) for id in ids if id.strip()]

    recipes = list(recipes_collection.find({"_id": {"$in": object_ids}})) #mongodb query - find all docs where _id field is in list object_ids

    for recipe in recipes: 
        recipe["_id"] = str(recipe["_id"])

    return jsonify(recipes)



if __name__ == "__main__":
    app.run(debug=True, port=5000)
