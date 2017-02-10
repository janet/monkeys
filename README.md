# To start development

## Database
Create local postgres database @ postgresql://localhost/monkeys (first time only)

    $ createdb monkeys

Add dummy data to database - can be re-run to reset database

    $ cd monkeybrains
    $ python seed_database.py


## Api Server
First time only, install requirements

	$ cd monkeybrains
	$ virtualenv env
	$ source env/bin/activate
	$ (env) pip install -r requirements.txt

Run server @ http://localhost:5000/

	$ source env/bin/activate
	$ (env) python api/runserver.py

Run tests

    $ (env) pytest

## React Server

Run server @ http://localhost:3000/

    $ npm run start

Run tests

    $ npm run test

    # Run only the Button component tests
    $ npm run test:watch -- --grep Button


## Gotchas

**Issue:**

CORS error when using google chrome in development

    Fetch API cannot load http://localhost:5000/student_class_schedule. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

**Solution:**

Download chrome extension Allow-Control-Allow-Origin:* and enable it when developing
