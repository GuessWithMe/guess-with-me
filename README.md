# GuessWithMe


## Installation

```bash
# Clone this repository
$ git clone https://github.com/GuessWithMe/guess-with-me

# Go into the repository
$ cd guess-with-me

# Make sure you have the latest docker up and running
$ docker-compose up
```
Open a new terminal, go to project root folder and start backend
```bash
$ cd api
$ yarn && yarn start
```
In a different terminal window start frontend
```bash
$ cd ui-react
$ yarn && yarn start
```

## Setting up DB

1. Open your favorite db client and create a Postgres db - name should match the environment config (guess-dev).
```javascript
// api/src/config/env/development.ts
postgres: {
	database:  'guess-dev',
	...
},
```

2. Open *api/src/config/sequelize.ts* in the editor of your choice and uncomment this line:
```javascript
 // await this.client.sync({ force: true });
```
3. Check in your db that tables have been created, comment it out again.

4. Lastly, to seed the database:
```bash
$ cd api
$ yarn db:seed
```

Note: You can repeat steps 2-4, whenever you need to recreate database tables (for example, models have changed)
