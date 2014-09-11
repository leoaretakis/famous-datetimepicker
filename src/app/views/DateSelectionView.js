define(function(require, exports, module) {
    var View                = require('famous/core/View');
    var StateModifier       = require('famous/modifiers/StateModifier');
    var HeaderFooterLayout  = require('famous/views/HeaderFooterLayout');
    var Transform           = require('famous/core/Transform');
    var Surface             = require('famous/core/Surface');
    var Modifier            = require('famous/core/Modifier');
    var Utility            = require('famous/utilities/Utility');
    var Transitionable  = require('famous/transitions/Transitionable');

    var GenericSync     = require('famous/inputs/GenericSync');
    var MouseSync       = require('famous/inputs/MouseSync');
    var TouchSync       = require('famous/inputs/TouchSync');
    GenericSync.register({'mouse': MouseSync, 'touch': TouchSync});

    var WeekView      = require('app/views/WeekView');

    function DateSelectionView(params, model) {
        View.apply(this, arguments);

        this._viewWidth = window.innerWidth;

        this.model = model;
        this.weekViewPos = new Transitionable(0);

        _createWeekViews.call(this);
        _handleSwipe.call(this);
        _setListeners.call(this);
    }

    DateSelectionView.DEFAULT_OPTIONS = {
        transition: {
            duration: 600,
            curve: 'easeInOut'
        }
    };

    DateSelectionView.prototype = Object.create(View.prototype);
    DateSelectionView.prototype.constructor = DateSelectionView;

    DateSelectionView.prototype.slideRight = function() {
        this.weekViewPos.set(this._viewWidth, this.options.transition, function(){
            var newCurrentWeek = this.model.get('previousWeek');
            var newPreviousWeekSampleDate = moment(newCurrentWeek.at(4).get('date')).add(-6, 'day');
            var newPreviousWeek = this.model.createWeekFromDate(newPreviousWeekSampleDate);

            this.model.set({
                previousWeek: newPreviousWeek,
                currentWeek: newCurrentWeek,
                nextWeek: this.model.get('currentWeek')
            });

            this.previousWeekView.collection = newPreviousWeek;
            this.currentWeekView.collection = newCurrentWeek;
            this.nextWeekView.collection = this.model.get('nextWeek');

            this.previousWeekView.updateContent();
            this.currentWeekView.updateContent();
            this.nextWeekView.updateContent();

            setTimeout(function(){
                this.weekViewPos.set(0);
                this._eventOutput.emit('weekChanged', newCurrentWeek);
            }.bind(this), 0);
        }.bind(this));
    };

    DateSelectionView.prototype.slideLeft = function() {
        this.weekViewPos.set(- this._viewWidth, this.options.transition, function(){
            var newCurrentWeek = this.model.get('nextWeek');
            var newNextWeekSampleDate = moment(newCurrentWeek.at(4).get('date')).add(6, 'day');
            var newNextWeek = this.model.createWeekFromDate(newNextWeekSampleDate);

            this.model.set({
                previousWeek: this.model.get('currentWeek'),
                currentWeek: newCurrentWeek,
                nextWeek: newNextWeek
            });

            this.previousWeekView.collection = this.model.get('previousWeek');
            this.currentWeekView.collection = newCurrentWeek;
            this.nextWeekView.collection = newNextWeek;

            this.previousWeekView.updateContent();
            this.currentWeekView.updateContent();
            this.nextWeekView.updateContent();

            setTimeout(function(){
                this.weekViewPos.set(0);
                this._eventOutput.emit('weekChanged', newCurrentWeek);
            }.bind(this), 0);
        }.bind(this));
    };

    function _createWeekViews(){
        var currentWeek = this.model.get('currentWeek');
        this.currentWeekView = new WeekView({
          size: [undefined, undefined],
          collection: currentWeek
        });
        this.currentWeekViewMod = new Modifier({
            transform: function() {
                return Transform.translate(this.weekViewPos.get(), 0, 0);
            }.bind(this)
        });
        this.add(this.currentWeekViewMod).add(this.currentWeekView);


        var previousWeek = this.model.get('previousWeek');
        this.previousWeekView = new WeekView({
          size: [undefined, undefined],
          collection: previousWeek
        });
        this.previousWeekViewMod = new Modifier({
            transform: function() {
                return Transform.translate(this.weekViewPos.get() - this._viewWidth, 0, 0);
            }.bind(this)
        });
        this.add(this.previousWeekViewMod).add(this.previousWeekView);

        var nextWeek = this.model.get('nextWeek');
        this.nextWeekView = new WeekView({
          size: [undefined, undefined],
          collection: nextWeek
        });
        this.nextWeekViewMod = new Modifier({
            transform: function() {
                return Transform.translate(this.weekViewPos.get() + this._viewWidth, 0, 0);
            }.bind(this)
        });
        this.add(this.nextWeekViewMod).add(this.nextWeekView);
    }

    function _handleSwipe() {
        var sync = new GenericSync(
            ['mouse', 'touch'],
            {direction : GenericSync.DIRECTION_X}
        );

        this.currentWeekView.pipe(sync);
        this.previousWeekView.pipe(sync);
        this.nextWeekView.pipe(sync);

        sync.on('end', function(data){
            if(!this._weekChanged){
                this.weekViewPos.set(0, this.options.transition);
            } else {
                if(this._changeDirection > 0){
                    this.slideRight();
                } else {
                    this.slideLeft();
                }
            }
            this._weekChanged = false
        }.bind(this));

        sync.on('update', function(data) {
            if(data.velocity > 1 || Math.abs(data.position) > (this._viewWidth/3.0) ){
                this._changeDirection = data.delta;
                this._weekChanged = true;
            } else {
                this._weekChanged = false;
            }

            this.weekViewPos.set(this.weekViewPos.get() + data.delta);
        }.bind(this));
    }

    function _setListeners(){
        this.currentWeekView.pipe(this._eventInput);
        this.previousWeekView.pipe(this._eventInput);
        this.nextWeekView.pipe(this._eventInput);

        this._eventInput.on('dateSelected', function(data) {
            this._eventOutput.emit('dateSelected', data);
        }.bind(this));
    }

    module.exports = DateSelectionView;

});
