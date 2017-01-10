from api.database import db


class ClassSchedule(db.Model):
    """tbd"""

    __tablename__ = "class_schedule"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=True)
    day_of_week = db.Column(db.String(9), nullable=False)
    time = db.Column(db.Time, nullable=False)
    coach_id = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<ClassSchedule id={} day_of_week={} time={}>".format(self.id, self.day_of_week, self.time)
