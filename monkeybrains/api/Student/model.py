from api.database import db


class Student(db.Model):
    """TODO"""

    __tablename__ = "student"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name_first = db.Column(db.String(), nullable=True)
    name_last = db.Column(db.String(), nullable=True)
    rank_stripes = db.Column(db.Integer, nullable=True)
    rank_type = db.Column(db.String(), nullable=True)
    program = db.Column(db.String(), nullable=True)

    def __repr__(self):
        """<Student id=1 name=Bobby Fisher>"""
        return "<Student id={0} name={1}>".format(self.id, self.name_first + ' ' + self.name_last)
