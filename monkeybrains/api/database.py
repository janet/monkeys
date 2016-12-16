# import sqlite3
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def connect_db(app):
    """Connects to the specific database."""
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    from server import app
    connect_db(app)

    print('Connected to database.')
