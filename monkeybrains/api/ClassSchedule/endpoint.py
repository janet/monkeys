from server import app
from .model import ClassSchedule


@app.route('/class_schedule')
def get_class_schedule():
    class_schedule = ClassSchedule.query.filter(ClassSchedule.name == 'Youth Jiu Jitsu').first()
    return class_schedule.name
