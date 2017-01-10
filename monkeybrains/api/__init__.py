from .database import connect_db
from server import app
from .Student.endpoint import get_students
from .Coach.endpoint import get_coach
from .ClassSchedule.endpoint import get_class_schedule, get_class_instance
