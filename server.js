const fs = require('fs');
const join = require('path').join;
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');

const config = require('./config');
const models = join(__dirname, 'app/models');
const env = process.env.NODE_ENV || 'development'; // unused todo to check app.locals from http://expressjs.com/zh-tw/4x/api.html
const port = config.port;
const app = express();

// sass setup
app.use(sassMiddleware({
    src: __dirname + '/sass',
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed'
}));

// view engine setup
app.engine('ejs', require('express-ejs-extend')); // todo maybe can find a batter way to inject layout.ejs from each page
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// todo uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;

// bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));

// routes setup
require('./config/routes')(app, express);

// server setup
connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

function listen () {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('Express app started on port ' + port);
}

function connect () {
    const options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect(config.db, options).connection;
}
