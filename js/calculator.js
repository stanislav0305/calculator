var calculatorModule = (function() {

    let module = {
        init:
            function(calculatorConfigModule, orderStepsModule, orderStepsHelperModule, calcHelperModule, orderStepModule, railAndSocketStepModule,
                panelSizeStepModule, totalPriceStepModule, validationHelperModule, loggerModule, consolePrinterModule,
                mailSenderModule, templateHelperModule, metringAndInstallationStepModule) {

			orderStepsModule.init(calculatorConfigModule);
            let orderSteps = orderStepsModule.getOrderSteps();
			
			let orderStep = orderStepModule;
			
			let calcHelper = calcHelperModule;
            calcHelper.init(orderSteps, orderStepsHelperModule, calculatorConfigModule, orderStep, validationHelperModule,
                loggerModule, consolePrinterModule, totalPriceStepModule);

			panelSizeStepModule.init(orderStep, orderStepsHelperModule, calcHelper);
            railAndSocketStepModule.init(orderStep, orderStepsHelperModule, calcHelper, validationHelperModule);

            mailSenderModule.init(templateHelperModule, calculatorConfigModule);

            totalPriceStepModule.init(templateHelperModule, orderStepsHelperModule, mailSenderModule,
                calculatorConfigModule, calcHelper);

            metringAndInstallationStepModule.init(orderStepsHelperModule, templateHelperModule, calcHelper);

            orderStep.init(orderStepsHelperModule, orderSteps, calcHelper, railAndSocketStepModule, panelSizeStepModule,
                totalPriceStepModule, metringAndInstallationStepModule, templateHelperModule);
			
			orderStepsHelperModule.init(orderSteps);
			
            orderStep.renderAllSteps();
        }
    };


    return module;
}());