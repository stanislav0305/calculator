var libConfigModule = (function() {


    let initUnderscore = function () {
        
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g,
            evaluate:    /\[\[(.+?)\]\]/g,
            escape:      /\(\((.+?)\)\)/g
        };
    };

    let module = {
        init: function() {
            initUnderscore();
        }
    };

    return module;
}());