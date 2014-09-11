define(function(require, exports, module){

  var Day = require('app/models/Day');
  var Week = require('app/models/Week');

  function createWeekFromDate(date, selected){
    var week = new Week();

    var dayOfWeek = date.day();
    if(dayOfWeek > 0){
      for (var i = 0; i < dayOfWeek; i++) {
        var pastDay = new Day({
          date: moment(date).add(i - dayOfWeek, 'day'),
          selected: false
        });
        week.add(pastDay);
      }
    }

    week.add(new Day({
      date: moment(date),
      selected: selected
    }));

    if(dayOfWeek < 6){
      for (var i = 1; i + dayOfWeek <= 6; i++) {
        var futureDay = new Day({
          date: moment(date).add(i, 'day'),
          selected: false
        });
        week.add(futureDay);
      }
    }

    return week;
  }

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
          currentWeek: createWeekFromDate(params.selectedDate),
          previousWeek: createWeekFromDate(moment(params.selectedDate).add(-1, 'week')),
          nextWeek: createWeekFromDate(moment(params.selectedDate).add(1, 'week'))
        });

      }
    }

  });

});
