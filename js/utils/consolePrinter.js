var consolePrinterModule = (function () {
    let calculatorConfig;

    let module = {
        print: function (logger) {
            if (calculatorConfig.PRINT_LOG_TO_CONSOLE_ON !== true) {
                return;
            }

            for (let i = 0; i < logger.log.length; i++) {
                console.log(logger.log[i]);
            }
        },
        init: function (calculatorConfigModule) {
            calculatorConfig = calculatorConfigModule;
        }
    };

    return module;
}());