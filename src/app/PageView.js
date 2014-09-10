define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var HeaderFooter    = require('famous/views/HeaderFooterLayout');
    var ImageSurface    = require('famous/surfaces/ImageSurface');
    // var FastClick       = require('famous/inputs/FastClick');

    function PageView() {
        View.apply(this, arguments);

        _createLayout.call(this);
        _createHeader.call(this);
    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
        headerSize: 44
    };

    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize
        });

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.1)
        });

        this.add(layoutModifier).add(this.layout);
    }

    function _createHeader() {
        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: 'black'
            }
        });

        var backgroundModifier = new StateModifier({
            transform: Transform.behind
        });

        this.layout.header.add(backgroundModifier).add(backgroundSurface);

        this.closeSurface = new ImageSurface({
            size: [44, 44],
            content: 'img/x-mark.png'
        });

        var titleSurface = new Surface({
            size: [232, 44],
            content: 'Select date and time'
        });

        var nextSurface = new Surface({
            size: [44, 44],
            content: 'Next'
        });

         var closeModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5]
        });

        var titleModifier = new StateModifier({
            origin: [0.5, 0.5],
            align : [0.5, 0.5]
        });

        var nextModifier = new StateModifier({
            origin: [1, 0.5],
            align : [1, 0.5]
        });

        this.layout.header.add(closeModifier).add(this.closeSurface);
        this.layout.header.add(titleModifier).add(titleSurface);
        this.layout.header.add(nextModifier).add(nextSurface);
    }

    module.exports = PageView;
});
