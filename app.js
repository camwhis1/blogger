require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

var apiRouter = require('./app_api/routes/index');

var app = express();

 app.use(morgan('tiny'));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

 app.use(express.static(path.join(__dirname, 'public')));
 app.use(express.static(path.join(__dirname, 'app_client')));

 app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
 app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
 app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
 app.use('/css', express.static(__dirname + '/public/stylesheets'));
 app.use('/webfonts', express.static(__dirname + '/public/fonts/webfonts/'));

 app.use('/js', express.static(__dirname + '/node_modules/angular'));
 app.use('/js', express.static(__dirname + '/node_modules/angular-route'));
 app.use('/js', express.static(__dirname + '/node_modules/angular-ui-router/release'));
 app.use('/js', express.static(__dirname + '/app_client'));
 app.use('/nav', express.static(__dirname + '/app_client/common/nav')); 
 app.use('/auth', express.static(__dirname + '/app_client/common/auth'));

app.use(passport.initialize());

 app.use('/api', apiRouter);

app.use(function(req, res) {
	res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
}); 
 
// catch favicon requests and respond
 app.use('/favicon.ico', (req, res) => res.status(204));

 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
   next(createError(404));
   });

   // error handler
   app.use(function(err, req, res, next) {
     // set locals, only providing error in development
       res.locals.message = err.message;
         res.locals.error = req.app.get('env') === 'development' ? err : {};
           // render the error page
             res.status(err.status || 500);
               res.render('error');
               });

module.exports = app;
