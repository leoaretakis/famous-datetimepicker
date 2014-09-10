define(function(require, exports, module) {
    var Engine          = require('famous/core/Engine');
    require('famous/inputs/FastClick');

    var AppModel         = require('app/models/App');
    var AppView         = require('app/views/AppView');
    var times = require('app/config/defaultTimes');


    var model = new AppModel({times: times});
    var appView = new AppView(model);

    var mainContext = Engine.createContext();
    mainContext.setPerspective(1000);

    mainContext.add(appView);
});
