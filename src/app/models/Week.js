define(function(require, exports, module) {

  var Day = require('app/models/Day')

  module.exports = Backbone.Collection.extend({
    model: Day
  });

});
