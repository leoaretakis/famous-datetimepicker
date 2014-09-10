define(function(require, exports, module) {
  var View              = require('famous/core/View');
  var SequentialLayout  = require("famous/views/SequentialLayout");
  var Surface         = require('famous/core/Surface');
  var Utility          = require('famous/utilities/Utility');
  var Modifier            = require('famous/core/Modifier');
  var RenderNode            = require('famous/core/RenderNode');
  var StateModifier            = require('famous/modifiers/StateModifier');
  var ContainerSurface     = require("famous/surfaces/ContainerSurface");
  var Transform           = require('famous/core/Transform');

  var TimeListView  = require('app/views/TimeListView');
  var WeekView      = require('app/views/WeekView');

  function ContentView() {
    View.apply(this, arguments);

    _createLayout.call(this);
    _createMonthYearView.call(this);
    _createDateSelectionView.call(this);
    _createResultView.call(this);
    _createTimeView.call(this);
  }

  ContentView.prototype = Object.create(View.prototype);
  ContentView.prototype.constructor = ContentView;

  ContentView.DEFAULT_OPTIONS = {};

  function _createLayout(){
    this.views = [];
    this.layout = new SequentialLayout();
    var layoutModifier = new StateModifier({
      transform: Transform.translate(0, 0, 0.1)
    });
    this.add(layoutModifier).add(this.layout);
    this.layout.sequenceFrom(this.views);
  }

  function _createMonthYearView(){
    this.monthYearView = new Surface({
      size: [undefined, 50],
      content: 'Mar 2014',
      properties: {
        marginLeft: '12px',
        fontFamily: 'helvetica',
        marginTop: '20px'
      }
    });

    this.views.push(this.monthYearView);
  }

  function _createDateSelectionView(){
    this.dateSelectionView = new WeekView({
      size: [undefined, 80]
    });

    this.views.push(this.dateSelectionView);
  }

  function _createResultView(){
    var sur = new Surface({
      size: [undefined, 60],
      content: 'Friday, March 28th<br/>12:00 PM', //TODO templates
      properties: {
        textAlign: 'center',
        fontFamily: 'helvetica',
        marginTop: '10px'
      }
    });

    var node = new RenderNode();
    node.add(Utility.transformInFront).add(sur)

    this.views.push(node);
  }

  function _createTimeView(){
    this.timeListView = new TimeListView();

    var node = new RenderNode();
    node.add(Utility.transformBehind).add(this.timeListView)

    this.views.push(node);
  }

  module.exports = ContentView;

});
