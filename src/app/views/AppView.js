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
    var WeekView      = require('app/views/WeekView');
    var TimeListView = require('app/views/TimeListView');

    function AppView() {
        View.apply(this, arguments);

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
        this.monthYearView = new Surface({
          size: [undefined, 50],
          content: 'Mar 2014',
          properties: {
            marginLeft: '12px',
            fontFamily: 'helvetica',
            marginTop: '20px'
          }
        });
        this.layout.content.add(this.monthYearView);
    }

    function _createDateSelectionView(){
        this.dateSelectionView = new WeekView({
          size: [undefined, 50]
        });

        this.dateSelectionModifier = new Modifier({
            transform: Transform.translate(0, 50, 0)
        });

        this.layout.content.add(this.dateSelectionModifier).add(this.dateSelectionView);
    }

    function _createResultView(){
        this.resultView = new Surface({
          size: [undefined, 60],
          content: 'Friday, March 28th<br/>12:00 PM', //TODO templates
          properties: {
            textAlign: 'center',
            fontFamily: 'helvetica',
            marginTop: '10px'
          }
        });

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
        this.listMod = new Modifier();
        this.listContainerView.add(this.listMod).add(this.timeListView);
        this.layout.content.add(this.listContainerMod).add(this.listContainerView);
    }

    module.exports = AppView;

});
