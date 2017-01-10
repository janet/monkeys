import json

from api.database import db, connect_db
from api.Student.model import Student
from api.Coach.model import Coach
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


def load_coach():
    """Load coach from seed_data into database."""
    tablename = 'coach'
    data = jsonify_seed_data(tablename)

    for item in data[tablename]:
        new_item = Coach(
            name_first=item['name_first'],
            name_last=item['name_last'],
            email=item['email']
            )
        db.session.add(new_item)
    db.session.commit()


# def load_student_class_instance():
#     """Load student class instance type from seed_data into database."""
#     tablename = 'student_class_instance'
#     data = jsonify_seed_data(tablename)

#     for item in data[tablename]:
#         new_item = StudentClassInstance(
#             student_id=item['student_id'],
#             class_instance_id=item['class_instance_id'],
#             attendance_id=item['attendance_id']
#             )
#         db.session.add(new_item)
#     db.session.commit()


# def load_student_class_schedule():
#     """Load student class schedule type from seed_data into database."""
#     tablename = 'student_class_schedule'
#     data = jsonify_seed_data(tablename)

#     for item in data[tablename]:
#         new_item = StudentClassSchedule(
#             student_id=item['student_id'],
#             class_schedule_id=item['class_schedule_id']
#             )
#         db.session.add(new_item)
#     db.session.commit()


# def load_class_schedule():
#     """Load class schedule from seed_data into database."""
#     tablename = 'class_schedule'
#     data = jsonify_seed_data(tablename)

#     for item in data[tablename]:
#         new_item = ClassSchedule(
#             name=item['name'],
#             day_of_week=item['day_of_week'],
#             time=item['time']
#             )
#         db.session.add(new_item)
#     db.session.commit()


# def load_class_instance():
#     """Load class instance from seed_data into database."""
#     tablename = 'class_instance'
#     data = jsonify_seed_data(tablename)

#     for item in data[tablename]:
#         new_item = ClassInstance(
#             class_schedule_id=item['class_schedule_id'],
#             date=item['date']
#             )
#         db.session.add(new_item)
#     db.session.commit()


if __name__ == "__main__":
    connect_db(app)
    db.drop_all()
    db.create_all()

    load_student()
    load_coach()
