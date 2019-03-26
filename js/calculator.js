var calculatorModule = (function() {

    let module = {
        init:
            function(calculatorConfigModule, orderStepsModule, orderStepsHelperModule, calcHelperModule, orderStepModule, railAndSocketStepModule,
                panelSizeStepModule, numberHelperModule, loggerModuel) {

            loggerModuel.init(calculatorConfigModule);

			orderStepsModule.init(calculatorConfigModule);
            let orderSteps = orderStepsModule.getOrderSteps();
			
			let orderStep = orderStepModule;
			
			let calcHelper = calcHelperModule;
			calcHelper.init(orderSteps, orderStepsHelperModule, calculatorConfigModule, orderStep, numberHelperModule, loggerModule);

			panelSizeStepModule.init(orderStep, orderStepsHelperModule, calcHelper);
            railAndSocketStepModule.init(orderStep, orderStepsHelperModule, calcHelper, numberHelperModule);
						
            orderStep.init(orderStepsHelperModule, orderSteps, calcHelper, railAndSocketStepModule, panelSizeStepModule, panelSizeStepModule);
			
			orderStepsHelperModule.init(orderSteps);
			
            orderStep.renderAllSteps();
        }
    };


    return module;
}());