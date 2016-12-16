# import sqlite3
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def connect_db(app):
    """Connects to the specific database."""
    # rv = sqlite3.connect(app.config['DATABASE'])
    # rv.row_factory = sqlite3.Row
    # return rv

    # app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/monkeys'
    # app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    from server import app
    connect_db(app)

    print('Connected to database.')
