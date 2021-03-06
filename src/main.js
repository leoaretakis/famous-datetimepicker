define(function(require, exports, module) {
    var Engine          = require('famous/core/Engine');
    require('famous/inputs/FastClick');

    var AppModel         = require('app/models/App');
    var AppView         = require('app/views/AppView');

    var appModel = new AppModel({ selectedDate: moment() });
    var appView = new AppView(appModel);

    var mainContext = Engine.createContext();
    mainContext.setPerspective(1000);

    mainContext.add(appView);
});
