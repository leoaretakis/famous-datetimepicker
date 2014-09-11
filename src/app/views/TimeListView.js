define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var ViewSequence = require('famous/core/ViewSequence');
    var Scrollview   = require('famous/views/Scrollview');
    var GenericSync  = require('famous/inputs/GenericSync');
    var MouseSync    = require('famous/inputs/MouseSync');
    var Surface             = require('famous/core/Surface');
    require('famous/inputs/FastClick');

    GenericSync.register({mouse: MouseSync});

    var TimeView     = require('app/views/TimeView');

    function TimeListView() {
        View.apply(this, arguments);

        var times = require('app/config/defaultTimes');
        this.collection = new Backbone.Collection(times);

        this.timeViews = [];

        this.scrollview = new Scrollview({
            margin: 100000,
            properties: {
                backgroundColor: 'white'
            }
        });

        this.scrollview.sync = new GenericSync(['mouse', 'touch', 'scroll'], {direction: 1});
        this.scrollview._eventInput.pipe(this.scrollview.sync);
        this.scrollview.sync.pipe(this.scrollview._eventInput);


        this.viewSequence = new ViewSequence(this.timeViews);
        this.scrollview.sequenceFrom(this.viewSequence);
        this.setContent();

        this._eventInput.on('timeSelected', function(data) {
            this._eventOutput.emit('timeSelected', data);
        }.bind(this));

        this.add(this.scrollview);
    }

    TimeListView.prototype = Object.create(View.prototype);
    TimeListView.prototype.constructor = TimeListView;

    TimeListView.prototype.setContent = function() {
        var timeList = this.collection.models;
        for (var i = 0; i < timeList.length; i++) {
            view = new TimeView(timeList[i]);
            view.pipe(this.scrollview);
            view.pipe(this._eventInput);

            this.timeViews.push(view);
        }

        this.timeViews.push(new Surface({
            size: [undefined, 160]
        }));
    };

    module.exports = TimeListView;

});
