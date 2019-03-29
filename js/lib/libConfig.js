var libConfigModule = (function() {


    let initUnderscore = function() {
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };
    };

    let module = {
        init: function() {
            initUnderscore();
        }
    };

    return module;
}());