# To start development

## Database
Create local postgres database @ postgresql://localhost/monkeys

    $ createdb monkeys

Add dummy data to database

    $ cd monkeybrains
    $ python seed_database.py


## Api Server

Run server @ http://localhost:5000/

    $ python monkeybrains/api/runserver.py

## React Server

Run server @ http://localhost:3000/

    $ npm run start

Run tests

    $ npm run test

    # Run only the Button component tests
    $ npm run test:watch -- --grep Button

