define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Modifier     = require('famous/core/Modifier');
    var ViewSequence = require('famous/core/ViewSequence');
    var Scrollview   = require('famous/views/Scrollview');
    var EventHandler = require('famous/core/EventHandler');
    var RenderNode   = require('famous/core/RenderNode');
    var GenericSync  = require('famous/inputs/GenericSync');
    var MouseSync    = require('famous/inputs/MouseSync');
    var SequentialLayout     = require("famous/views/SequentialLayout");
    var Surface         = require('famous/core/Surface');
    var Transform           = require('famous/core/Transform');

    GenericSync.register({mouse: MouseSync});

    var TimeView     = require('app/views/TimeView');
    // var Task         = require('models/Task');

    function WeekView(collection) {
        View.apply(this, arguments);

        // this.dayViews = [];
        // this.viewSequence = new ViewSequence(this.dayViews);
        _createContent.call(this);

        // this.add(this.viewSequence);
    }

    WeekView.prototype = Object.create(View.prototype);
    WeekView.prototype.constructor = WeekView;

    function _createContent() {
        this.sequentialLayout = new SequentialLayout({
            direction: 0
        });
        var views = [];

        var surf, offset, mod, view;

        var daySize = window.innerWidth / 7;

        for(var i = 0; i < 7; i++) {
            surf = new Surface({
                size: [daySize, 80],
                content: 'Su<br/>01',
                properties: {
                    color: 'white',
                    fontFamily: 'Helvetica',
                    textAlign: 'center'
                }
            });

            mod = new Modifier({
                transform: Transform.translate(0, 0, 0),
                opacity: 1
            });

            view = new View({
                size: [daySize, 80]
            });
            view._add(mod).add(surf);

            // surf.pipe(this.options.scrollView);
            views.push(view);
        }

        this.sequentialLayout.sequenceFrom(views);
        this.add(this.sequentialLayout);
    }


    module.exports = WeekView;

});
