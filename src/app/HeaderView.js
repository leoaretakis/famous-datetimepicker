define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var View            = require('famous/core/View');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform       = require('famous/core/Transform');
    var ImageSurface    = require('famous/surfaces/ImageSurface');

    function HeaderView() {
        View.apply(this, arguments);

        _createBackground.call(this);
        _createCloseButton.call(this);
        _createTitle.call(this);
        _createNextButton.call(this);
    }

    HeaderView.prototype = Object.create(View.prototype);
    HeaderView.prototype.constructor = HeaderView;

    HeaderView.DEFAULT_OPTIONS = {};

    function _createBackground(){
        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: 'black'
            }
        });

        var backgroundModifier = new StateModifier({
            transform: Transform.behind
        });

        this.add(backgroundModifier).add(backgroundSurface);
    }

    function _createCloseButton(){
        this.closeSurface = new ImageSurface({
            size: [44, 44],
            content: 'img/x-mark.png'
        });

        var closeModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5]
        });

        this.add(closeModifier).add(this.closeSurface);
    }

    function _createTitle(){
        var titleSurface = new Surface({
            size: [232, 44],
            content: 'Select date and time',
            properties: {
                textAlign: 'center',
                fontFamily: 'Helvetica',
                lineHeight: '44px',
                color: '#E2FF00',
                fontWeight: 'bold'
            }
        });

        var titleModifier = new StateModifier({
            origin: [0.5, 0.5],
            align : [0.5, 0.5]
        });

        this.add(titleModifier).add(titleSurface);
    }

    function _createNextButton(){
        var nextSurface = new Surface({
            size: [44, 44],
            content: 'Next',
            properties: {
                fontFamily: 'Helvetica',
                lineHeight: '44px',
                fontWeight: 'bold'
            }
        });

        var nextModifier = new StateModifier({
            origin: [1, 0.5],
            align : [1, 0.5]
        });

        this.add(nextModifier).add(nextSurface);
    }

    module.exports = HeaderView;

});
