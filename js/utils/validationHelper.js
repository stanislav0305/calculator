var validationHelperModule = (function() {

    let module = {
        isPositiveInteger: function (s) {
            return !!s.match(/^[0-9]+$/);
        },
        isMail: function (s) {
            let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
            return regex.test(s);
        }
    };

    return module;
}());