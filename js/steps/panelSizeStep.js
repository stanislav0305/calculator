var panelSizeStepModule = (function() {

let orderStep;
let orderStepRender;
let orderStepsHelper;
let calcHelper;

let module = {
	renderRadioAppendSize:function(element, stepId){
		if (element.title !== undefined){
			orderStepRender.renderElementTitle(element.title, element.info);
		}
		
		if (element.items !== undefined){				
			let $radio = $(`<div id="${element.id}" class="col-1 mr-4 mt-1">`);
			
			element.items.forEach(function(item, index){							
				let radioItemDiv = $('<div class="custom-control custom-radio">');
				let chackedAtr = item.isSelected === true ? 'checked' : '';
                radioItemDiv.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${chackedAtr} step-id="${stepId}"/>`)
                    .append(`<label for="${item.id}" class="custom-control-label">${item.title}</label>`);
				
				if (item.info !== undefined){
					let toolTip = orderStepRender.renderToolTip(item.info);
					radioItemDiv.append(toolTip);
				}
				
				$radio.append(radioItemDiv);
			});
			
			$(`#${stepId}`)
				.append(
					$('<div class="container mb-4 px-0">')
					.append(
						$('<div class="row">')
							.append(
								$radio
							)
					)
					.append(
						$('<div class="row">')
							.append(
								$('<div class="col-12">')
									.append(
										$(`<button id="panelSizeContinueBtn" type="button" class="btn btn-outline-primary btn-sm float-right" step-id="${stepId}">`)
										.text("Продолжить")
									)
							)
					)
				);
			
			let selectedItemIdx = element.items.findIndex(item => item.isSelected === true);
			module.renderPanelSizeElementRows(element, element.items[selectedItemIdx].title*1, stepId);
			orderStepRender.radioSetEvents(element);
			module.setPanelSizeContinueBtnEvent();
		}
	},
	
	readioIdsWithEventAppendSizeElements:[],
	setRadioEventAppendSizeElements:function(elementId){
		module.readioIdsWithEventAppendSizeElements.push(elementId);
		
		$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
							
			let stepId = $(this).attr('step-id');
			let itemId = $(this).attr('id');
			let $itemParent = $(this).parent();
			let panelCount = $itemParent.find(`label[for="${itemId}"]`).text();
			let radioId = $(this).attr('name');				
			let step = orderStepsHelper.getStepOrNull(stepId);
			
			if (step !== null){
				let element = orderStepsHelper.getStepElementOrNull(step, radioId);
				orderStepsHelper.unselectElementItems(element.items);
				orderStepsHelper.selectElementItem(element.items, itemId);
				
				module.removePanelSizeElementRows(radioId);
				module.renderPanelSizeElementRows(element, panelCount*1, stepId);
				
				//orderStep.clearSteps();
				//orderStep.renderAllSteps();
				
				calcHelper.recalcAll();
			
				orderStep.clearSteps();
				orderStep.renderAllSteps();
			}
		});
	},
	removeRadioEventAppendSizeElements:function(){
		for(let i=0; i < module.readioIdsWithEventAppendSizeElements.length; i++){
				$(document).off('change', `input:radio[name^="${module.readioIdsWithEventAppendSizeElements[i]}"]`);
			}
			
		module.readioIdsWithEventAppendSizeElements = [];
	},
	
	panelSizeContinueBtnEvent: 'panelSizeContinueBtn',
	setPanelSizeContinueBtnEvent: function(){
		$(document).on('click', `#${module.panelSizeContinueBtnEvent}`, function () {
			//let stepId = $(this).attr('step-id');
			
			//let step = orderStepsHelper.getStepOrNull(stepId);
			calcHelper.recalcAll();
			
			orderStep.clearSteps();
			orderStep.renderAllSteps();
			
		});
	},
	removePanelSizeContinueBtnEventEvent: function(){
		$(document).off('click', `#${module.panelSizeContinueBtnEvent}`);
	},
	
	renderPanelSizeElementRows: function(element, elementsGroupRowCount, stepId){
		let elementId = element.id;
		let $container = $(`#${elementId}`).parent();
		let sizeElementGroupId = `size-element-specific-group-${elementId}`;
		
		let sizeElementGroup = $(`<div id="${sizeElementGroupId}" class="col right">`);
		sizeElementGroup.appendTo($container);
		
		$('<h8 class="card-subtitle mb-2 text-muted">Размер:</div>')
		.appendTo(sizeElementGroup);
		
		var $elementsGroupRowContainer = $('<div class="container">');
		for(let i=1; i < (elementsGroupRowCount*1+1); i++){
			let enteredVal = element.enteredValues[i*1-1];
			let isHardenedChecked = enteredVal.hardening === true ? 'checked' : '';
			let hInvalidClass = (enteredVal.h === '') ? 'is-invalid' : '';
			let wInvalidClass = (enteredVal.w === '') ? 'is-invalid' : '';

			$('<div class="row mt-1 ml-0 mb-0 mr-0">')
			.append(
				$('<div class="col-5 p-0">')
					.append($('<lebel>').text(`Высота ${i}`))
					.append(
				$(`<input type="number" class="numberInput ml-1 d-inline-block form-control form-control-sm ${hInvalidClass}" step-id="${stepId}" element-id="${elementId}" it-is="height" size-number="${enteredVal.number}" min="1" max="99999">`)
						.val(enteredVal.h)
					)
					.append($('<lebel class="blue-text ml-1">').text('мм'))
			)
			.append(
			$('<div class="col-5 p-0">')
				.append($('<lebel class="ml-1">').text(`Длина ${i}`))
				.append(
				$(`<input type="number" required class="numberInput ml-1 d-inline-block form-control form-control-sm ${wInvalidClass}" step-id="${stepId}" element-id="${elementId}" it-is="width" size-number="${enteredVal.number}" min="1" max="99999">`)
					.val(enteredVal.w)
				)
				.append($('<lebel class="blue-text ml-1">').text('мм'))
			)
			.append(
			$('<div class="col-2 p-0">')
				.append(
					$('<div class="custom-control custom-checkbox">')
						.append(`<input id="hardening-${enteredVal.number}" class="d-inline-block custom-control-input" type="checkbox" required step-id="${stepId}" element-id="${elementId
						}" it-is="hardening" size-number="${enteredVal.number}" ${isHardenedChecked}>`)
						.append(`<label class="custom-control-label" for="hardening-${enteredVal.number}">Закалка</label>`)
				)
			)
			.appendTo($elementsGroupRowContainer);
		}
		
		$elementsGroupRowContainer.appendTo(`#${sizeElementGroupId}`);
		
		module.setIputPanelSizeEventOutElements(elementId);
	},
	removePanelSizeElementRows: function(elementId){
		module.removeIputPanelSizeEventOutElement(elementId);
		
		let sizeElementGroupId = `size-element-specific-group-${elementId}`;
		$(`#${sizeElementGroupId}`).remove();
	},
	inputPanelSizeEventElements:[],
	setIputPanelSizeEventOutElements:function(sizeElementGroupId){
		module.inputPanelSizeEventElements.push(sizeElementGroupId);
		
		$(document).on('change', `input[element-id="${sizeElementGroupId}"]`, function (event) {
			let stepId = $(this).attr('step-id');
			let elementId = $(this).attr('element-id');
			let sizeNumber = $(this).attr('size-number');
			let valueType = $(this).attr('it-is');

			let val;
			if (valueType === 'hardening'){
				val = $(this).is(':checked');
			}
			else {
				val = $(this).val();
			}
			
			let setp = orderStepsHelper.getStepOrNull(stepId);
			let element = orderStepsHelper.getStepElementOrNull(setp, elementId);
			orderStepsHelper.savePanelSize(element, sizeNumber, valueType, val);
			calcHelper.recalcAll();
		});
		
	},
	removeIputPanelSizeEventOutElements:function(){
		for(let i=0; i < module.inputPanelSizeEventElements.length; i++){
				$(document).off('change', `input[element-id="${module.inputPanelSizeEventElements[i]}"]`);
		}
			
		module.inputPanelSizeEventElements = [];
	},
	removeIputPanelSizeEventOutElement:function(elementId){
		$(document).off('change', `input[element-id="${elementId}"]`);
		module.inputPanelSizeEventElements = module.inputPanelSizeEventElements.filter(e => e !== elementId);
	},
	
	init(orderStepModule, orderStepsHelperModule, calcHelperModule){
		orderStep = orderStepModule;
		orderStepRender = orderStepModule.orderStepRender;
		orderStepsHelper = orderStepsHelperModule;
		calcHelper = calcHelperModule;
	}
};
	
return module;
}());