var twilioRoutes = require('./routes/twillio.js');

module.exports.init = function(app) {
  app.use('/logText', twilioRoutes);
}
