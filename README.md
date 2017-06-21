# Nodejs Express Mongoose CRUD Example

This is a simple example can create an article, read an article, update an article, delete an article.

## Requirements

* [NodeJs](http://nodejs.org) >= 6.x 
* [mongodb](http://mongodb.org)

## Install

```sh
$ git clone https://github.com/dawnpioneer/nodejs-crud.git
$ npm install
```

## Change Settings

under `/config/env/development.js`, change the db setting:

```
mongodb://username:password@ds159208.mlab.com:59208/database-name
```

replace `username`, `password` and `database-name` to connect your database. 

or just connect the test db: `mongodb://root:123456@ds159208.mlab.com:59208/star-wars-quotes`

then run the server:

```sh
$ npm start
```

and visit [http://localhost:3000/](http://localhost:3000/)
