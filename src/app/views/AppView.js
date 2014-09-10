define(function(require, exports, module) {
    var View                = require('famous/core/View');
    var StateModifier       = require('famous/modifiers/StateModifier');
    var HeaderFooterLayout  = require('famous/views/HeaderFooterLayout');
    var Transform           = require('famous/core/Transform');
    // var Surface             = require('famous/core/Surface');
    var Modifier            = require('famous/core/Modifier');
    var Utility            = require('famous/utilities/Utility');

    var HeaderView = require('app/views/HeaderView');
    var TimeListView = require('app/views/TimeListView');

    function AppView() {
        View.apply(this, arguments);

        this.mainTransform = new Modifier({
            transform: Transform.identity
        });

        // Layout for specifically sized header and variable content
        this.layout = new HeaderFooterLayout({
            size: [undefined, undefined],
            headerSize: 44,
            footerSize: 1
        });

        // Create the HeaderView
        this.headerView = new HeaderView();
        // this.headerView.pipe(this._eventInput);
        this.layout.header.add(Utility.transformInFront).add(this.headerView);

        // Create the TimeListView
        this.timeListView = new TimeListView();
        this.layout.content.add(Utility.transformBehind).add(this.timeListView);


        this.add(this.mainTransform).add(this.layout);

        // _createPageView.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
    };

    module.exports = AppView;

});
