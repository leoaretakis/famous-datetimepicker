define(function(require, exports, module) {
  var Surface          = require('famous/core/Surface');
  var Modifier         = require('famous/core/Modifier');
  var Transform        = require('famous/core/Transform');
  var View             = require('famous/core/View');
  var SequentialLayout = require('famous/views/SequentialLayout');
  var Utility          = require('famous/utilities/Utility');
  var Transitionable   = require('famous/transitions/Transitionable');

  function TimeView(model) {
    View.apply(this);

    this.model = model;

    this.transform = new Transitionable([0, 0, 0]);
    this.size = new Transitionable(50);

    this.timeModifier = new Modifier();
    this.timeModifier.transformFrom(function() {
      var currentValue = this.transform.get();
      return Transform.translate(currentValue[0], currentValue[1], currentValue[2]);
    }.bind(this));

    this.timeModifier.sizeFrom(this.getSize());

    this.timeSurface = new Surface({
      size: [undefined, 50]
    });
    this.setContent();
    this.timeSurface.pipe(this._eventOutput);

    // this.timeSurface.on('click', function() {
    //   this._eventOutput.emit('editTask', this.model);
    // }.bind(this));

    this._add(this.timeModifier).add(this.timeSurface);
  }

  TimeView.prototype = Object.create(View.prototype);
  TimeView.prototype.constructor = TimeView;

  TimeView.prototype.getSize = function() {
    return [undefined, this.size.get()];
  };

  TimeView.prototype.setContent = function() {
    this.timeSurface.setContent(template.call(this));
  };

  var template = function() {
    var due = this.model.get('due') ? "due" : "";
    return "<div class='task " + this.model.get('category') + "'>" +
    "<div class='checkbox'>&#xf10c;</div>" +
    "<div class='taskData " + due + "'>" + this.model.get("task") + "</div>" +
    "</div>";
  };

module.exports = TimeView;
});