from server import app
from .model import Student


@app.route('/student')
def get_students():
    ringo = Student.query.filter(Student.name_first == 'Ringo').one()
    return ringo.name_first
