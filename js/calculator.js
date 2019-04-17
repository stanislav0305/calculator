let calculatorModule = (function() {

    const module = {
        init: function(calculatorConfigModule,
            orderStepsModule,
            orderStepsHelperModule,
            calcHelperModule,
            orderStepModule,
            railAndSocketStepModule,
            panelSizeStepModule,
            totalPriceStepModule,
            miscHelperModule,
            loggerModule,
            consolePrinterModule,
            mailSenderModule,
            templateHelperModule,
            metringAndInstallationStepModule) {

            orderStepsModule.init(calculatorConfigModule);
            const orderSteps = orderStepsModule.getOrderSteps();

            const orderStep = orderStepModule;

            const calcHelper = calcHelperModule;
            calcHelper.init(orderSteps,
                orderStepsHelperModule,
                calculatorConfigModule,
                orderStep,
                miscHelperModule,
                loggerModule,
                consolePrinterModule,
                totalPriceStepModule);

            panelSizeStepModule.init(orderStep, orderStepsHelperModule, calcHelper);
            railAndSocketStepModule.init(orderStep, orderStepsHelperModule, calcHelper, templateHelperModule);

            mailSenderModule.init(templateHelperModule, calculatorConfigModule);

            totalPriceStepModule.init(templateHelperModule,
                orderStepsHelperModule,
                mailSenderModule,
                calculatorConfigModule,
                calcHelper,
                miscHelperModule);

            metringAndInstallationStepModule.init(orderStepsHelperModule, templateHelperModule, calcHelper);

            orderStep.init(orderStepsHelperModule,
                orderSteps,
                calcHelper,
                railAndSocketStepModule,
                panelSizeStepModule,
                totalPriceStepModule,
                metringAndInstallationStepModule,
                templateHelperModule);

            orderStepsHelperModule.init(orderSteps);

            orderStep.renderAllSteps();
        }
    };


    return module;
}());