define(function(require, exports, module) {
  var View              = require('famous/core/View');
  var SequentialLayout  = require("famous/views/SequentialLayout");
  var Surface         = require('famous/core/Surface');

  var DateView        = require('./DateView')

  function PageContentView() {
    View.apply(this, arguments);

    _createLayout.call(this);
    _createDateView.call(this);
    _createResultView.call(this);
    _createTimeView.call(this);
  }

  PageContentView.prototype = Object.create(View.prototype);
  PageContentView.prototype.constructor = PageContentView;

  PageContentView.DEFAULT_OPTIONS = {};

  function _createLayout(){
    this.views = [];
    this.layout = new SequentialLayout();
    // var layoutModifier = new StateModifier({
    //   transform: Transform.translate(0, 0, 0.1)
    // });
    this.add(this.layout);
    this.layout.sequenceFrom(this.views);
  }

  function _createDateView(){
    this.dateView = new DateView();
    // var sur = new Surface({
    //   size: [undefined, 120],
    //   content: 'Leo',
    //   properties: {
    //     backgroundColor: 'red'
    //   }
    // });
    this.views.push(this.dateView);
  }

  function _createResultView(){
    var sur = new Surface({
      size: [undefined, 60],
      properties: {
        backgroundColor: 'blue'
      }
    });
    this.views.push(sur);
  }

  function _createTimeView(){
    var sur = new Surface({
      properties: {
        backgroundColor: 'white'
      }
    });
    this.views.push(sur);
  }

  module.exports = PageContentView;

});
