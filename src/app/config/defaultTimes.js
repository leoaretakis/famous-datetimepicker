define(function(require, exports, module) {

  var times = [];

  var baseTime = moment('2000-01-01T00:00:00');
  var temp = moment(baseTime);

  while(temp.isSame(baseTime, 'day')){
    times.push({
      ampmTime: temp.format('LT'),
      completeTime: temp.format('HH:mm')
    });

    temp = temp.add(30, 'minute');
  }

  module.exports = times;
});
