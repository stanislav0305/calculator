let libConfigModule = (function() {

    const initJQueryValidation = function() {
        jQuery.validator.setDefaults({
            debug: true,
            success: "valid",
            messages: $.validator.messages
        });

        jQuery.validator.addMethod("latvianPhone",
            function(value, element) {
                return this.optional(element) || /(^[+]371\d{8}$)|(^371\d{8}$)|(^\d{8}$)/g.test(value);
            },
            "Не верный формат телефона");
    };

    const initUnderscore = function() {
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g,
            evaluate: /\[\[(.+?)\]\]/g,
            escape: /\(\((.+?)\)\)/g
        };
    };


    const module = {
        init: function() {
            initJQueryValidation();
            initUnderscore();
        }
    };

    return module;
}());