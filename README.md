## Dependencies

* [Python 3.9](https://www.python.org/downloads/)
* [Poetry](https://python-poetry.org/docs/#installation)
* [Yarn Classic](https://classic.yarnpkg.com/en/docs/install/)


## Setup instructions

0. Clone the project
1. poetry install
2. cp .env.example .env
3. yarn --cwd flask_webpack_turbolinks/ install
4. poetry run python honcho start
5. Visit http://localhost:5000
