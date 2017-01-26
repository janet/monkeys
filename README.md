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

## React Server

Run server @ http://localhost:3000/

    $ npm run start

Run tests

    $ npm run test

    # Run only the Button component tests
    $ npm run test:watch -- --grep Button

