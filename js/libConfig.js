var libConfigModule = (function() {
    
    let initJQueryValidation = function() {
        $.validate({
            modules: 'html5',
            decimalSeparator: '.'
        });
    }; 

    let initUnderscore = function () {
        
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g,
            evaluate:    /\[\[(.+?)\]\]/g,
            escape:      /\(\((.+?)\)\)/g
        };
    };

    let module = {
        init: function () {
            initJQueryValidation();
            initUnderscore();
        }
    };

    return module;
}());