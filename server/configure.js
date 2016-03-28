
//To keep the server lighweight we'll make a configure module
//that takes the app and then returns the app with all the config set up
var routes = require('../routes');
var logger = require('morgan');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

module.exports = function(app) {
  //allows cross origin requests
  app.use(logger('dev'));
  //used to parse json requests to the api
  app.use(bodyParser.json());
  //used to parse x-www-form-urlencoded requests to the api
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  //init the routes
  routes.init(app);

  if ('development' === app.get('env')) {
    app.set('json spaces', 2);
  }

  return app;
}
