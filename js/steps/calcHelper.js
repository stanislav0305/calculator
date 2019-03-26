var calcHelperModule = (function(){
	let orderSteps;
	let calculatorConfig;
	let orderStepsHelper;
    let numberHelper;
    let loger;

	let module = 
	{
		mainParams: {
			areaSize: 0.00,
			perimeterSize: 0.00,
			drillingCount: 0,
			calc: function(steps) {
				if (steps === undefined) {
					return;
				}

				let _this = this;
				for (let sIdx = 0; sIdx < steps.length; sIdx++) {
					let step = steps[sIdx];
					//steps.forEach(function(step, index){
					//if (step.mainParamsCalcFunc === 'printingTypeMainParamsCalc'){
					//	_this.printingTypeMainParamsCalc(step);
					//} else 
					if (step.mainParamsCalcFunc === 'panelSizeMainParamsCalc') {
						_this.panelSizeMainParamsCalc(step);
					}

					if ($.isArray(step.stepElements)) {
						for (let seIdx = 0; seIdx < step.stepElements.length; seIdx++) {
							let stepElement = step.stepElements[seIdx];
							//step.stepElements.forEach(function(stepElement, index){
							if (stepElement.items !== undefined) {
								for (let iIdx = 0; iIdx < stepElement.items.length; iIdx++) {
									let item = stepElement.items[iIdx];
									//stepElement.items.forEach(function(item, index){
									if (item.isSelected === true) {
										_this.calc(item.childSteps);
									}
								} //);
							}
						} //);
					}
				} //);
			},
			panelSizeEnteredSizeMap: function (enteredSizes) {
				enteredSizes.w = (enteredSizes.w === undefined) ? '' : enteredSizes.w;
                enteredSizes.w = (numberHelper.isPositiveInteger(enteredSizes.w) === false) ? '' : enteredSizes.w;

				enteredSizes.h = (enteredSizes.h === undefined) ? '' : enteredSizes.h;
                enteredSizes.h = (numberHelper.isPositiveInteger(enteredSizes.h) === false) ? '' : enteredSizes.h;

				return enteredSizes;
			},
			panelSizeMainParamsCalc: function(step) {
				let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
				let panelCount = selectedItem.title * 1;

				module.mainParams.areaSize = 0.00;
				module.mainParams.perimeterSize = 0.00;
				module.mainParams.drillingCount = 0;

				let panaelSizeStep = orderStepsHelper.getStepOrNull('step-panel-size');
				panaelSizeStep.stopRender = false;
				
				let enteredValuesList = step.stepElements[0].enteredValues.filter(item => item.number <= panelCount);
				for (let evIdx = 0; evIdx < enteredValuesList.length; evIdx++) {
					let enteredSizes = enteredValuesList[evIdx];
					enteredSizes = module.mainParams.panelSizeEnteredSizeMap(enteredSizes);

					if (enteredSizes.w === undefined ||
						enteredSizes.w === '' ||
						enteredSizes.h === undefined ||
						enteredSizes.h === '') {
						module.mainParams.areaSize = 0.00;
						module.mainParams.perimeterSize = 0.00;
						module.mainParams.drillingCount = 0;
						//module.mainParams.panelSizesIsValid = false;
						panaelSizeStep.stopRender = true;

					} else {
						let panelAreaSize = enteredSizes.w / 1000 * enteredSizes.h / 1000;
						if (panelAreaSize < calculatorConfig.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS) {
							panelAreaSize = calculatorConfig.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS;
						}

						module.mainParams.areaSize =
							module.mainParams.areaSize + panelAreaSize;
						module.mainParams.perimeterSize = module.mainParams.perimeterSize +
							(enteredSizes.w / 1000 + enteredSizes.h / 1000) * 2;

						//цена за высверливание 1 отверстия в панелей (количество отверстий в одной панели = 1 + (целое число от длинна панели в метрах, если оно равно 0 то 1))
						let w = Math.trunc(enteredSizes.w / 1000);
						w = w <= 0 ? 1 : w;
						module.mainParams.drillingCount =
							module.mainParams.drillingCount + (1 + w);
					}
				}
			}
			/*,				
			printingTypeMainParamsCalc: function(step){
				let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
				if (selectedItem.price !== undefined){
					module.mainParams.printingTypePrice = selectedItem.price;
				}
			} */
		},


		defaultCalc: function(step) {
			let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
			if (selectedItem.price !== undefined) {
				return selectedItem.price;
			}

			return 0.00;
		},
		priceMultiplyByAreaSizeCalc: function(step) {
			let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
			if (selectedItem !== undefined && selectedItem.price !== undefined) {
				return module.mainParams.areaSize * selectedItem.price;
			}

			return 0.00;
		},
		railsAndSocketsCalc: function(step) {
			let countToPriceCalc = function(price, count) {
				if ((price !== undefined) && (count !== '') && (count !== undefined)) {
					return count * price;
				}

				return 0.00;
			}

			//Rails calc
			let railSelectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
			let result = countToPriceCalc(railSelectedItem.price, railSelectedItem.enteredValue);

			//Sockets calc
			let socketDataIsValid = true;
			let socketSelectedItem = step.stepElements[1].items.filter(item => item.isSelected === true)[0];
			if (socketSelectedItem.socketsBloks != undefined) {

				let socketCount = 0;
				for (let i = 0; i < socketSelectedItem.socketsBloks.length; i++) {
					if (socketSelectedItem.socketsBloks[i].isSelected === true) {
						if (socketSelectedItem.socketsBloks[i].blockCount === '' ||
							socketSelectedItem.socketsBloks[i].blockCount === undefined) {
							socketDataIsValid = false;
						} else {
							socketCount =
								socketCount +
								socketSelectedItem.socketsBloks[i].blockCount *
								socketSelectedItem.socketsBloks[i].number;
						}
					}
				}

				result = result + socketCount * calculatorConfig.SKINALI_ONE_SOCKET_DRILLING_PRICE;
			}

			return result;
		},
		mountingTypeCalc: function(step) {
			let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
			if (selectedItem !== undefined && selectedItem.itemType === 'glue') {
				return calculatorConfig.SKINALI_GLUE_PRICE;
			} else if (selectedItem !== undefined && selectedItem.itemType === 'drilling') {
				return module.mainParams.drillingCount *
					calculatorConfig.SKINALI_ONE_HOLE_DRILLING_PRICE;
			}

			return 0.00;
		},
		panelSizeCalc: function(step) {
			let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
			let panelCount = selectedItem.title * 1;
			let enteredValuesList = step.stepElements[0].enteredValues.filter(item => item.number <= panelCount);

			let hardeningTotal = 0.00;
			enteredValuesList.forEach(function(enteredSizes, index) {

				if (enteredSizes.w === undefined ||
					enteredSizes.w === '' ||
					enteredSizes.h === undefined ||
					enteredSizes.h === '') {
					hardeningTotal = 0.00;
					return;
				} else {
					let panelAreaSize = enteredSizes.w / 1000 * enteredSizes.h / 1000;
					if (panelAreaSize < calculatorConfig.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS) {
						panelAreaSize = calculatorConfig.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS;
					}

					if (enteredSizes.hardening === true) {
						hardeningTotal =
							hardeningTotal + panelAreaSize * calculatorConfig.SKINALI_PANEL_HARDENING_PRICE
					}
				}
			});

			// если величина погонного метра (периметр) > 2 метров то цена за погонного метра (периметр) увеличивается на 25%
			// если величина погонного метра (периметр) > 3 метров то цена за погонного метра (периметр) увеличивается на 50%
			let grinGrindingPrice = calculatorConfig.SKINALI_PANEL_GRINDING_PRICE;
			if (module.mainParams.perimeterSize > 2) {
				grinGrindingPrice = grinGrindingPrice + (grinGrindingPrice * 25 / 100);
			} else if (module.mainParams.perimeterSize > 3) {
				grinGrindingPrice = grinGrindingPrice + (grinGrindingPrice * 50 / 100);
			}

			let grindingTotal = module.mainParams.perimeterSize *
				calculatorConfig.SKINALI_PANEL_GRINDING_PRICE;
			let totalSum = hardeningTotal + grindingTotal;
			return totalSum;
		},


		recalcSteps: function(steps, result) {
			if (steps === undefined) {
				return result;
			}

			let _this = this;
			steps.forEach(function(step, index) {
				if (step.calcFunc === 'panelSizeCalc') {
					result = result + module.panelSizeCalc(step);
				} else if (step.calcFunc === 'priceMultiplyByAreaSizeCalc') {
					result = result + module.priceMultiplyByAreaSizeCalc(step);
				} else if (step.calcFunc === 'railsAndSocketsCalc') {
					result = result + module.railsAndSocketsCalc(step);
				} else if (step.calcFunc === 'mountingTypeCalc') {
					result = result + module.mountingTypeCalc(step);
				} else if (step.calcFunc === 'printingType') {
					result = result + module.printingTypeCalc(step);
				} else if (step.calcFunc === 'defaultCalc') {
					result = result + module.defaultCalc(step);
				}

				if ($.isArray(step.stepElements)) {
					step.stepElements.forEach(function(stepElement, index) {
						if (stepElement.items !== undefined) {
							stepElement.items.forEach(function(item, index) {
								if (item.isSelected === true) {
									result = _this.recalcSteps(item.childSteps, result);
								}
							});
						}
					});
				}
			});

			return result;
		},
        recalcAll: function () {
            loger.line();
            loger.log('Расчёт суммы');
            loger.line();
			this.mainParams.calc(orderSteps);
            let result = this.recalcSteps(orderSteps, 0);

            loger.log('Сумма:' + result);
            loger.line();

			orderStep.setTotalPrice(result);
		},
		init: function(steps, orderStepsHelperModule, calculatorConfigModule, orderStepModule, numberHelperModule, logerModule){
			orderSteps = steps;
			orderStep = orderStepModule;
			calculatorConfig = calculatorConfigModule;
            orderStepsHelper = orderStepsHelperModule;
            numberHelper = numberHelperModule;
		    loger = logerModule;
		}
	};
    	
	return module;
}());