var numberHelperModule = (function() {

    let module = {
        isPositiveInteger: function (s) {
            return !!s.match(/^[0-9]+$/);
        }
    };

    return module;
}());