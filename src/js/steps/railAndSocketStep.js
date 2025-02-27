﻿import $ from "jquery";


export default (function(){
    let orderStep;
    let orderStepRender;
	let orderStepsHelper;
	let calcHelper;
    let templateHelper;

    let module = { 
        renderRadioSocketsCount: function(element, stepId) {
            if (element.title !== undefined) {
                orderStepRender.renderElementTitle(element.title, element.info);
            }

            /*
            const data = {
               stepId: stepId,
               element: element
            };
            const html = templateHelper.getTemplateResult("radio-sockets-count-block", data);
            $(`#${stepId}`).append(html);


            if (element.items !== undefined) {
            */
            if (element.items !== undefined) {
                let $container = $('<div class="container mb-4 px-0">');
                let $row = $('<div class="row">');
                let $radio = $(`<div id="${element.id}" class="ml-3 mt-1">`);
                $radio.appendTo($row);

                $container.append($row);
                $(`#${stepId}`).append($container);

                element.items.forEach(function (item, index) {
                    let radioItemDiv = $('<div class="custom-control custom-radio">');
                    let checkedAtr = item.isSelected === true ? 'checked' : '';
                    radioItemDiv
                        .append(
                            `<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${
                            checkedAtr} step-id="${stepId}" />`)
                        .append(`<label for="${item.id}" class="custom-control-label">${item.title}</label>`);

                    if (item.info !== undefined) {
                        let toolTip = module.renderToolTip(item.info);
                        radioItemDiv.append(toolTip);
                    }

                    $radio.append(radioItemDiv);
                });

            module.renderSocketCountElements(element, stepId);
                orderStepRender.radioSetEvents(element);
            }
        },
        renderSocketCountElements: function(element, stepId) {
            let elementId = element.id;
            let $container = $(`#${elementId}`).parent();
            let installationOfRailsCountId = `sockets-count-${elementId}`;

            let sizeElementGroup = $(`<div id="${installationOfRailsCountId}" class="mt-3">`);
            sizeElementGroup.appendTo($container);

            var $elementsGroupRowContainer = $('<div class="row">');
            for (let i = 0; i < element.items.length; i++) {
                let item = element.items[i];

                if (item.title === 'Да') {
                    let displayCssClass = item.isSelected === true ? 'd-inline-block' : 'd-none';

                    item.socketsBlocs.forEach(function(socketsBlok, index) {
                        let checkedAtr = socketsBlok.isSelected === true ? 'checked' : '';
                        let checkboxEnteredValueDiv =
                            $('<div class="image-checkbox-item custom-control custom-checkbox my-1 d-inline-block">')
                                .append(
                                    `<input id="${item.id}-entered-value-${socketsBlok.number
                                    }" type="checkbox" class="custom-control-input" name="${element.id}" ${checkedAtr
                                    } step-id="${stepId}" element-id="${element.id}" item-id="${item.id
                                    }" socket-block-number="${socketsBlok.number}" />`);

                        let enteredValueLabel =
                            $(`<label for="${item.id}-entered-value-${socketsBlok.number
                                }" class="custom-control-label socket-checkbox-label">`);
                        for (let i = 0; i < socketsBlok.number; i++) {
                            enteredValueLabel.append(
                                `<img for="${item.id}" class="socket-img" alt="${socketsBlok.title
                                }"/>`);
                        }

                        let needPhotoPrintingCheckedAtr = socketsBlok.needPhotoPrinting === true ? 'checked' : '';
                        let displayBlockCountCssClass = socketsBlok.isSelected === true ? 'd-inline-block' : 'd-none';
                        checkboxEnteredValueDiv
                            .append(enteredValueLabel)
                            .append(
                                $(`<input id="inputSocketsCount-${socketsBlok.number
                                    }" type="number" class="small-numberInput ml-2 align-bottom ${
                                    displayBlockCountCssClass}" step-id="${stepId}" element-id="${
                                    elementId}" item-id="${item.id}" socket-block-number=${socketsBlok.number
                                    } min="1" max="99">`)
                                .val(socketsBlok.blockCount)
                            )
                            .append(
                                $(`<label id="labelSocketsCount-${socketsBlok.number
                                    }" class="blue-text ml-1 align-bottom ${displayBlockCountCssClass}">`)
                                .text('блок(ов)')
                            );


                        let blockWitPhotoPrintDiv =
                            $(`<div id="divSocketsPrint-${socketsBlok.number
                                    }" class="custom-control custom-checkbox ml-4 mb-1 align-bottom ${
                                    displayBlockCountCssClass}">`)
                                .append(
                                    `<input id="inputSocketsPrint-${socketsBlok.number
                                    }" type="checkbox" class="d-inline-block custom-control-input ${
                                    displayBlockCountCssClass}" required step-id="${stepId}" element-id="${elementId
                                    }" item-id="${item.id}" socket-block-number="${socketsBlok.number}" ${
                                    needPhotoPrintingCheckedAtr}>`)
                                .append(
                                    `<label id="labelSocketsPrint-${socketsBlok.number}" class="custom-control-label ${
                                    displayBlockCountCssClass}" for="inputSocketsPrint-${socketsBlok.number
                                    }">с фотопечатью</label>`)


                        $(`<div class="sockets-count-blok col-12 p-0 mt-1 ml-0 mb-0 mr-0 ${displayCssClass}">`)
                            .append(checkboxEnteredValueDiv)
                            .append(blockWitPhotoPrintDiv)
                            .appendTo($elementsGroupRowContainer);

                        module.setEventInputSocketsCount(socketsBlok.number);
                        module.setEventSocketsBlockNeedPhotoPrintingElements(socketsBlok.number);
                    });
                }
            }

            $elementsGroupRowContainer.appendTo(`#${installationOfRailsCountId}`);


            module.setEventSocketsBlockElements(elementId);
        },
        displayInputSocketsCount: function(show) {
            if (show === true) {
                $('.sockets-count-blok').removeClass('d-none');
                $('.sockets-count-blok').addClass('d-inline-block');
            } else {
                $('.sockets-count-blok').removeClass('d-inline-block');
                $('.sockets-count-blok').addClass('d-none');
            }
        },
        eventSocketsCountElements: [],
        setEventSocketsCountElements: function(elementId) {
            module.eventSocketsCountElements.push(elementId);
            $(document).on('change',
                `input:radio[name^="${elementId}"]`,
                function(event) {
                    let stepId = $(this).attr('step-id');
                    let elementId = $(this).attr('name');
                    let itemId = this.id;

                    let step = orderStepsHelper.getStepOrNull(stepId);
                    let element = orderStepsHelper.getStepElementOrNull(step, elementId);

                    orderStepsHelper.unselectElementItems(element.items);
                    let selectedItem = orderStepsHelper.selectElementItem(element.items, itemId);

                    let show = selectedItem.title === 'Да' && selectedItem.isSelected === true;
                    module.displayInputSocketsCount(show);
                    calcHelper.recalcAll();
                });
        },
        removeSocketsCountElements: function() {
            for (let i = 0; i < module.eventSocketsCountElements.length; i++) {
                $(document).off('change', `input:radio[name^="${module.eventSocketsCountElements[i]}"]`);
            }

            module.eventSocketsCountElements = [];
        },

        eventSocketsBlockElements: [],
        setEventSocketsBlockElements: function(elementId) {
            module.eventSocketsBlockElements.push(elementId);
            $(document).on('change', `input:checkbox[name^="${elementId}"]`, function(event) {
                let isSelected = $(this).is(':checked');
                let socketBlock = module.getSocketBlock($(this));

                socketBlock.isSelected = isSelected;

                module.displaySocketBlokCountInputCount(socketBlock.number, isSelected);
                calcHelper.recalcAll();
            });
        },
        removeSocketsBlockElements: function() {
            for (let i = 0; i < module.eventSocketsBlockElements.length; i++) {
                $(document).off('change', `input:checkbox[name^="${module.eventSocketsBlockElements[i]}"]`);
            }

            module.eventSocketsBlockElements = [];
        },
        displaySocketBlokCountInputCount: function(socketsBlokNumber, show) {
            if (show === true) {
                $(`#inputSocketsCount-${socketsBlokNumber}`)
                    .removeClass('d-none')
                    .addClass('d-inline-block');

                $(`#labelSocketsCount-${socketsBlokNumber}`)
                    .removeClass('d-none')
                    .addClass('d-inline-block');

                $(`#inputSocketsPrint-${socketsBlokNumber}`)
                    .removeClass('d-none')
                    .addClass('d-inline-block');

                $(`#labelSocketsPrint-${socketsBlokNumber}`)
                    .removeClass('d-none')
                    .addClass('d-inline-block');

                $(`#divSocketsPrint-${socketsBlokNumber}`)
                    .removeClass('d-none')
                    .addClass('d-inline-block');

            } else {
                $(`#inputSocketsCount-${socketsBlokNumber}`)
                    .removeClass('d-inline-block')
                    .addClass('d-none');

                $(`#labelSocketsCount-${socketsBlokNumber}`)
                    .removeClass('d-inline-block')
                    .addClass('d-none');

                $(`#inputSocketsPrint-${socketsBlokNumber}`)
                    .removeClass('d-inline-block')
                    .addClass('d-none');

                $(`#labelSocketsPrint-${socketsBlokNumber}`)
                    .removeClass('d-inline-block')
                    .addClass('d-none');

                $(`#divSocketsPrint-${socketsBlokNumber}`)
                    .removeClass('d-inline-block')
                    .addClass('d-none');
            }
        },

        eventSocketsBlockNeedPhotoPrintingElements: [],
        setEventSocketsBlockNeedPhotoPrintingElements: function(socketBlockNumber) {
            module.eventSocketsBlockNeedPhotoPrintingElements.push(`inputSocketsPrint-${socketBlockNumber}`);
            $(document).on('change',`#inputSocketsPrint-${socketBlockNumber}`, function(event) {
                let needSocketPrinting = $(this).is(':checked');

                let socketBlock = module.getSocketBlock($(this));
                socketBlock.needPhotoPrinting = needSocketPrinting;

                calcHelper.recalcAll();
            });
        },
        removeSocketsBlockNeedPhotoPrintingElements: function() {
            for (let i = 0; i < module.eventSocketsBlockNeedPhotoPrintingElements.length; i++) {
                $(document).off('change', `#"${module.eventSocketsBlockNeedPhotoPrintingElements[i]}`);
            }

            module.eventSocketsBlockNeedPhotoPrintingElements = [];
        },


        eventInputSocketsCount: [],
        setEventInputSocketsCount: function(socketsBlokNumber) {
            module.eventInputSocketsCount.push(`#inputSocketsCount-${socketsBlokNumber}`);
            $(document).on('change',`#inputSocketsCount-${socketsBlokNumber}`, function (event) {
                let blockCount = $(this).val();

                let socketBlock = module.getSocketBlock($(this));
                socketBlock.blockCount = blockCount;
                   
                calcHelper.recalcAll();
            });
        },
        removeEventInputSocketsCount: function() {
            for (let i = 0; i < module.eventInputSocketsCount.length; i++) {
                $(document).off('change', `#inputSocketsCount-${module.eventInputSocketsCount[i]}`);
            }

            module.eventInputSocketsCount = [];
        },

        getSocketBlock($currentHtmlElement) {
            let stepId = $currentHtmlElement.attr('step-id');
            let elementId = $currentHtmlElement.attr('element-id');
            let itemId = $currentHtmlElement.attr('item-id');
            let socketsBlokNumber = $currentHtmlElement.attr('socket-block-number');

            let step = orderStepsHelper.getStepOrNull(stepId);
            let element = orderStepsHelper.getStepElementOrNull(step, elementId);
            let item = orderStepsHelper.getItemOrNull(element, itemId);
            let socketBlock = orderStepsHelper.getItemBlockOrNull(item, socketsBlokNumber);

            return socketBlock;
		}
	};
	
	return {
        init: function (orderStepModule, orderStepsHelperModule, calcHelperModule, templateHelperModule){
            orderStep = orderStepModule;
		    orderStepRender = orderStep.orderStepRender;
            orderStepsHelper = orderStepsHelperModule;
            calcHelper = calcHelperModule;
		    templateHelper = templateHelperModule;
		},
		renderRadioSocketsCount: module.renderRadioSocketsCount,
		
		setEventSocketsCountElements: module.setEventSocketsCountElements,
		
        removeSocketsCountElements: module.removeSocketsCountElements,
        removeSocketsBlockNeedPhotoPrintingElements: module.removeSocketsBlockNeedPhotoPrintingElements,
		removeSocketsBlockElements: module.removeSocketsBlockElements,
		removeEventInputSocketsCount: module.removeEventInputSocketsCount
	};
}());