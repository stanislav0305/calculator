var orderStepModule = (function(){
	const mainContainerId = '.calculator';
	let _stepId;
	let orderStepsHelper;
	let calcHelper;
	let orderSteps;
	let railAndSocketStep;
	let panelSizeStep;
	
	let orderStepRender =
	{
		createStep : function (step){
			_stepId = step.id;
			
			let $column = $('<div>');
			if (step.doubleWidthSize === true && step.doubleWidthSizeInMidle === undefined && step.tripleWidthSize === undefined){
				$column.addClass('col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 py-2 px-2');
			}
			else if (step.doubleWidthSize === undefined && step.doubleWidthSizeInMidle === true && step.tripleWidthSize === undefined){
				$column.addClass('col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 py-2 px-2');
			}
			else if (step.doubleWidthSize === undefined && step.doubleWidthSizeInMidle === undefined && step.tripleWidthSize === true){
				$column.addClass('col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 py-2 px-2');
			}
			else{
				$column.addClass('col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 py-2 px-2');
			}
			
			let $orderStepRender = $('<div class="order-step">')
			.append(`<div id=${_stepId} class="card-body">`)
			.appendTo($column);
			
			if (step.isTotalPriceStep === true){
				$orderStepRender.addClass('totalPriceStep');
			}
			
			$column.appendTo(mainContainerId);
			
			this.renderTitle(step.title, step.info);
			
			let currentOrderStep = this;
			
			if (step.stepElements !== undefined){
				step.stepElements.forEach(function(element, index){
					if (element.itemChange === 'eventAppendSizeElements'){
						panelSizeStep.renderRadioAppendSize(element, _stepId);
					} else if (element.itemChange === 'eventInstallationOfRails'){
						railAndSocketStep.renderRadioInstallationOfRails(element, _stepId);
					} else if (element.itemChange === 'eventSocketsCount'){
						railAndSocketStep.renderRadioSocketsCount(element, _stepId);
					} else if(element.itemChange === 'eventHandleTypes'){
						currentOrderStep.renderRadioHandleTypes(element);
					} else if (element.itemChange === 'eventCabinTypes'){
						currentOrderStep.renderRadioCabinTypes(element);
					} else if (element.itemChange === 'eventSlidingDoorTypes'){
						currentOrderStep.renderSlidingDoorTypes(element);
					} else if (element.itemChange === 'eventSwingDoorsTypes'){
						currentOrderStep.renderSwingDoorsTypes(element);
					} else{						
						currentOrderStep.renderRadio(element);
					}
					currentOrderStep.renderTextBlock(element);
					currentOrderStep.textBlockCenter(element);
					currentOrderStep.priceBlock(element);
				});
			}
		},
		renderTitle : function(stepTitle, stepInfo) {
			let titleContainer = $('<h5 clas="card-title">');
			titleContainer.append(stepTitle);
			
			let currentOrderStep = this;
			if (stepInfo !== undefined){
				let toolTip = currentOrderStep.renderToolTip(stepInfo);
				titleContainer.append(toolTip);
			}
			
			titleContainer.appendTo(`#${_stepId}`);
		},
		renderElementTitle : function(elementTitle, elementInfo) {
			let elementTitleElement = $(`<h6 class="card-subtitle mb-2 text-muted">${elementTitle}</div>`);
			
			let currentOrderStep = this;
			if (elementInfo !== undefined){
				let toolTip = currentOrderStep.renderToolTip(elementInfo);
				elementTitleElement.append(toolTip);
			}
			
			elementTitleElement.appendTo(`#${_stepId}`);
		},
		renderToolTip:function(toolTipText){
			return $(`<img src="img/question.png" alt="" class="float-right" data-toggle="tooltip" data-placement="top" title="${toolTipText}" />`)
		},
		renderTextBlock:function(element){
			if (element.textBlock !== undefined){
				$(`<p class="card-text text-left text-muted">${element.textBlock}</p>`).appendTo(`#${_stepId}`);
			}
		},
		textBlockCenter:function(element){
			if (element.textBlockCenter !== undefined){
				$(`<p class="card-text text-center">${element.textBlockCenter}</p>`).appendTo(`#${_stepId}`);
			}
		},
		priceBlock:function(element){
			if (element.priceBlock !== undefined){
				$(`<h5 class="card-text text-center">≈ <span id="totalPrice">${element.priceBlock}</span> EUR</h5>`).appendTo(`#${_stepId}`);
			}
		},
		setTotalPrice(totalPrice){
			$('#totalPrice').text(totalPrice.toFixed(2));
		},
		
		radioSetEvents: function(element){
			if (element.itemChange === 'eventRefreshSteps'){
				this.setRadioEventRefreshSteps(element.id);
			} else if (element.itemChange === 'eventAppendSizeElements'){
				panelSizeStep.setRadioEventAppendSizeElements(element.id);
			} else if (element.itemChange === 'eventInstallationOfRails'){
				railAndSocketStep.setEventInstallationOfRailsElements(element.id);
			} else if(element.itemChange === 'eventSocketsCount'){
				railAndSocketStep.setEventSocketsCountElements(element.id);				
			} else if (element.itemChange === 'eventHandleTypes'){
				this.setEventRadioHandleTypesElements(element.id);
			} else if (element.itemChange === 'eventCabinTypes'){
				this.setEventCabinTypesElements(element.id);
			} else if (element.itemChange === 'eventSlidingDoorTypes'){
				
			} else if (element.itemChange === 'eventSwingDoorsTypes'){
				
			} else {
				this.setRadioEventDefault(element.id);
			}
		},
		

		renderRadio : function(element){
			let currentOrderStep = this;
								
			if (element.title !== undefined){
				currentOrderStep.renderElementTitle(element.title, element.info);
			}
			
			if (element.items !== undefined){				
				let $container = $('<div class="container mb-4 px-0">');
				let $row = $('<div class="row">');
				let $radio = $(`<div id="${element.id}" class="col">`);
				$radio.appendTo($row);
				
				$container.append($row);
				$(`#${_stepId}`).append($container);
				
				element.items.forEach(function(item, index){							
					let radioItemDiv = $('<div class="custom-control custom-radio">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					radioItemDiv.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${chackedAtr} step-id="${_stepId}"/>`).append(`<label for="${item.id}" class="custom-control-label">${item.title}</label>`);
					
					if (item.info !== undefined){
						let toolTip = currentOrderStep.renderToolTip(item.info);
						radioItemDiv.append(toolTip);
					}
					
					$radio.append(radioItemDiv);
				});
				
				currentOrderStep.radioSetEvents(element);
			}
		},
		readioIdsWithEventRefreshSteps : [],			
		setRadioEventRefreshSteps:function(elementId){
			this.readioIdsWithEventRefreshSteps.push(elementId);
			
			$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = $(this).attr('step-id');
				let itemId = $(this).attr('id');
				let elementId = $(this).attr('name');
				let step = orderStepsHelper.getStepOrNull(stepId);
				
				if (step !== null){
					let element = orderStepsHelper.getStepElementOrNull(step, elementId);
					orderStepsHelper.unselectElementItems(element.items);
					orderStepsHelper.selectElementItem(element.items, itemId);
					
					module.clearSteps();
					module.renderAllSteps();
				}
			});
		},
		setRadioEventDefault:function(elementId){
			this.readioIdsWithEventRefreshSteps.push(elementId);
			
			$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = $(this).attr('step-id');
				let itemId = $(this).attr('id');
				let elementId = $(this).attr('name');
				let step = orderStepsHelper.getStepOrNull(stepId);
				
				if (step !== null){
					let element = orderStepsHelper.getStepElementOrNull(step, elementId);
					orderStepsHelper.unselectElementItems(element.items);
					orderStepsHelper.selectElementItem(element.items, itemId);
					
					calcHelper.recalcAll();
				}
			});
		},
		removeRadioEventRefreshSteps:function(){
			for(let i=0; i < this.readioIdsWithEventRefreshSteps.length; i++){
				$(document).off('change', `input:radio[name^="${this.readioIdsWithEventRefreshSteps[i]}"]`);
			}
			
			this.readioIdsWithEventRefreshSteps = [];
		},		
		renderRadioHandleTypes:function(element){
			let currentOrderStep = this;
								
			if (element.title !== undefined){
				currentOrderStep.renderElementTitle(element.title, element.info);
			}
			
			if (element.items !== undefined){				
				let $container = $('<div class="container mb-4 px-0">');
				let $row = $('<div class="row">');

				$container.append($row);
				$(`#${_stepId}`).append($container);
				
				element.items.forEach(function(item, index){							
					let radioItemDiv = $('<div class="image-radio-item custom-control custom-radio col-4 my-1">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					radioItemDiv
					.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${chackedAtr} step-id="${_stepId}"/>`)
					.append(`<label for="${item.id}" class="custom-control-label"><img for="${item.id
					        }" class="custom-control-label handle-type-img" src="img/handleTypes/${item.title}.jpg" alt="${item.title}"/></label>`);
					
					if (item.info !== undefined){
						let toolTip = currentOrderStep.renderToolTip(item.info);
						radioItemDiv.append(toolTip);
					}
					
					$row.append(radioItemDiv);
				});

				currentOrderStep.radioSetEvents(element);
			}
		},
		eventRadioHandleTypesElements:[],
		setEventRadioHandleTypesElements:function(elementId){
			this.eventRadioHandleTypesElements.push(elementId);
			$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('name');
				let itemId = this.id;
				
				let setp = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				orderStepsHelper.unselectElementItems(element.items);
				let selectedItem = orderStepsHelper.selectElementItem(element.items, itemId);
				
				calcHelper.recalcAll();
			});
		},
		removeEventRadioHandleTypesElements:function(){
			for(let i=0; i < this.eventRadioHandleTypesElements.length; i++){
				$(document).off('change', `input:radio[name^="${this.eventRadioHandleTypesElements[i]}"]`);
			}

			this.eventRadioHandleTypesElements = [];
		},
		
		
		renderRadioCabinTypes:function(element){
			let currentOrderStep = this;
								
			if (element.title !== undefined){
				currentOrderStep.renderElementTitle(element.title, element.info);
			}
			
			if (element.items !== undefined){						
				
				let $mainRow = $('<div class="row" mainRow="0">');
				
				let $mainRowColumn1 = $('<div class="col-8">');
				$mainRowColumn1.appendTo($mainRow);
				
				let $mainRowColumn2 = $('<div id="selected-cabin-type-data" class="col-4">');
				$mainRowColumn2.appendTo($mainRow);
				
				let $row = $('<div class="row">');
				$mainRowColumn1.append($row);
				
				$(`#${_stepId}`).append($mainRow);
				
				element.items.forEach(function(item, index){											
					let $radioItemDiv = $('<div class="image-radio-item custom-control custom-radio col-3 my-1 mx-0">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					
					if (item.isSelected === true){
						currentOrderStep.renderSelectedCabinTypeData(_stepId, element.id, item);
					}
					
					$radioItemDiv
					.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${chackedAtr} step-id="${_stepId}"/>`)
					.append(`<label for="${item.id}" class="custom-control-label"><img for="${item.id
					        }" class="custom-control-label cabin-type-img img-fluid" src="img/cabinTypes/${item.number}.png" alt="${item.number}"/></label>`);
					
					if (item.info !== undefined){
						let toolTip = currentOrderStep.renderToolTip(item.info);
						$radioItemDiv.append(toolTip);
					}
					
					$row.append($radioItemDiv);
				});

				currentOrderStep.radioSetEvents(element);
			}
		},
		renderSelectedCabinTypeData:function(stepId, elementId, selectedItem){
			
			orderStepRender.removeEventFocusOutCabinTypeSize();
			orderStepRender.removeEventCahngeCabinTypesParametrs();
			
			$('#selected-cabin-type-data').empty();
			
			$('<h6 class="card-subtitle mb-0 text-muted">')
				.text('Тип перегородки:')
				.appendTo('#selected-cabin-type-data');
					
			if (selectedItem.title !== undefined){
				$('<span class="blue-text">')
					.text(selectedItem.title)
					.appendTo('#selected-cabin-type-data');
			}
			
			$('<h6 class="card-subtitle mt-2 text-muted">')
				.text('Размер:')
				.appendTo('#selected-cabin-type-data');
			
			selectedItem.sizes.forEach(function(size, index){
				let sizeBlock = $('<div class="mt-3">');
				sizeBlock.appendTo('#selected-cabin-type-data');
				
				let maxValueAtr = '';
				if (size.maxValue !== undefined){
					$('<div>')
						.append(
							$('<span class="blue-text mr-1 font-italic">').text('До')
						)
						.append(
							$('<span class="blue-text mr-1 font-italic">').text(size.maxValue)
						)
						.append(
							$('<span class="blue-text ml-1 font-italic">').text('мм')
						)
						.appendTo(sizeBlock);
						
					maxValueAtr = `max-val="${size.maxValue}"`;
				}
				
				$('<div>')
					.append(
						$('<span class="mr-1">').text(size.title)
					)
					.append(
						$('<span class="blue-text mr-1">').text(size.name)
					)
					.append(
						$(`<input id="${size.name}" step-id="${stepId}" element-id="${elementId}" item-id="${selectedItem.id
						    }" type="number" class="numberInput form-control form-control-sm" ${maxValueAtr} min="1" max="99999">`)
						.val(size.enteredValue)
					)
					.appendTo(sizeBlock);
				
				if (size.maxValue !== undefined){
					$('<div class="invalid-feedback">')
						.append(`Значение должно быть меньше или равно ${size.maxValue}`)
						.appendTo(sizeBlock);
				}
						
					orderStepRender.setEventFocusOutCabinTypeSize(size.name);
			});

			orderStepRender.renderAdditionalParamatres(stepId, elementId, selectedItem);
		},
		renderAdditionalParamatres:function(stepId, elementId, selectedItem){
			if (selectedItem.additionalParamatres !== undefined){
				let $row = $('<div class="row">')
					.appendTo('#selected-cabin-type-data')
				
				let $radioItemDiv = $('<div class="col-12 my-1 mx-0">');
				$radioItemDiv
					.append(
						$('<h6 class="card-subtitle mt-2 text-muted">').text(selectedItem.additionalParamatres[0].title)
					);
					
				selectedItem.additionalParamatres[0].items.forEach(function(additionalItem, index){
					let chackedAtr = additionalItem.isSelected === true ? 'checked' : '';
					
					$('<div class="custom-control custom-radio">')
					.append(
						$(`<input id="${additionalItem.id}" type="radio" class="custom-control-input" name="${selectedItem.additionalParamatres[0].id}" ${chackedAtr} item-id="${selectedItem.id}" element-id="${elementId
						    }"  step-id="${stepId}"/>`)
					)
					.append(
						$(`<label for="${additionalItem.id}" class="custom-control-label">${additionalItem.title}</label>`)
					)
					.appendTo($radioItemDiv);
					
				});

				$radioItemDiv.appendTo($row);
				
				orderStepRender.removeEventCahngeCabinTypesParametrs();
				orderStepRender.setEventCahngeCabinTypesAdditionalParamatrs(selectedItem.additionalParamatres[0].id);
			}
		},
		eventCabinTypesElements:[],
		setEventCabinTypesElements: function(elementId){
			this.eventCabinTypesElements.push(elementId);
			$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('name');
				let itemId = this.id;
				
				let setp = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				orderStepsHelper.unselectElementItems(element.items);
				let selectedItem = orderStepsHelper.selectElementItem(element.items, itemId);
				
				calcHelper.recalcAll();
			    module.clearSteps();
			    module.renderAllSteps();
			});
		},
		removeEventCabinTypesElements:function(){			
			for(let i=0; i < this.eventCabinTypesElements.length; i++){
				$(document).off('change', `input:radio[name^="${this.eventCabinTypesElements[i]}"]`);
			}

			this.eventCabinTypesElements = [];
		},
		eventFocusOutCabinTypeSizes:[],
		setEventFocusOutCabinTypeSize(sizeName){
			this.eventFocusOutCabinTypeSizes.push(sizeName);
			$(document).on('focusout', `#${sizeName}`, function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('element-id');
				let itemId = $(this).attr('item-id');
				let _sizeName = this.id;
				let maxValueAtr = $(this).attr('max-val');
				
				if (maxValueAtr != undefined && maxValueAtr*1 < this.value*1){
					$(this).addClass('is-invalid');
					return;
				}
				else{
					$(this).removeClass('is-invalid');
				}
				
				let setp = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				orderStepsHelper.saveCabinTypesSize(element, itemId, _sizeName, this.value);
				calcHelper.recalcAll();
			});
		},
		removeEventFocusOutCabinTypeSize(){
			for(let i=0; i < this.eventFocusOutCabinTypeSizes.length; i++){
				$(document).off('focusout', `input:["#${this.eventFocusOutCabinTypeSizes[i]}"]`);
			}

			this.eventFocusOutCabinTypeSizes = [];
		},
		eventCahngeCabinTypesAdditionalParamatrs:[],
		setEventCahngeCabinTypesAdditionalParamatrs(elementId){
			this.eventCahngeCabinTypesAdditionalParamatrs.push(elementId);
			$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('element-id');
				let itemId = $(this).attr('item-id');
				let additionalParamatresId = this.name;
				let additionalItemId = this.id;
				
				let setp = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				orderStepsHelper.unselectCabinTypesAdditionalParamatr(element, itemId, additionalParamatresId);
				orderStepsHelper.saveCabinTypesAdditionalParamatr(element, itemId, additionalParamatresId, additionalItemId);
				
				calcHelper.recalcAll();
			});
		},
		removeEventCahngeCabinTypesParametrs(){
			for(let i=0; i < this.eventCahngeCabinTypesAdditionalParamatrs.length; i++){
				$(document).off('change', `#${this.eventCahngeCabinTypesAdditionalParamatrs[i]}`);
			}

			this.eventCahngeCabinTypesAdditionalParamatrs = [];
		},
	
	 
		renderSlidingDoorTypes:function(element){
			let currentOrderStep = this;
									
			if (element.title !== undefined){
				currentOrderStep.renderElementTitle(element.title, element.info);
			}
			
			if (element.items !== undefined){						
				
				let $mainRow = $('<div class="row" mainRow="0">');
				
				let $mainRowColumn1 = $('<div class="col-6">');
				$mainRowColumn1.appendTo($mainRow);
				
				let $mainRowColumn2 = $('<div id="selected-cabin-type-data" class="col-6">');
				$mainRowColumn2.appendTo($mainRow);
				
				let $row = $('<div class="row">');
				$mainRowColumn1.append($row);
				
				$(`#${_stepId}`).append($mainRow);
				
				element.items.forEach(function(item, index){											
					let $radioItemDiv = $('<div class="image-radio-item custom-control custom-radio col-12 my-1 mx-0">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					
					if (item.isSelected === true){
						//currentOrderStep.renderSelectedSlidingDoorTypeData(_stepId, element.id, item);
					}
					
					$radioItemDiv
					.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${chackedAtr} step-id="${_stepId}"/>`)
					.append(`<label for="${item.id
					        }" class="custom-control-label sliding-door-type-label"><div class="row m-0"><h7 class="blue-text left ml-1">${item.title
					        }</h7></div><img for="${item.id
					        }" class="custom-control-label sliding-door-type-img img-fluid" src="img/slidingDoorTypes/${item.number}.png" alt="${item.number
					        }"/></label>`);
					
					if (item.info !== undefined){
						let toolTip = currentOrderStep.renderToolTip(item.info);
						$radioItemDiv.append(toolTip);
					}
					
					$row.append($radioItemDiv);
				});

				//currentOrderStep.radioSetEvents(element);
			}
		},
		
		
		
		renderSwingDoorsTypes:function(element){
			let currentOrderStep = this;
									
			if (element.title !== undefined){
				currentOrderStep.renderElementTitle(element.title, element.info);
			}
			
			if (element.items !== undefined){						
				
				let $mainRow = $('<div class="row" mainRow="0">');
				
				let $mainRowColumn1 = $('<div class="col-6">');
				$mainRowColumn1.appendTo($mainRow);
				
				let $mainRowColumn2 = $('<div id="selected-cabin-type-data" class="col-6">');
				$mainRowColumn2.appendTo($mainRow);
				
				let $row = $('<div class="row">');
				$mainRowColumn1.append($row);
				
				$(`#${_stepId}`).append($mainRow);
				
				element.items.forEach(function(item, index){											
					let $radioItemDiv = $('<div class="image-radio-item custom-control custom-radio col-12 my-1 mx-0">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					
					if (item.isSelected === true){
						//currentOrderStep.renderSelectedSwingDoorTypeData(_stepId, element.id, item);
					}
					
					$radioItemDiv
					.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${chackedAtr} step-id="${_stepId}"/>`)
					.append(`<label for="${item.id
					        }" class="custom-control-label swing-door-type-label"><div class="row m-0"><h7 class="blue-text left ml-1">${item.title
					        }</h7></div><img for="${item.id}" class="custom-control-label swing-door-type-img img-fluid" src="img/swingDoorsTypes/${item.number
					        }.png" alt="${item.number}"/></label>`);
					
					if (item.info !== undefined){
						let toolTip = currentOrderStep.renderToolTip(item.info);
						$radioItemDiv.append(toolTip);
					}
					
					$row.append($radioItemDiv);
				});

				//currentOrderStep.radioSetEvents(element);
			}
		}
	}; 
	
	let module = {
		init: function(orderStepsHelperModule, steps, calcHelperModule, railAndSocketStepModule, panelSizeStepModule, panelSizeStepModule){
			orderStepsHelper = orderStepsHelperModule;
			orderSteps = steps;
			calcHelper = calcHelperModule;
			
			railAndSocketStep = railAndSocketStepModule;
			panelSizeStep = panelSizeStepModule;
		},
		
		createStep: function(step){
			orderStepRender.createStep(step);
		},
		setTooltipeEvents: function(){
			$('[data-toggle="tooltip"]').tooltip();
		},
		removeTooltipeEvents: function(){
			$('[data-toggle="tooltip"]').off('.tooltip');
		},
		stopRenderSteps:undefined,
		renderSteps: function(steps){
			if (steps === undefined){
				return;
			}
			
			let _this = this;
			for(let sIdx=0; sIdx < steps.length; sIdx++){
				let step = steps[sIdx];				
				orderStepRender.createStep(step);
				
				orderStepRender.stopRenderSteps = step.stopRender;
				if (orderStepRender.stopRenderSteps === true){
					return;
				}
				
				if ($.isArray(step.stepElements)){
					for(let seIdx=0; seIdx < step.stepElements.length; seIdx++){
						let stepElement = step.stepElements[seIdx];
						if (stepElement.items !== undefined){
							let i = stepElement.items.findIndex(item => item.isSelected === true);
							if (i >= 0){
								_this.renderSteps(stepElement.items[i].childSteps);
								if (orderStepRender.stopRenderSteps === true){
									return;
								}
							}
						}
					}
				}
			}
		},
		renderAllSteps: function(){
			orderStepRender.stopRenderSteps = undefined;
			this.renderSteps(orderSteps);
			this.setTooltipeEvents();
			
			calcHelper.recalcAll();
		},
		clearSteps: function(){
			this.removeTooltipeEvents();
			orderStepRender.removeRadioEventRefreshSteps();
			
			panelSizeStep.removeRadioEventAppendSizeElements();				
			panelSizeStep.removeIputPanelSizeEventOutElements();
			panelSizeStep.removePanelSizeContinueBtnEventEvent();
			
			railAndSocketStep.removeEventInputInstallationOfRails();
			railAndSocketStep.removeEventInstallationOfRailsElements();
			
            railAndSocketStep.removeSocketsCountElements();
            railAndSocketStep.removeSocketsBlockElements();
            railAndSocketStep.removeEventInputSocketsCount();
			
			orderStepRender.removeEventRadioHandleTypesElements();
			
			orderStepRender.removeEventCabinTypesElements();
			orderStepRender.removeEventCahngeCabinTypesParametrs();
			orderStepRender.removeEventFocusOutCabinTypeSize();
			
			$('.calculator').empty();
		},
		setTotalPrice: function(totalPrice){
			orderStepRender.setTotalPrice(totalPrice);
		},
				
		orderStepRender: orderStepRender
		
	};
	
	return module;
}());