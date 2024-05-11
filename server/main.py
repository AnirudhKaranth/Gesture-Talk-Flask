from flask import Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


main = Blueprint('main', __name__)

@main.route('/',methods=['GET'])
@jwt_required()
def index():
    current_user = get_jwt_identity()
    return {"msg":"Hello, World!", "current_user": current_user}