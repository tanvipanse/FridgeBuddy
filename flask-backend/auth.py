from flask import Flask

app = Flask(__name__)
@app.route("/signup", methods=["POST"])

@app.route("/login", methods=["POST"])


# hash_password(password) - use bcrypt or something
# verify_password(plain_pw, hashed_pw) - check if pass is valid
# generate_token(user_id) - create JWT using jwt.encode()
# decode_token(token) - decode and validate token
# token_required(func) - decorator to protect routes that require auth

def hash_password(password):
    return ""