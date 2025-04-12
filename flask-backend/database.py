from flask import Flask
from pymongo import MongoClient
from config import Config


client = MongoClient(Config.MONGO_URI)
db = client['fridge-buddy-ai']
recipes_collection = db['recipes'] #recipes collection from fridge-buddy-ai database


# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi

# uri = "mongodb+srv://tpanse:<db_password>@ingredient-cluster.ivi9m2b.mongodb.net/?appName=ingredient-cluster"

# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))

# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

