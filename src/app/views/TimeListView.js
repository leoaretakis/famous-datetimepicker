define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Modifier     = require('famous/core/Modifier');
    var ViewSequence = require('famous/core/ViewSequence');
    var Scrollview   = require('famous/views/Scrollview');
    var EventHandler = require('famous/core/EventHandler');
    var RenderNode   = require('famous/core/RenderNode');
    var GenericSync  = require('famous/inputs/GenericSync');
    var MouseSync    = require('famous/inputs/MouseSync');

    GenericSync.register({mouse: MouseSync});

    var TimeView     = require('app/views/TimeView');
    // var Task         = require('models/Task');

    function TimeListView() {
        View.apply(this, arguments);

        this.collection = new Backbone.Collection([1,5,4,8,7,8,,5,5,5,5,5,5,4,7,7,7,7,7,8]);

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

        // this.scrollview._eventOutput.emit = function(){
        //     debugger
        //     Scrollview.prototype.emit.call(this, arguments)
        // }

        // this._eventInput.on('editTask', function(data) {
        //     this._eventOutput.emit('editTask', data);
        // }.bind(this));

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
    };

    module.exports = TimeListView;

});
