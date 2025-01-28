import $ from "jquery";
import _ from 'underscore';


export default (function() {
    let orderSteps;
    let orderStep;
    let calculatorConfig;
    let orderStepsHelper;
    let miscHelper;
    let logger;
    let consolePrinter;
    let totalPriceStep;

    const module = {
        mainParams: {
            areaSize: 0.00,
            perimeterSize: 0.00,
            drillingCount: 0,
            calc: function(steps) {
                if (steps === undefined || steps === null) {
                    return;
                }

                const _this = this;
                _(steps).each(step => {
                    if (step.mainParamsCalcFunc === "panelSizeMainParamsCalc") {
                        _this.panelSizeMainParamsCalc(step);
                    }

                    if ($.isArray(step.stepElements)) {
                        _(step.stepElements).each(stepElement => {
                            if (stepElement.items !== undefined) {
                                _(stepElement.items).each(item => {
                                    if (item.isSelected === true) {
                                        _this.calc(item.childSteps);
                                    }
                                });
                            }
                        });
                    }
                });
            },
            panelSizeEnteredSizeMap: function(enteredSizes) {
                enteredSizes.w = (enteredSizes.w === undefined) ? "" : enteredSizes.w;
                enteredSizes.w = (miscHelper.isPositiveInteger(enteredSizes.w) === false) ? "" : enteredSizes.w;

                enteredSizes.h = (enteredSizes.h === undefined) ? "" : enteredSizes.h;
                enteredSizes.h = (miscHelper.isPositiveInteger(enteredSizes.h) === false) ? "" : enteredSizes.h;

                return enteredSizes;
            },
            panelSizeMainParamsCalc: function(step) {
                const selectedItem = _(step.stepElements[0].items).find(item => {
                    return item.isSelected === true;
                });
                const panelCount = selectedItem.title * 1;

                module.mainParams.areaSize = 0.00;
                module.mainParams.perimeterSize = 0.00;
                module.mainParams.drillingCount = 0;

                const panelSizeStep = orderStepsHelper.getStepOrNull("step-panel-size");
                panelSizeStep.stopRender = false;


                const enteredSizes = _(step.stepElements[0].enteredValues).filter(item => {
                    return item.number <= panelCount;
                });

                _(enteredSizes).each(enteredSizesItem => {
                    enteredSizesItem = module.mainParams.panelSizeEnteredSizeMap(enteredSizesItem);

                    if ((enteredSizesItem.w) && (enteredSizesItem.h)) {

                        let panelAreaSize = enteredSizesItem.w / 1000 * enteredSizesItem.h / 1000;

                        if (panelAreaSize < calculatorConfig.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS) {
                            panelAreaSize = calculatorConfig.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS;
                            logger.mainParamsCalcInfo(`- размер панели${enteredSizesItem.number} < ${calculatorConfig
                                .SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS}`);
                        }
                        logger.mainParamsCalcInfo(`- размер панели${enteredSizesItem.number} = ${panelAreaSize} м²`);

                        module.mainParams.areaSize = module.mainParams.areaSize + panelAreaSize;
                        module.mainParams.perimeterSize = module.mainParams.perimeterSize +
                            (enteredSizesItem.w / 1000 + enteredSizesItem.h / 1000) * 2;

                        //цена за высверливание 1 отверстия в панелей 
                        //(количество отверстий в одной панели = 1 + (целое число от длинна панели в метрах, если оно равно 0 то 1))
                        let w = Math.trunc(enteredSizesItem.w / 1000);
                        if (w <= 0) {
                            w = 1;
                            logger.mainParamsCalcInfo(`- длинна панели${enteredSizesItem.number
                                } < 1 метра, длина = 1 для расчёта количество высверливание`);
                        }
                        logger.mainParamsCalcInfo(
                            `- количество высверливаний для панели${enteredSizesItem.number} = ${(1 + w)}`);
                        module.mainParams.drillingCount = module.mainParams.drillingCount + (1 + w);
                        logger.line();
                    } else {
                        module.mainParams.areaSize = 0.00;
                        module.mainParams.perimeterSize = 0.00;
                        module.mainParams.drillingCount = 0;
                        panelSizeStep.stopRender = true;
                    }
                });

                logger.mainParamsCalcInfo(`* Сумма площадей всех панелей: ${module.mainParams.areaSize} м²`);
                logger.mainParamsCalcInfo(
                    `* Сумма периметров(всего погонных метров) всех панелей: ${module.mainParams.areaSize} м`);
                logger.mainParamsCalcInfo(
                    `* Всего необходимо высверлить отверстий: ${module.mainParams.drillingCount}`);
                logger.line();
            }
        },

        defaultCalc: function(step) {
            const selectedItem = _(step.stepElements[0].items).find(item => {
                return item.isSelected === true;
            });
            let result = 0.00;
            if (selectedItem.price !== undefined) {
                result = selectedItem.price;
            }

            logger.calcInfo(`Шаг "${step.title}" = ${result}`);
            logger.line();
            return result;
        },
        priceMultiplyByAreaSizeCalc: function(step) {
            const selectedItem = _(step.stepElements[0].items).find(item => {
                return item.isSelected === true;
            });
            let result = 0.00;

            if (selectedItem && selectedItem.price) {
                result = module.mainParams.areaSize * selectedItem.price;
            }

            logger.calcInfo(
                `Шаг "${step.title} - ${selectedItem.title}" площадь(${module.mainParams.areaSize}) * цена(${
                selectedItem.price}) = ${result}`);
            logger.line();

            return result;
        },
        printingTypeStepCalc: function(step) {
            const selectedItem = _(step.stepElements[0].items).find(item => {
                return item.isSelected === true;
            });
            let result = 0.00;

            if (selectedItem && selectedItem.price) {
                result = module.mainParams.areaSize * selectedItem.price;
            }

            let str = `Шаг "${step.title} - ${selectedItem.title}" площадь(${module.mainParams.areaSize}) * цена(${
                selectedItem.price}) `;

            if (selectedItem && selectedItem.photoPrintingDesignPrice !== undefined) {
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
            let socketDrillingTotalPrice = 0.00;
            let socketCount = 0;
            let socketBlockCountWithPhotoPrinting = 0;
            let socketBlockWithPhotoPrintingTotalPrice = 0.00;
            const socketSelectedItem = _(step.stepElements[0].items).find(item => {
                return item.isSelected === true;
            });

            if (socketSelectedItem.socketsBlocs) {
                _(socketSelectedItem.socketsBlocs).each(socketsBlok => {

                    if (socketsBlok.isSelected === true) {
                        if (socketsBlok.blockCount) {
                            socketCount = socketCount + socketsBlok.blockCount * socketsBlok.number;

                            if (socketsBlok.needPhotoPrinting === true) {
                                socketBlockCountWithPhotoPrinting =
                                    (socketBlockCountWithPhotoPrinting * 1) + (socketsBlok.blockCount * 1) * socketsBlok.number;
                            }
                        }
                    }
                });

                socketBlockWithPhotoPrintingTotalPrice = socketBlockCountWithPhotoPrinting *
                    calculatorConfig.SKINALI_PHOTO_PRINTING_ON_ONE_SOCKET_BLOCK_PRICE;

                socketDrillingTotalPrice = socketCount *
                    calculatorConfig.SKINALI_ONE_SOCKET_DRILLING_PRICE;
            }

            logger.calcInfo(`количество розеток с фотопечатью(${socketBlockCountWithPhotoPrinting
                }) * цена фотопечати на одной розетке(${calculatorConfig.SKINALI_PHOTO_PRINTING_ON_ONE_SOCKET_BLOCK_PRICE}) = ${
                socketBlockWithPhotoPrintingTotalPrice}`);

            logger.calcInfo(`количество выпилов под розетки(${socketCount}) * цена выпила(${calculatorConfig
                .SKINALI_ONE_SOCKET_DRILLING_PRICE}) = ${socketDrillingTotalPrice}`);

            const result = socketBlockWithPhotoPrintingTotalPrice + socketDrillingTotalPrice;
            logger.calcInfo(`сумма: ${result}`);
            logger.line();

            return result;
        },
        mountingTypeCalc: function(step) {
            const selectedItem = _(step.stepElements[0].items).find(item => {
                return item.isSelected === true;
            });
            let result = 0.00;

            if (selectedItem && selectedItem.itemType === "glue") {
                result = calculatorConfig.SKINALI_GLUE_PRICE;
                logger.calcInfo(
                    `Шаг "${step.title} - клей" цена за клей (${calculatorConfig.SKINALI_GLUE_PRICE}) = ${result}`);
            } else if (selectedItem && selectedItem.itemType === "drilling") {
                result = module.mainParams.drillingCount * calculatorConfig.SKINALI_ONE_HOLE_DRILLING_PRICE;
                logger.calcInfo(
                    `Шаг "${step.title} - сквозное" количество отверстий(${module.mainParams.drillingCount}) * цена(${
                    calculatorConfig.SKINALI_ONE_HOLE_DRILLING_PRICE}) = ${result}`);
            } else if (selectedItem && selectedItem.itemType === "withoutDrilling") {
                result = 0.00;
                logger.calcInfo(`Шаг "${step.title} - без отверстий" = ${result}`);
            }

            logger.line();

            return result;
        },
        metringAndInstallationPriceCalc: function(step) {
            logger.calcInfo(`Шаг "${step.title}`);
            let result = 0.00;

            //metring calc
            const metringSelectedItem = _(step.stepElements[0].items).find(item => {
                return item.isSelected === true;
            });

            if (metringSelectedItem && metringSelectedItem.price !== undefined) {
                logger.calcInfo(`цена замера = = ${metringSelectedItem.price}`);
                result = result + metringSelectedItem.price;
            }

            //installing calc
            const installingSelectedItem = _(step.stepElements[1].items).find(item => {
                return item.isSelected === true;
            });

            if (installingSelectedItem && installingSelectedItem.price !== undefined) {
                const SUM = module.mainParams.areaSize * installingSelectedItem.price;
                logger.calcInfo(`цена монтажа = площадь(${module.mainParams.areaSize}) * цена(${
                    installingSelectedItem.price}) = ${SUM}`);

                result = result + SUM;
            }

            logger.calcInfo(`сумма = ${result}`);
            logger.line();

            return result;
        },
        panelSizeCalc: function(step) {
            const selectedItem = _(step.stepElements[0].items).find(item => {
                return item.isSelected === true;
            });
            const panelCount = selectedItem.title * 1;
            let hardeningTotal = 0.00;
            let grindingTotal = 0.00;

            logger.calcInfo(`Шаг "${step.title}"`);
            const enteredSizes = _(step.stepElements[0].enteredValues).filter(item => {
                return item.number <= panelCount;
            });

            _(enteredSizes).each(enteredSizesItem => {

                if (enteredSizesItem.w && enteredSizesItem.h) {
                    let panelAreaSize = enteredSizesItem.w / 1000 * enteredSizesItem.h / 1000;
                    const panelPerimeter = (enteredSizesItem.w / 1000 + enteredSizesItem.h / 1000) * 2;

                    if (panelAreaSize < calculatorConfig.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS) {
                        panelAreaSize = calculatorConfig.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS;
                        logger.calcInfo(`площадь панели${enteredSizesItem.number} (площадь < ${calculatorConfig
                            .SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS}) = ${panelAreaSize}`);
                    } else {
                        logger.calcInfo(`площадь панели${enteredSizesItem.number} = ${panelAreaSize}`);
                    }

                    let hardening = 0.00;
                    if (enteredSizesItem.hardening === true) {
                        hardening = panelAreaSize * calculatorConfig.SKINALI_PANEL_HARDENING_PRICE;
                        hardeningTotal = hardeningTotal + hardening;
                    }

                    logger.calcInfo(
                        `закалка панели${enteredSizesItem.number} = площадь панели${enteredSizesItem.number}(${
                        panelAreaSize}) * цену(${
                        calculatorConfig.SKINALI_PANEL_HARDENING_PRICE}) = ${hardening}`);

                    // если величина погонного метра (периметр) > 2 метров то цена за погонного метра (периметр) увеличивается на 25%
                    // если величина погонного метра (периметр) > 3 метров то цена за погонного метра (периметр) увеличивается на 50%
                    let grinGrindingPrice = calculatorConfig.SKINALI_PANEL_GRINDING_PRICE;

                    if ((enteredSizesItem.w / 1000 > 3) || (enteredSizesItem.h / 1000 > 3)) {

                        grinGrindingPrice = grinGrindingPrice + (grinGrindingPrice * 50 / 100);
                        logger.calcInfo(
                            `Для панели${enteredSizesItem.number} цена за шлифовку 1 метра(${calculatorConfig
                            .SKINALI_PANEL_GRINDING_PRICE}) + 50% = ${grinGrindingPrice}`);

                    } else if ((enteredSizesItem.w / 1000 > 2 && enteredSizesItem.w / 1000 <= 3) ||
                        (enteredSizesItem.h / 1000 > 2 && enteredSizesItem.h / 1000 <= 3)) {

                        grinGrindingPrice = grinGrindingPrice + (grinGrindingPrice * 25 / 100);
                        logger.calcInfo(
                            `Для панели${enteredSizesItem.number} цена за шлифовку 1 метра(${calculatorConfig
                            .SKINALI_PANEL_GRINDING_PRICE}) + 25% = ${grinGrindingPrice}`);

                    } else {
                        logger.calcInfo(
                            `Для панели${enteredSizesItem.number} цена за шлифовку 1 метра(${calculatorConfig
                            .SKINALI_PANEL_GRINDING_PRICE}) = ${grinGrindingPrice}`);
                    }

                    const grinding = panelPerimeter * grinGrindingPrice;
                    logger.calcInfo(
                        `шлифовка панели${enteredSizesItem.number} = периметр(погонных метров) панели(${panelPerimeter
                        }) * цена шлифовки(${grinGrindingPrice}) = ${grinding}`);

                    grindingTotal = grindingTotal + grinding;
                } else {
                    hardeningTotal = 0.00;
                    return;
                }
            });

            logger.calcInfo(`всего за шлифовку = ${grindingTotal}`);
            logger.calcInfo(`всего за закалку = ${hardeningTotal}`);

            const totalSum = hardeningTotal + grindingTotal;
            logger.calcInfo(`сумма = ${totalSum}`);
            logger.line();

            return totalSum;
        },


        recalcSteps: function(steps, result) {
            if (steps === undefined) {
                return result;
            }

            const _this = this;
            _(steps).each(step => {
                if (step.calcFunc === "panelSizeCalc") {
                    result = result + module.panelSizeCalc(step);
                } else if (step.calcFunc === "priceMultiplyByAreaSizeCalc") {
                    result = result + module.priceMultiplyByAreaSizeCalc(step);
                } else if (step.calcFunc === "printingTypeStepCalc") {
                    result = result + module.printingTypeStepCalc(step);
                } else if (step.calcFunc === "railsAndSocketsCalc") {
                    result = result + module.railsAndSocketsCalc(step);
                } else if (step.calcFunc === "mountingTypeCalc") {
                    result = result + module.mountingTypeCalc(step);
                } else if (step.calcFunc === "printingType") {
                    result = result + module.printingTypeCalc(step);
                } else if (step.calcFunc === "metringAndInstallationPriceCalc") {
                    result = result + module.metringAndInstallationPriceCalc(step);
                } else if (step.calcFunc === "defaultCalc") {
                    result = result + module.defaultCalc(step);
                }

                if ($.isArray(step.stepElements)) {
                    _(step.stepElements).each(stepElement => {
                        if (stepElement.items) {
                            _(stepElement.items).each(item => {
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
            logger.header("Расчёт суммы");
            logger.line();

            this.mainParams.calc(orderSteps);
            const result = this.recalcSteps(orderSteps, 0);

            logger.totalSumInfo(`И того сумма: ${result}`);
            logger.line();

            totalPriceStep.setTotalPrice(result);

            consolePrinter.print(logger);
        },
        getLogger: function() {
            return logger;
        },
        init: function(steps,
            orderStepsHelperModule,
            calculatorConfigModule,
            orderStepModule,
            miscHelperModule,
            loggerModule,
            consolePrinterModule,
            totalPriceStepModule) {
            orderSteps = steps;
            orderStep = orderStepModule;
            calculatorConfig = calculatorConfigModule;
            orderStepsHelper = orderStepsHelperModule;
            miscHelper = miscHelperModule;
            logger = loggerModule.createLogger();
            totalPriceStep = totalPriceStepModule;

            consolePrinter = consolePrinterModule;
            consolePrinter.init(calculatorConfig);
        }
    };

    return module;
}());