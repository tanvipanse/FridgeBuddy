from flask import Flask, request, jsonify
from google import genai
from pydantic import BaseModel
from config import Config
from database import recipes_collection

app = Flask(__name__)

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
            You are not required to utilize every single ingredient.
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
    for recipe in recipes:
        recipes_collection.insert_one(recipe.dict()) #adds each recipe as a dictionary to the mongodb recipes collection -- each recipe is a document in mongo

    return jsonify([recipe.dict() for recipe in recipes]) #returns the recipes as json so that they can be accessed by the frontend
