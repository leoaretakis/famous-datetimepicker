define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var HeaderFooter    = require('famous/views/HeaderFooterLayout');
    // var FastClick       = require('famous/inputs/FastClick');

    var HeaderView      = require('./HeaderView');
    var PageContentView = require('./PageContentView')

    function PageView() {
        View.apply(this, arguments);

        _createLayout.call(this);
        _createHeader.call(this);
        _createPageContentView.call(this);
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

    function _createHeader(){
        this.headerView = new HeaderView();
        this.layout.header.add(this.headerView);
    }

    function _createPageContentView(){
        this.pageContentView = new PageContentView();
        this.layout.content.add(this.pageContentView);
    }

    module.exports = PageView;
});
