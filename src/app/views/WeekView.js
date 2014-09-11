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

    var dayTemplate = require('hbs!app/templates/day');

    function WeekView(params) {
        View.apply(this, arguments);

        if(params.collection) {
            this.collection = params.collection;
        }

        if(params.selectedDate){
            this.selectedDate = params.selectedDate;
        }

        _createContent.call(this);
    }

    WeekView.prototype = Object.create(View.prototype);
    WeekView.prototype.constructor = WeekView;

    WeekView.prototype.updateContent= function(){
        for(var i = 0; i < 7; i++) {
            var day = this.collection.at(i);
            var view = this.surfaces[i];

            view.setContent(dayTemplate({
                id: day.id,
                weekDay: day.get('date').format('dd'),
                monthDay: day.get('date').format('DD'),
                selected: this.selectedDate.isSame(day.get('date'), 'day')
            }));
        }
    }

    function _createContent() {
        this.sequentialLayout = new SequentialLayout({
            direction: 0
        });
        var views = [];
        this.surfaces = [];

        var mod, view;

        var daySize = window.innerWidth / 7;

        for(var i = 0; i < 7; i++) {
            var day = this.collection.at(i);

            var surf = new Surface({
                size: [daySize, 80],
                content: dayTemplate({
                    id: day.id,
                    weekDay: day.get('date').format('dd'),
                    monthDay: day.get('date').format('DD'),
                    selected: this.selectedDate.isSame(day.get('date'), 'day')
                })
            });
            surf.model = day;

            mod = new Modifier({
                transform: Transform.translate(0, 0, 0),
                opacity: 1
            });

            view = new View({
                size: [daySize, 80]
            });
            view._add(mod).add(surf);

            surf.pipe(this._eventOutput);
            surf.on('click', function(evt){
                var $selectedElement = $(evt.currentTarget).find(".day");
                var dateid = $selectedElement.data("dateid");
                var selectedDate = this.collection.get(dateid);

                $("body").find(".selected-date").removeClass("selected-date");
                $selectedElement.addClass("selected-date");

                this.selectedDate = selectedDate.get('date');

                this._eventOutput.emit('dateSelected', selectedDate);
            }.bind(this));

            views.push(view);
            this.surfaces.push(surf);
        }

        this.sequentialLayout.sequenceFrom(views);
        this.add(this.sequentialLayout);
    }

    module.exports = WeekView;

});
