from flask import Blueprint, request, jsonify, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from .models import User
from flask_jwt_extended import create_access_token


auth = Blueprint('auth', __name__)  

@auth.route('/login', methods=['POST'])   
def login():
    reqData = request.get_json( )
    email= reqData['email']
    password= reqData['password']

    if(email == '' or password == ''):
        return {'message': 'Please enter all fields'},400
    
    userAlreadyExists = User.query.filter_by(email=email).first()

    if not userAlreadyExists:
        return {'message': 'User does not exist'},400
    
    if not check_password_hash(userAlreadyExists.password, password):
        return {'message': 'Incorrect password'},400
        

    
    access_token = create_access_token(identity=userAlreadyExists.id)
   
    return {'message': 'Success', "userId":userAlreadyExists.id,"userName":userAlreadyExists.name,"email":userAlreadyExists.email, "token": access_token},200
    



@auth.route('/register', methods=['POST'])
def register():
    reqData = request.get_json( )
    print("reqData: ", reqData)
    hashed_password = generate_password_hash(reqData['password'], method='sha256')

    userAlreadyExists = User.query.filter_by(email=reqData['email']).first()

    if userAlreadyExists:
        existing_email = userAlreadyExists.email
        print("Existing email:", existing_email)
        return {'message': 'User already exists', 'email': userAlreadyExists.email},400

    new_user = User(name=reqData['name'], email=reqData['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.id)
    print("new_user: ", new_user)
  
    return {'message': 'User created successfully', "userId":new_user.id,"userName":new_user.name,"email":new_user.email, "token": access_token},201


