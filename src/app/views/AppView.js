define(function(require, exports, module) {
    var View                = require('famous/core/View');
    var StateModifier       = require('famous/modifiers/StateModifier');
    var HeaderFooterLayout  = require('famous/views/HeaderFooterLayout');
    var Transform           = require('famous/core/Transform');
    var Surface             = require('famous/core/Surface');
    var Modifier            = require('famous/core/Modifier');
    var Utility            = require('famous/utilities/Utility');
    var ContainerSurface = require("famous/surfaces/ContainerSurface");

    var HeaderView = require('app/views/HeaderView');
    var DateSelectionView      = require('app/views/DateSelectionView');
    var TimeListView = require('app/views/TimeListView');
    var resultTemplate = require('hbs!app/templates/result');

    function AppView(model) {
        View.apply(this, arguments);

        this.model = model;

        _createLayout.call(this);
        _createHeader.call(this);
        _createMonthYearView.call(this);
        _createDateSelectionView.call(this);
        _createResultView.call(this);
        _createTimeListView.call(this);

    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    function _createLayout(){
        this.mainTransform = new Modifier({ transform: Transform.identity });
        this.layout = new HeaderFooterLayout({
            size: [undefined, undefined],
            headerSize: 44
        });

        this.add(this.mainTransform).add(this.layout);
    }

    function _createHeader(){
        this.headerView = new HeaderView();
        this.layout.header.add(Utility.transformInFront).add(this.headerView);
    }

    function _createMonthYearView(){
        var date = this.model.get('selectedDate');

        this.monthYearView = new Surface({
          size: [undefined, 50],
          content: date.format("MMM YYYY"),
          properties: {
            marginLeft: '12px',
            fontFamily: 'helvetica',
            marginTop: '20px',
            fontWeight: 'bold'
          }
        });
        this.layout.content.add(this.monthYearView);
    }

    function _createDateSelectionView(){
        var currentWeek = this.model.get('currentWeek');

        this.dateSelectionView = new DateSelectionView({
          size: [undefined, 50],
        }, this.model);

        this.dateSelectionModifier = new Modifier({
            transform: Transform.translate(0, 50, 0)
        });

        this.dateSelectionView.on('dateSelected', function(dateModel){
            this.model.set('selectedDate', dateModel.get('date'))
            this.resultView.updateResult(this.model.get("selectedDate"));
        }.bind(this));

        this.dateSelectionView.on('weekChanged', function(currentWeek){
            var monthYearDate = moment().month(currentWeek.month()).year(currentWeek.year());
            this.monthYearView.setContent(monthYearDate.format("MMM YYYY"));
        }.bind(this));

        this.layout.content.add(this.dateSelectionModifier).add(this.dateSelectionView);
    }

    function _createResultView(){
        var date = this.model.get("selectedDate");

        this.resultView = new Surface({
          size: [undefined, 60],
          content: "",
          properties: {
            textAlign: 'center',
            fontFamily: 'helvetica',
            marginTop: '10px',
            color: '#E2FF00',
            fontWeight: 'bold'
          }
        });

        this.resultView.updateResult = function(date){
            this.setContent(resultTemplate({
                id: date.valueOf(),
                dayName: date.format("dddd"),
                monthName: date.format("MMMM"),
                dayOrdinal: date.format("Do"),
                time: date.format("hh:mm A")
            }));
        };

        this.resultView.updateResult(date);

        var resultViewModifier = new Modifier({
            transform: Transform.translate(0, 100, 0)
        });

        this.layout.content.add(resultViewModifier).add(this.resultView);
    }

    function _createTimeListView(){
        this.timeListView = new TimeListView();
        this.listContainerView = new ContainerSurface({
            size: [undefined, undefined],
            properties: {
                overflow: 'hidden'
            }
        });
        this.listContainerMod = new Modifier({
            transform: Transform.translate(0,160,0)
        });

        this.timeListView.on('timeSelected', function(timeModel){
            this.model.set('selectedTime', timeModel);
            this.model.get('selectedDate').hour(timeModel.get('hour'));
            this.model.get('selectedDate').minute(timeModel.get('minute'));

            this.resultView.updateResult(this.model.get("selectedDate"));
        }.bind(this));

        this.listMod = new Modifier();
        this.listContainerView.add(this.listMod).add(this.timeListView);
        this.layout.content.add(this.listContainerMod).add(this.listContainerView);
    }

    module.exports = AppView;

});
