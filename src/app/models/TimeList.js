define(function(require, exports, module) {

  var Time = require('app/models/Time')

  module.exports = Backbone.Collection.extend({
    model: Time
  });

});
