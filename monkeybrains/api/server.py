# all the imports
import os
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash


# create our little application :)
app = Flask(__name__, instance_relative_config=True)
app.config.from_object('config')
app.config.from_pyfile('config.py')

# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'monkeys.db'),
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))

# import from api package at the end of the file here to
# circumvent circular import issues
# http://flask.pocoo.org/docs/0.11/patterns/packages/#larger-applications
# import api.views
