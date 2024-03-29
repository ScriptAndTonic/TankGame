require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const swaggerOptions = {
    info: {
        version: '1.0.0',
        title: 'Tank Game',
        description: 'A simple tank game'
    },
    filesPattern: './**/*.js',
    swaggerUIPath: '/swagger',
    baseDir: __dirname,
    servers: [{
        url: 'http://localhost:' + (process.env.PORT || 3000),
        description: 'The current instance of the game',
    }]
};

var db = require('./db/db');

var indexRouter = require('./routes/index');
var tanksRouter = require('./routes/tanks');
var mapsRouter = require('./routes/maps');
var sessionsRouter = require('./routes/sessions');

var app = express();

expressJSDocSwagger(app)(swaggerOptions);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tanks', tanksRouter);
app.use('/maps', mapsRouter);
app.use('/sessions', sessionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

db.init();

module.exports = app;