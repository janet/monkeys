import json

from api.database import db, connect_db
from api.Student.model import Student
from server import app


def jsonify_seed_data(tablename):
    """tbd"""
    with open("seed_data/{}.json".format(tablename)) as data_file:
        data = json.load(data_file)

    return data


def load_student():
    """Load student from seed_data into database."""
    tablename = 'student'
    data = jsonify_seed_data(tablename)

    for item in data[tablename]:
        new_item = Student(
            name_first=item['name_first'],
            name_last=item['name_last'],
            rank_stripes=item['rank_stripes'],
            rank_type=item['rank_type'],
            program=item['program'],
            )
        db.session.add(new_item)
    db.session.commit()


if __name__ == "__main__":
    connect_db(app)
    db.drop_all()
    db.create_all()

    # import pdb; pdb.set_trace()

    load_student()
