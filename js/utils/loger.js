logerModule = (function() {
    let calculatorConfig;

    let module = {
        line: function () {
            if (calculatorConfig.LOG_ON !== true) {
                return;
            }

            module.log('--------------------');
        },
        log: function (str) {
            if (calculatorConfig.LOG_ON !== true) {
                return;
            }

            console.log(str);
        },
        init: function (calculatorConfigModule) {
            calculatorConfig = calculatorConfigModule;
        }
    };

    return module;
}());