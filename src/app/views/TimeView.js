define(function(require, exports, module) {
  var Surface          = require('famous/core/Surface');
  var Modifier         = require('famous/core/Modifier');
  var Transform        = require('famous/core/Transform');
  var View             = require('famous/core/View');
  var Transitionable   = require('famous/transitions/Transitionable');
  require('famous/inputs/FastClick');

  var template = require('hbs!app/templates/time')

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

    this.timeSurface.on('click', function(evt) {
      var $selectedElement = $(evt.currentTarget).find(".time");

      $("body").find(".selected-time").removeClass("selected-time");
      $selectedElement.addClass("selected-time");

      this._eventOutput.emit('timeSelected', this.model);
    }.bind(this));

    this._add(this.timeModifier).add(this.timeSurface);
  }

  TimeView.prototype = Object.create(View.prototype);
  TimeView.prototype.constructor = TimeView;

  TimeView.prototype.getSize = function() {
    return [undefined, this.size.get()];
  };

  TimeView.prototype.setContent = function() {
    this.timeSurface.setContent(template(_.extend(this.model.toJSON(), {selected: this.model.get("completeTime") == "12:00"})));
  };

  module.exports = TimeView;
});
