# Expense Tracker Back End

Project developed using Node.js with the intent of improving my skills.

It is a simple REST API originally developed to work with [front-end repository](https://github.com/renato-mm/expense-tracker-front-end).

It uses Express framework for routing and middleware communication.

It is composed of two routes:
- ```'/api/expenses'```: with which you can use POST, GET and DELETE to add a expense, get expenses or delete all expenses;
- ```'/api/expenses/:id'```: with which you can use PUT, GET and DELETE to update, get or delete the expense which id matches ```':id'```;

Those routes are connected to a MySQL database and it is used Sequelize as an ORM.

References:
- [Node.js Rest APIs example with Express, Sequelize & MySQL](https://bezkoder.com/node-js-express-sequelize-mysql/).

## Dependencies

It was developed with this software versions:
```
node: 13.14.0
npm: 6.14.5
body-parser: 1.19.0,
cors: 2.8.5,
express: 4.17.1,
mysql2: 2.1.0
sequelize: 5.21.13
```

## Development server

Run `node server.js` for a dev server.
