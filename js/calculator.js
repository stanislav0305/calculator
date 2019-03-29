var calculatorModule = (function() {

    let module = {
        init:
            function(calculatorConfigModule, orderStepsModule, orderStepsHelperModule, calcHelperModule, orderStepModule, railAndSocketStepModule,
                panelSizeStepModule, totalPriceStepModule, validationHelperModule, loggerModule, consolePrinterModule,
                mailSenderModule, templateHelperModule) {

			orderStepsModule.init(calculatorConfigModule);
            let orderSteps = orderStepsModule.getOrderSteps();
			
			let orderStep = orderStepModule;
			
			let calcHelper = calcHelperModule;
            calcHelper.init(orderSteps, orderStepsHelperModule, calculatorConfigModule, orderStep, validationHelperModule,
                loggerModule, consolePrinterModule, totalPriceStepModule);

			panelSizeStepModule.init(orderStep, orderStepsHelperModule, calcHelper);
            railAndSocketStepModule.init(orderStep, orderStepsHelperModule, calcHelper, validationHelperModule);

            mailSenderModule.init(templateHelperModule);

            totalPriceStepModule.init(templateHelperModule, orderStepsHelperModule, mailSenderModule, calculatorConfigModule);

            orderStep.init(orderStepsHelperModule, orderSteps, calcHelper, railAndSocketStepModule, panelSizeStepModule,
                totalPriceStepModule, templateHelperModule);
			
			orderStepsHelperModule.init(orderSteps);
			
            orderStep.renderAllSteps();
        }
    };


    return module;
}());