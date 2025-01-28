import _ from 'underscore';


export default (function() {
    let calculatorConfig;

    const module = {
        print: function(logger) {
            if (calculatorConfig.PRINT_LOG_TO_CONSOLE_ON !== true) {
                return;
            }

            _(logger.log).each(logRow => {
                console.log(logRow.message);
            });
        },
        init: function(calculatorConfigModule) {
            calculatorConfig = calculatorConfigModule;
        }
    };

    return module;
}());