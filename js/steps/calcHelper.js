var calcHelperModule = (function(){
    let orderSteps;
    let orderStep;
	let calculatorConfig;
	let orderStepsHelper;
    let validationHelper;
    let logger;
    let consolePrinter;
    let totalPriceStep;

	let module =
    {
        mainParams: {
            areaSize: 0.00,
            perimeterSize: 0.00,
            drillingCount: 0,
            calc: function(steps) {
                if (steps === undefined || steps === null) {
                    return;
                }

                let _this = this;
                for (let sIdx = 0; sIdx < steps.length; sIdx++) {
                    let step = steps[sIdx];
                    if (step.mainParamsCalcFunc === 'panelSizeMainParamsCalc') {
                        _this.panelSizeMainParamsCalc(step);
                    }

                    if ($.isArray(step.stepElements)) {
                        for (let seIdx = 0; seIdx < step.stepElements.length; seIdx++) {
                            let stepElement = step.stepElements[seIdx];
                            if (stepElement.items !== undefined) {
                                for (let iIdx = 0; iIdx < stepElement.items.length; iIdx++) {
                                    let item = stepElement.items[iIdx];
                                    if (item.isSelected === true) {
                                        _this.calc(item.childSteps);
                                    }
                                }
                            }
                        }
                    }
                }
            },
            panelSizeEnteredSizeMap: function(enteredSizes) {
                enteredSizes.w = (enteredSizes.w === undefined) ? '' : enteredSizes.w;
                enteredSizes.w = (validationHelper.isPositiveInteger(enteredSizes.w) === false) ? '' : enteredSizes.w;

                enteredSizes.h = (enteredSizes.h === undefined) ? '' : enteredSizes.h;
                enteredSizes.h = (validationHelper.isPositiveInteger(enteredSizes.h) === false) ? '' : enteredSizes.h;

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
                            logger.mainParamsCalcInfo(
                                `- размер панели${evIdx + 1} < ${calculatorConfig
                                .SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS}`);
                        }
                        logger.mainParamsCalcInfo(`- размер панели${evIdx + 1} = ${panelAreaSize} м²`);
                        module.mainParams.areaSize = module.mainParams.areaSize + panelAreaSize;
                        module.mainParams.perimeterSize = module.mainParams.perimeterSize +
                            (enteredSizes.w / 1000 + enteredSizes.h / 1000) * 2;

                        //цена за высверливание 1 отверстия в панелей (количество отверстий в одной панели = 1 + (целое число от длинна панели в метрах, если оно равно 0 то 1))
                        let w = Math.trunc(enteredSizes.w / 1000);
                        if (w <= 0) {
                            w = 1;
                            logger.mainParamsCalcInfo(
                                `- длинна панели${evIdx + 1
                                } < 1 метра, длина = 1 для ращёта колличество высверливание`);
                        }
                        logger.mainParamsCalcInfo(`- колличество высверливаний для панели${evIdx + 1} = ${(1 + w)}`);
                        module.mainParams.drillingCount = module.mainParams.drillingCount + (1 + w);
                        logger.line();
                    }
                }

                logger.mainParamsCalcInfo('* Сумма полощядей всех панелей: ' + module.mainParams.areaSize + ' м²');
                logger.mainParamsCalcInfo('* Сумма периметров(всего погоных метров) всех панелей: ' + module.mainParams.areaSize + ' м');
                logger.mainParamsCalcInfo('* Всего необходимо высверлить отверстий: ' + module.mainParams.drillingCount);
                logger.line();
            }
        },


        defaultCalc: function(step) {
            let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
            let result = 0.00;
            if (selectedItem.price !== undefined) {
                result = selectedItem.price;
            }

            logger.calcInfo(`Шаг "${step.title}" = ${result}`);
            logger.line();
            return result;
        },
        priceMultiplyByAreaSizeCalc: function(step) {
            let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
            let result = 0.00;

            if (selectedItem !== undefined && selectedItem.price !== undefined) {
                result = module.mainParams.areaSize * selectedItem.price;
            }

            logger.calcInfo(`Шаг "${step.title} - ${selectedItem.title}" площадь(${module.mainParams.areaSize}) * цена(${
                selectedItem.price}) = ${result}`);
            logger.line();

            return result;
        },
        printingTypeStepCalc: function(step) {
            let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
            let result = 0.00;

            if (selectedItem !== undefined && selectedItem.price !== undefined) {
                result = module.mainParams.areaSize * selectedItem.price;
            }

            let str =
                `Шаг "${step.title} - ${selectedItem.title}" площадь(${module.mainParams.areaSize}) * цена(${
                    selectedItem.price}) `;

            if (selectedItem !== undefined && selectedItem.photoPrintingDesignPrice !== undefined) {
                result = result + selectedItem.photoPrintingDesignPrice * 1;
                str = str + ` + цена оформления фотопечати(${selectedItem.photoPrintingDesignPrice})`;
            }

            str = str + ` = ${result}`;
            logger.calcInfo(str);
            logger.line();

            return result;
        },
        railsAndSocketsCalc: function(step) {
            logger.calcInfo(`Шаг "${step.title}`);

            //Sockets calc
            let socketDataIsValid = true;
            let socketDrillingTotalPrice = 0.00;
            let socketCount = 0;
            let socketBlockCountWithPhotoPrinting = 0;
            let socketBlockWithPhotoPrintingTotalPrice = 0.00;
            let socketSelectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
            if (socketSelectedItem.socketsBloks != undefined) {
                for (let i = 0; i < socketSelectedItem.socketsBloks.length; i++) {
                    if (socketSelectedItem.socketsBloks[i].isSelected === true) {
                        if (socketSelectedItem.socketsBloks[i].blockCount === '' ||
                            socketSelectedItem.socketsBloks[i].blockCount === undefined) {
                            socketDataIsValid = false;
                        } else {
                            socketCount = socketCount +
                                socketSelectedItem.socketsBloks[i].blockCount *
                                socketSelectedItem.socketsBloks[i].number;

                            if (socketSelectedItem.socketsBloks[i].needPhotoPrinting === true) {
                                socketBlockCountWithPhotoPrinting = socketBlockCountWithPhotoPrinting * 1 +
                                    socketSelectedItem.socketsBloks[i].blockCount * 1;
                            }
                        }
                    }
                }

                socketBlockWithPhotoPrintingTotalPrice = socketBlockCountWithPhotoPrinting *
                    calculatorConfig.SKINALI_PHOTO_PRINTING_ON_ONE_SOCKET_BLOCK_PRICE;

                socketDrillingTotalPrice = socketCount * calculatorConfig.SKINALI_ONE_SOCKET_DRILLING_PRICE;
            }
            logger.calcInfo(`колличество блоков резеток с фотопечатью(${socketBlockCountWithPhotoPrinting
                }) * цена фотопечати на блоке(${calculatorConfig.SKINALI_PHOTO_PRINTING_ON_ONE_SOCKET_BLOCK_PRICE}) = ${
                socketBlockWithPhotoPrintingTotalPrice}`);
            logger.calcInfo(`колличество выпилов под резетки(${socketCount}) * цена выпила(${calculatorConfig
                .SKINALI_ONE_SOCKET_DRILLING_PRICE}) = ${socketDrillingTotalPrice}`);

            let result = socketBlockWithPhotoPrintingTotalPrice + socketDrillingTotalPrice;
            logger.calcInfo(`сумма: ${result}`);
            logger.line();

            return result;
        },
        mountingTypeCalc: function(step) {
            let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
            let result = 0.00;

            if (selectedItem !== undefined && selectedItem.itemType === 'glue') {
                result = calculatorConfig.SKINALI_GLUE_PRICE;
                logger.calcInfo(`Шаг "${step.title} - клей" цена за клей (${calculatorConfig.SKINALI_GLUE_PRICE}) = ${result}`);
            } else if (selectedItem !== undefined && selectedItem.itemType === 'drilling') {
                result = module.mainParams.drillingCount * calculatorConfig.SKINALI_ONE_HOLE_DRILLING_PRICE;
                logger.calcInfo(`Шаг "${step.title} - сквозное" колличество отверстий(${module.mainParams.drillingCount}) * цена(${
                    calculatorConfig.SKINALI_ONE_HOLE_DRILLING_PRICE}) = ${result}`);
            }

            logger.line();

            return result;
        },
        panelSizeCalc: function(step) {
            let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
            let panelCount = selectedItem.title * 1;
            let enteredValuesList = step.stepElements[0].enteredValues.filter(item => item.number <= panelCount);
            let hardeningTotal = 0.00;
            let grindingTotal = 0.00;

            logger.calcInfo(`Шаг "${step.title}"`);
            enteredValuesList.forEach(function(enteredSizes, index) {

                if (enteredSizes.w === undefined ||
                    enteredSizes.w === '' ||
                    enteredSizes.h === undefined ||
                    enteredSizes.h === '') {
                    hardeningTotal = 0.00;
                    return;
                } else {
                    let panelAreaSize = enteredSizes.w / 1000 * enteredSizes.h / 1000;
                    let panelPerimeter = (enteredSizes.w / 1000 + enteredSizes.h / 1000) * 2;

                    if (panelAreaSize < calculatorConfig.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS) {
                        panelAreaSize = calculatorConfig.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS;
                        logger.calcInfo(
                            `площадь панели${index + 1} (площадь < ${calculatorConfig
                            .SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS}) = ${panelAreaSize}`);
                    } else {
                        logger.calcInfo(`площадь панели${index + 1} = ${panelAreaSize}`);
                    }

                    let hardening = 0.00;
                    if (enteredSizes.hardening === true) {
                        hardening = panelAreaSize * calculatorConfig.SKINALI_PANEL_HARDENING_PRICE;
                        hardeningTotal = hardeningTotal + hardening;
                    }

                    logger.calcInfo(
                        `закалка панели${index + 1} = площадь панели${index + 1}(${panelAreaSize}) * цену(${
                        calculatorConfig.SKINALI_PANEL_HARDENING_PRICE}) = ${hardening}`);

                    // если величина погонного метра (периметр) > 2 метров то цена за погонного метра (периметр) увеличивается на 25%
                    // если величина погонного метра (периметр) > 3 метров то цена за погонного метра (периметр) увеличивается на 50%
                    let grinGrindingPrice = calculatorConfig.SKINALI_PANEL_GRINDING_PRICE;

                    if ((enteredSizes.w / 1000 > 3) || (enteredSizes.h / 1000 > 3)) {
                        grinGrindingPrice = grinGrindingPrice + (grinGrindingPrice * 50 / 100);
                        logger.calcInfo(
                            `Для панели${index + 1} цена за шлифовку 1 метра(${calculatorConfig
                            .SKINALI_PANEL_GRINDING_PRICE}) + 50% = ${grinGrindingPrice}`);
                    } else if ((enteredSizes.w / 1000 > 2 && enteredSizes.w / 1000 <= 3) ||
                        (enteredSizes.h / 1000 > 2 && enteredSizes.h / 1000 <= 3)) {
                        grinGrindingPrice = grinGrindingPrice + (grinGrindingPrice * 25 / 100);
                        logger.calcInfo(
                            `Для панели${index + 1} цена за шлифовку 1 метра(${calculatorConfig
                            .SKINALI_PANEL_GRINDING_PRICE}) + 25% = ${grinGrindingPrice}`);
                    } else {
                        logger.calcInfo(
                            `Для панели${index + 1} цена за шлифовку 1 метра(${calculatorConfig
                            .SKINALI_PANEL_GRINDING_PRICE}) = ${grinGrindingPrice}`);
                    }

                    let grinding = panelPerimeter * grinGrindingPrice;
                    logger.calcInfo(
                        `шлифовка панели${index + 1} = периметр(погоных метров) панели(${panelPerimeter
                        }) * цена шлифовки(${grinGrindingPrice}) = ${grinding}`)

                    grindingTotal = grindingTotal + grinding;
                }
            });

            logger.calcInfo(`всего за шлифовку = ${grindingTotal}`);
            logger.calcInfo(`всего за закалку = ${hardeningTotal}`);

            let totalSum = hardeningTotal + grindingTotal;
            logger.calcInfo(`сумма = ${totalSum}`);
            logger.line();

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
                } else if (step.calcFunc === 'printingTypeStepCalc') {
                    result = result + module.printingTypeStepCalc(step);
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
        recalcAll: function() {
            logger.clear();
            logger.line();
            logger.header('Расчёт суммы');
            logger.line();
            this.mainParams.calc(orderSteps);
            let result = this.recalcSteps(orderSteps, 0);

            logger.totalSumInfo('И того сумма: ' + result);
            logger.line();

            totalPriceStep.setTotalPrice(result);

            consolePrinter.print(logger);
        },
        getLogger: function () {
            return logger;
        },
        init: function (steps, orderStepsHelperModule, calculatorConfigModule, orderStepModule, validationHelperModule,
            loggerModule, consolePrinterModule, totalPriceStepModule) {
			orderSteps = steps;
			orderStep = orderStepModule;
			calculatorConfig = calculatorConfigModule;
            orderStepsHelper = orderStepsHelperModule;
            validationHelper = validationHelperModule;
            logger = loggerModule.createLogger();
            totalPriceStep = totalPriceStepModule;

            consolePrinter = consolePrinterModule;
            consolePrinter.init(calculatorConfig);
        }
	};
    	
	return module;
}());