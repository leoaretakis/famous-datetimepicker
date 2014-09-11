define(function(require, exports, module) {

  var times = [];

  var baseTime = moment('2000-01-01T05:00:00');
  var temp = moment(baseTime);

  baseTime.add(1, 'day');

  while(temp.isBefore(baseTime)){
    times.push({
      ampmTime: temp.format('LT'),
      completeTime: temp.format('HH:mm'),
      hour: temp.hour(),
      minute: temp.minute()
    });

    temp = temp.add(30, 'minute');
  }

  module.exports = times;
});
