var libConfigModule = (function() {
    
    let initJQueryValidation = function () {
        /*
        $.validator.setDefaults({
            debug: true
        });
        */
        jQuery.validator.setDefaults({
            debug: true,
            success: "valid",
            messages: $.validator.messages
        });


        jQuery.validator.addMethod("latvianPhone", function (value, element) {
            return this.optional(element) || /(^[+]371\d{8}$)|(^371\d{8}$)|(^\d{8}$)/g.test(value);
        }, "Не верный формат телефона");
    }; 

    let initUnderscore = function () {
        
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g,
            evaluate:    /\[\[(.+?)\]\]/g,
            escape:      /\(\((.+?)\)\)/g
        };
    };

    /*
    let initBootstapInputMasks = function() {
        $(":input").inputmask();
    }*/

    let module = {
        init: function () {
            initJQueryValidation();
            initUnderscore();
           // initBootstapInputMasks();
        }
    };

    return module;
}());