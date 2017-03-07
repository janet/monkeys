# About

Monkeys is a frontend app that connects to the [Monkeybrains api server](https://github.com/janet/monkeys)

# To start development locally

1. Clone this repo `git clone git@github.com:janet/monkeys.git`
1. Run nginx (instructions @ [Monkeybrains](https://github.com/janet/monkeybrains))
1. Run api server (instructions @ [Monkeybrains](https://github.com/janet/monkeybrains))
1. Create and seed database (instructions @ [Monkeybrains](https://github.com/janet/monkeybrains))
1. Run frontend server @ localhost:3000 (instructions below)
1. Monkeys frontend app connected to Monkeybrains api server running on nginx proxy server @ localhost:8080


## React Server

Run server @ http://localhost:3000/

    $ npm run start

Run tests

    $ npm run test

    # Run only the Button component tests
    $ npm run test:watch -- --grep Button


# Deployed Versions

## Heroku

https://sbg-monkeys.herokuapp.com/
