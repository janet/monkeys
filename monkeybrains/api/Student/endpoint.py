from server import app
from .model import Student


@app.route('/')
def show_entries():
    ringo = Student.query.filter(Student.name_first == 'Ringo').one()
    import pdb; pdb.set_trace()
    return ringo.name_first
