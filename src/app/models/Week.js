define(function(require, exports, module) {

  var Time = require('app/models/Day')

  module.exports = Backbone.Collection.extend({
    model: Day
  });

});
