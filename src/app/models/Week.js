define(function(require, exports, module) {

  var Day = require('app/models/Day')

  module.exports = Backbone.Collection.extend({
    model: Day,

    month: function(){
      var total = _.reduce(this.models, function(acum, item){
        return acum + item.get('date').month();
      }, 0);

      return Math.round(total/this.length);
    },

    year: function(){
      var total = _.reduce(this.models, function(acum, item){
        return acum + item.get('date').year();
      }, 0);

      return Math.round(total/this.length);
    }
  });

});
