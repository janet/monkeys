from server import app
from .model import Student


@app.route('/')
def show_entries():
    ringo = Student.query.filter(Student.name_first == 'Ringo').one()
    return ringo.name_first
