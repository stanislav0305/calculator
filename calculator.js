var calculatorModule = (function() {
    let orderSteps;
    let orderStep;
    let calculatorConstsHelper;

    let _orderStepsHelper = {
        getStepElementOrNull(step, elementId) {
            if (step.stepElements === undefined) {
                return null;
            }

            for (let i = 0; i < step.stepElements.length; i++) {
                if (step.stepElements[i].id === elementId && step.stepElements[i].id.length === elementId.length) {
                    return step.stepElements[i];
                }
            }

            return null;
        },
        findStep: function(stepId, steps) {
            let result = null;

            for (let sInx = 0; sInx < steps.length; sInx++) {
                let step = steps[sInx];
                if (step.id === stepId && step.id.length === stepId.length) {
                    result = step;
                    break;
                }
                if (step.stepElements !== undefined && result === null) {
                    let stepElements = step.stepElements;
                    for (let eInx = 0; eInx < stepElements.length; eInx++) {
                        let element = step.stepElements[eInx];
                        if (element.items !== undefined) {
                            for (let iInx = 0; iInx < element.items.length; iInx++) {
                                let item = element.items[iInx];
                                if (item.childSteps !== undefined) {
                                    result = _orderStepsHelper.findStep(stepId, item.childSteps);
                                    if (result !== null) {
                                        break;
                                    }
                                }
                            }
                        }
                        if (result !== null) {
                            break;
                        }
                    }
                }
                if (result !== null) {
                    break;
                }
            }

            return result;
        },
        getStepOrNull: function(stepId) {
            return this.findStep(stepId, orderSteps);
        },
        unselectElementItems(items) {
            for (let i = 0; i < items.length; i++) {
                items[i].isSelected = undefined;
            }
        },
        selectElementItem(items, itemId) {
            let selectedItem;
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === itemId && items[i].id.length === itemId.length) {
                    items[i].isSelected = true;
                    selectedItem = items[i];
                    break;
                }
            }

            return selectedItem;
        },
        savePanelSize(element, sizeNumber, valueType, value) {
            for (let evIdx = 0; evIdx < element.enteredValues.length; evIdx++) {
                let enteredValue = element.enteredValues[evIdx];
                if (enteredValue.number === sizeNumber * 1) {
                    if (valueType === 'width') {
                        enteredValue.w = value;
                    } else if (valueType === 'height') {
                        enteredValue.h = value;
                    } else if (valueType === 'hardening') {
                        enteredValue.hardening = value;
                    }
                    break;
                }
            }
        },
        saveInstallationOfRailsCount(element, itemId, value) {
            for (let iIdx = 0; iIdx < element.items.length; iIdx++) {
                let item = element.items[iIdx];
                if (item.id === itemId) {
                    item.enteredValue = value;
                    break;
                }
            }
        },
        saveCabinTypesSize(element, itemId, sizeName, value) {
            for (let iIdx = 0; iIdx < element.items.length; iIdx++) {
                let item = element.items[iIdx];
                if (item.id === itemId && item.sizes !== undefined) {
                    for (let sIdx = 0; sIdx < item.sizes.length; sIdx++) {
                        let size = item.sizes[sIdx];
                        if (size.name === sizeName) {
                            size.enteredValue = value;
                            break;
                        }
                    }
                    break;
                }
            }
        },
        saveCabinTypesAdditionalParamatr(element, itemId, additionalParamatresId, additionalItemId) {
            let isChanged = false;
            for (let iIdx = 0; iIdx < element.items.length; iIdx++) {
                let item = element.items[iIdx];
                if (item.id === itemId && item.additionalParamatres !== undefined) {
                    for (let apIdx = 0; apIdx < item.additionalParamatres.length; apIdx++) {
                        let additionalParametr = item.additionalParamatres[apIdx];
                        if (additionalParametr.id === additionalParamatresId) {
                            for (let apiIdx = 0; apiIdx < additionalParametr.items.length; apiIdx++) {
                                if (additionalParametr.items[apiIdx].id === additionalItemId) {
                                    additionalParametr.items[apiIdx].isSelected = true;
                                    isChanged = true;
                                    break;
                                }
                            }
                            isChanged = true;
                            break;
                        }
                    }

                    if (isChanged === true) {
                        break;
                    }
                }
            }
        },
        unselectCabinTypesAdditionalParamatr(element, itemId, additionalParamatresId) {
            let isChanged = false;
            for (let iIdx = 0; iIdx < element.items.length; iIdx++) {
                let item = element.items[iIdx];
                if (item.id === itemId && item.additionalParamatres !== undefined) {
                    for (let apIdx = 0; apIdx < item.additionalParamatres.length; apIdx++) {
                        let additionalParametr = item.additionalParamatres[apIdx];
                        if (additionalParametr.id === additionalParamatresId) {
                            for (let apiIdx = 0; apiIdx < additionalParametr.items.length; apiIdx++) {
                                additionalParametr.items[apiIdx].isSelected = false;
                            }
                            isChanged = true;
                            break;
                        }
                    }

                    if (isChanged === true) {
                        break;
                    }
                }
            }
        },
        saveSocketsBlokSelect(element, itemId, socketBlockNumber, isChecked) {
            let itemIndex = element.items.findIndex(item => item.id === itemId);
            let item = element.items[itemIndex];
            let socketsBloks = item.socketsBloks;

            socketsBloks[socketBlockNumber - 1].isSelected = isChecked;
            return socketsBloks[socketBlockNumber - 1];
        },
        saveSocketsCount(element, itemId, socketBlockNumber, value) {
            let itemIndex = element.items.findIndex(item => item.id === itemId);
            let item = element.items[itemIndex];
            let socketsBloks = item.socketsBloks;

            socketsBloks[socketBlockNumber - 1].blockCount = value;
            return socketsBloks[socketBlockNumber - 1];
        }
    };


    let _calculationHelper;

    let getCalculationHelper = function() {
        return {
            mainParams: {
                areaSize: 0.00,
                perimeterSize: 0.00,
                drillingCount: 0,
                //printingTypePrice:0.00,
                //panelSizesIsValid: true,
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
                isPositiveInteger: function(s) {
                    return !!s.match(/^[0-9]+$/);
                },
                panelSizeEnteredSizeMap: function (enteredSizes) {
                    enteredSizes.w = (enteredSizes.w === undefined) ? '' : enteredSizes.w;
                    enteredSizes.w = (_calculationHelper.mainParams.isPositiveInteger(enteredSizes.w) === false) ? '' : enteredSizes.w;

                    enteredSizes.h = (enteredSizes.h === undefined) ? '' : enteredSizes.h;
                    enteredSizes.h = (_calculationHelper.mainParams.isPositiveInteger(enteredSizes.h) === false) ? '' : enteredSizes.h;

                    return enteredSizes;
                },
                panelSizeMainParamsCalc: function(step) {
                    let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
                    let panelCount = selectedItem.title * 1;

                    _calculationHelper.mainParams.areaSize = 0.00;
                    _calculationHelper.mainParams.perimeterSize = 0.00;
                    _calculationHelper.mainParams.drillingCount = 0;

					let panaelSizeStep = _orderStepsHelper.getStepOrNull('step-panel-size');
					panaelSizeStep.stopRender = false;
					
                    let enteredValuesList = step.stepElements[0].enteredValues.filter(item => item.number <= panelCount);
                    for (let evIdx = 0; evIdx < enteredValuesList.length; evIdx++) {
                        let enteredSizes = enteredValuesList[evIdx];
                        enteredSizes = _calculationHelper.mainParams.panelSizeEnteredSizeMap(enteredSizes);

                        if (enteredSizes.w === undefined ||
                            enteredSizes.w === '' ||
                            enteredSizes.h === undefined ||
                            enteredSizes.h === '') {
                            _calculationHelper.mainParams.areaSize = 0.00;
                            _calculationHelper.mainParams.perimeterSize = 0.00;
                            _calculationHelper.mainParams.drillingCount = 0;
                            //_calculationHelper.mainParams.panelSizesIsValid = false;
							panaelSizeStep.stopRender = true;
  
                        } else {
                            let panelAreaSize = enteredSizes.w / 1000 * enteredSizes.h / 1000;
                            if (panelAreaSize < calculatorConstsHelper.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS) {
                                panelAreaSize = calculatorConstsHelper.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS;
                            }

                            _calculationHelper.mainParams.areaSize =
                                _calculationHelper.mainParams.areaSize + panelAreaSize;
                            _calculationHelper.mainParams.perimeterSize = _calculationHelper.mainParams.perimeterSize +
                                (enteredSizes.w / 1000 + enteredSizes.h / 1000) * 2;

                            //цена за высверливание 1 отверстия в панелей (количество отверстий в одной панели = 1 + (целое число от длинна панели в метрах, если оно равно 0 то 1))
                            let w = Math.trunc(enteredSizes.w / 1000);
                            w = w <= 0 ? 1 : w;
                            _calculationHelper.mainParams.drillingCount =
                                _calculationHelper.mainParams.drillingCount + (1 + w);
                        }
                    }
                }
                /*,				
                printingTypeMainParamsCalc: function(step){
                    let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
                    if (selectedItem.price !== undefined){
                        _calculationHelper.mainParams.printingTypePrice = selectedItem.price;
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
                    return _calculationHelper.mainParams.areaSize * selectedItem.price;
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

                    result = result + socketCount * calculatorConstsHelper.SKINALI_ONE_SOCKET_DRILLING_PRICE;
                }

                return result;
            },
            mountingTypeCalc: function(step) {
                let selectedItem = step.stepElements[0].items.filter(item => item.isSelected === true)[0];
                if (selectedItem !== undefined && selectedItem.itemType === 'glue') {
                    return calculatorConstsHelper.SKINALI_GLUE_PRICE;
                } else if (selectedItem !== undefined && selectedItem.itemType === 'drilling') {
                    return _calculationHelper.mainParams.drillingCount *
                        calculatorConstsHelper.SKINALI_ONE_HOLE_DRILLING_PRICE;
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
                        if (panelAreaSize < calculatorConstsHelper.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS) {
                            panelAreaSize = calculatorConstsHelper.SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS;
                        }

                        if (enteredSizes.hardening === true) {
                            hardeningTotal =
                                hardeningTotal + panelAreaSize * calculatorConstsHelper.SKINALI_PANEL_HARDENING_PRICE
                        }
                    }
                });

                // если величина погонного метра (периметр) > 2 метров то цена за погонного метра (периметр) увеличивается на 25%
                // если величина погонного метра (периметр) > 3 метров то цена за погонного метра (периметр) увеличивается на 50%
                let grinGrindingPrice = calculatorConstsHelper.SKINALI_PANEL_GRINDING_PRICE;
                if (_calculationHelper.mainParams.perimeterSize > 2) {
                    grinGrindingPrice = grinGrindingPrice + (grinGrindingPrice * 25 / 100);
                } else if (_calculationHelper.mainParams.perimeterSize > 3) {
                    grinGrindingPrice = grinGrindingPrice + (grinGrindingPrice * 50 / 100);
                }

                let grindingTotal = _calculationHelper.mainParams.perimeterSize *
                    calculatorConstsHelper.SKINALI_PANEL_GRINDING_PRICE;
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
                        result = result + _calculationHelper.panelSizeCalc(step);
                    } else if (step.calcFunc === 'priceMultiplyByAreaSizeCalc') {
                        result = result + _calculationHelper.priceMultiplyByAreaSizeCalc(step);
                    } else if (step.calcFunc === 'railsAndSocketsCalc') {
                        result = result + _calculationHelper.railsAndSocketsCalc(step);
                    } else if (step.calcFunc === 'mountingTypeCalc') {
                        result = result + _calculationHelper.mountingTypeCalc(step);
                    } else if (step.calcFunc === 'printingType') {
                        result = result + _calculationHelper.printingTypeCalc(step);
                    } else if (step.calcFunc === 'defaultCalc') {
                        result = result + _calculationHelper.defaultCalc(step);
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
                this.mainParams.calc(orderSteps);
                let result = this.recalcSteps(orderSteps, 0);
                orderStep.setTotalPrice(result);
            }
        };
    }

    let module = {
        orderStepsHelper: _orderStepsHelper,
        calculationHelper: _calculationHelper,
        init: function(calculatorConstsModule, orderStepsModule, orderStepModule, railAndSocketStepModule) {
            calculatorConstsHelper = calculatorConstsModule;

            _calculationHelper = getCalculationHelper();

            orderStepsModule.init(calculatorConstsHelper);
            orderSteps = orderStepsModule.getOrderSteps();

            orderStep = orderStepModule;
            orderStep.init(_orderStepsHelper, orderSteps, _calculationHelper, railAndSocketStepModule);
            orderStep.renderAllSteps();

        }
    };


    return module;
}());