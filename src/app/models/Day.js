define(function(require, exports, module) {

  module.exports = Backbone.Model.extend({
    defaults: {
      date: null,
      selected: false
    }
  });

});
