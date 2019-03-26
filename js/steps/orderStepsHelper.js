var orderStepsHelperModule = (function(){
	let orderSteps;
	
	let module = {
		init(orderStepsModule){
			orderSteps = orderStepsModule;
		},
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
                                    result = module.findStep(stepId, item.childSteps);
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
	
	return module;
}());