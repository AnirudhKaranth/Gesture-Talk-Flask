from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager




db= SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)


    app.config['SECRET_KEY']="secret"
    app.config["JWT_SECRET_KEY"] = "super-secret"
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    db.init_app(app)
    jwt = JWTManager(app)

    from . import models

    with app.app_context():
        db.create_all()

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    return app