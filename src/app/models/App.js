define(function(require, exports, module){

  var Day = require('app/models/Day');
  var Week = require('app/models/Week');

  module.exports = Backbone.Model.extend({

    defaults: {
      selectedDate: null,
      currentWeek: null,
      previousWeek: null,
      nextWeek: null
    },

    initialize: function(params) {
      if(params["selectedDate"]){
        params.selectedDate.hour(12).minute(00);
        this.set({
          currentWeek: this.createWeekFromDate(params.selectedDate, true),
          previousWeek: this.createWeekFromDate(moment(params.selectedDate).add(-1, 'week')),
          nextWeek: this.createWeekFromDate(moment(params.selectedDate).add(1, 'week'))
        });

      }
    },

    createWeekFromDate: function(date, selected){
      var week = new Week();

      var dayOfWeek = date.day();
      if(dayOfWeek > 0){
        for (var i = 0; i < dayOfWeek; i++) {
          var current = moment(date).add(i - dayOfWeek, 'day');
          var pastDay = new Day({
            id: current.valueOf(),
            date: current,
            selected: false
          });
          week.add(pastDay);
        }
      }

      week.add(new Day({
        id: date.valueOf(),
        date: moment(date),
        selected: selected
      }));

      if(dayOfWeek < 6){
        for (var i = 1; i + dayOfWeek <= 6; i++) {
          var current = moment(date).add(i, 'day');
          var futureDay = new Day({
            id: current.valueOf(),
            date: current,
            selected: false
          });
          week.add(futureDay);
        }
      }

      return week;
    }



  });

});
