var orderStepModule = (function(){
	const mainContainerId = '.calculator';
	let _stepId;
	let _orderStepsHelper;
	let _calculationHelper;
	let _orderSteps;
	
	let orderStep =
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
			
			let $orderStep = $('<div class="order-step">')
			.append('<div id='+_stepId+' class="card-body">')
			.appendTo($column);
			
			if (step.isTotalPriceStep === true){
				$orderStep.addClass('totalPriceStep');
			}
			
			$column.appendTo(mainContainerId);
			
			this.renderTitle(step.title, step.info);
			
			let currentOrderStep = this;
			
			if (step.stepElements !== undefined){
				step.stepElements.forEach(function(element, index){
					if (element.itemChange === 'eventAppendSizeElements'){
						currentOrderStep.renderRadioAppendSize(element);
					} else if (element.itemChange === 'eventInstallationOfRails'){
						currentOrderStep.renderRadioInstallationOfRails(element);
					} else if (element.itemChange === 'eventSocketsCount'){
						currentOrderStep.renderRadioSocketsCount(element);
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
			
			titleContainer.appendTo('#'+_stepId);
		},
		renderElementTitle : function(elementTitle, elementInfo) {
			let elementTitleElement = $('<h6 class="card-subtitle mb-2 text-muted">'+elementTitle+'</div>');
			
			let currentOrderStep = this;
			if (elementInfo !== undefined){
				let toolTip = currentOrderStep.renderToolTip(elementInfo);
				elementTitleElement.append(toolTip);
			}
			
			elementTitleElement.appendTo('#'+_stepId);
		},
		renderToolTip:function(toolTipText){
			return $('<img src="img/question.png" alt="" class="float-right" data-toggle="tooltip" data-placement="top" title="'+toolTipText+'" />')
		},
		renderTextBlock:function(element){
			if (element.textBlock !== undefined){
				$('<p class="card-text text-left text-muted">'+element.textBlock+'</p>').appendTo('#'+_stepId);
			}
		},
		textBlockCenter:function(element){
			if (element.textBlockCenter !== undefined){
				$('<p class="card-text text-center">'+element.textBlockCenter+'</p>').appendTo('#'+_stepId);
			}
		},
		priceBlock:function(element){
			if (element.priceBlock !== undefined){
				$('<h5 class="card-text text-center">≈ <span id="totalPrice">'+element.priceBlock+'</span> EUR</h5>').appendTo('#'+_stepId);
			}
		},
		setTotalPrice(totalPrice){
			$('#totalPrice').text(totalPrice.toFixed(2));
		},
		
		radioSetEvents: function(element){
			if (element.itemChange === 'eventRefreshSteps'){
				this.setRadioEventRefreshSteps(element.id);
			} else if (element.itemChange === 'eventAppendSizeElements'){
				this.setRadioEventAppendSizeElements(element.id);
			} else if (element.itemChange === 'eventInstallationOfRails'){
				this.setEventInstallationOfRailsElements(element.id);
			} else if(element.itemChange === 'eventSocketsCount'){
				this.setEventSocketsCountElements(element.id);				
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
				let $radio = $('<div id="'+element.id+'" class="col">');
				$radio.appendTo($row);
				
				$container.append($row);
				$('#'+_stepId).append($container);
				
				element.items.forEach(function(item, index){							
					let radioItemDiv = $('<div class="custom-control custom-radio">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					radioItemDiv.append('<input id="'+item.id+'" type="radio" class="custom-control-input" name="'+element.id+'" '+chackedAtr+' step-id="'+_stepId+'"/>').append('<label for="'+item.id+'" class="custom-control-label">'+item.title+'</label>');
					
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
			
			$(document).on('change', 'input:radio[name^="'+elementId+'"]', function (event) {
				let stepId = $(this).attr('step-id');
				let itemId = $(this).attr('id');
				let elementId = $(this).attr('name');
				let step = _orderStepsHelper.getStepOrNull(stepId);
				
				if (step !== null){
					let element = _orderStepsHelper.getStepElementOrNull(step, elementId);
					_orderStepsHelper.unselectElementItems(element.items);
					_orderStepsHelper.selectElementItem(element.items, itemId);
					stepsRenderHelper.clearSteps();
					stepsRenderHelper.renderAllSteps();
				}
			});
		},
		setRadioEventDefault:function(elementId){
			this.readioIdsWithEventRefreshSteps.push(elementId);
			
			$(document).on('change', 'input:radio[name^="'+elementId+'"]', function (event) {
				let stepId = $(this).attr('step-id');
				let itemId = $(this).attr('id');
				let elementId = $(this).attr('name');
				let step = _orderStepsHelper.getStepOrNull(stepId);
				
				if (step !== null){
					let element = _orderStepsHelper.getStepElementOrNull(step, elementId);
					_orderStepsHelper.unselectElementItems(element.items);
					_orderStepsHelper.selectElementItem(element.items, itemId);
					
					_calculationHelper.recalcAll();
				}
			});
		},
		removeRadioEventRefreshSteps:function(){
			for(let i=0; i < this.readioIdsWithEventRefreshSteps.length; i++){
				$(document).off('change', 'input:radio[name^="'+this.readioIdsWithEventRefreshSteps[i]+'"]');
			}
			
			this.readioIdsWithEventRefreshSteps = [];
		},
		
		renderRadioAppendSize:function(element){
			let currentOrderStep = this;
								
			if (element.title !== undefined){
				currentOrderStep.renderElementTitle(element.title, element.info);
			}
			
			if (element.items !== undefined){				
				let $container = $('<div class="container mb-4 px-0">');
				let $row = $('<div class="row">');
				let $radio = $('<div id="'+element.id+'" class="col-1 mr-4 mt-4">');
				$radio.appendTo($row);
				
				$container.append($row);
				$('#'+_stepId).append($container);
				
				element.items.forEach(function(item, index){							
					let radioItemDiv = $('<div class="custom-control custom-radio">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					radioItemDiv.append('<input id="'+item.id+'" type="radio" class="custom-control-input" name="'+element.id+'" '+chackedAtr+' step-id="'+_stepId+'"/>').append('<label for="'+item.id+'" class="custom-control-label">'+item.title+'</label>');
					
					if (item.info !== undefined){
						let toolTip = currentOrderStep.renderToolTip(item.info);
						radioItemDiv.append(toolTip);
					}
					
					$radio.append(radioItemDiv);
				});

				currentOrderStep.renderPanelSizeElementRows(element, 1, _stepId);
				currentOrderStep.radioSetEvents(element);
			}
		},
		readioIdsWithEventAppendSizeElements:[],
		setRadioEventAppendSizeElements:function(elementId){
			this.readioIdsWithEventAppendSizeElements.push(elementId);
			
			$(document).on('change', 'input:radio[name^="'+elementId+'"]', function (event) {
								
				let stepId = $(this).attr('step-id');
				let itemId = $(this).attr('id');
				let $itemParent = $(this).parent();
				let panelCount = $itemParent.find('label[for="'+itemId+'"]').text();
				let radioId = $(this).attr('name');				
				let step = _orderStepsHelper.getStepOrNull(stepId);
				
				if (step !== null){
					let element = _orderStepsHelper.getStepElementOrNull(step, radioId);
					_orderStepsHelper.unselectElementItems(element.items);
					_orderStepsHelper.selectElementItem(element.items, itemId);
					
					orderStep.removePanelSizeElementRows(radioId);
					orderStep.renderPanelSizeElementRows(element, panelCount, stepId);
				}
				
				
			});
		},
		removeRadioEventAppendSizeElements:function(){
			for(let i=0; i < this.readioIdsWithEventAppendSizeElements.length; i++){
					$(document).off('change', 'input:radio[name^="'+this.readioIdsWithEventAppendSizeElements[i]+'"]');
				}
				
			this.readioIdsWithEventAppendSizeElements = [];
		},
		
		
		renderPanelSizeElementRows: function(element, elementsGroupRowCount, stepId){
			let elementId = element.id;
			let $container = $('#'+elementId).parent();
			let sizeElementGroupId = 'size-element-specific-group-'+elementId;
			
			let sizeElementGroup = $('<div id="'+sizeElementGroupId+'" class="col right">');
			sizeElementGroup.appendTo($container);
						
			$('<h8 class="card-subtitle mb-2 text-muted">Размер:</div>')
			.appendTo(sizeElementGroup);
			
			var $elementsGroupRowContainer = $('<div class="container">');
			for(let i=1; i < (elementsGroupRowCount*1+1); i++){
				let enteredVal = element.enteredValues[i*1-1];
				let isHardenedChecked = enteredVal.hardening === true ? 'checked' : '';
				$('<div class="row mt-1 ml-0 mb-0 mr-0">')
				.append(
					$('<div class="col-5 p-0">')
						.append($('<lebel>').text('Высота '+ i))
						.append(
							$('<input type="number" class="numberInput ml-1" step-id="'+stepId+'" element-id="'+elementId+'" it-is="height" size-number="'+
							enteredVal.number+'">')
							.val(enteredVal.h)
						)
						.append($('<lebel class="blue-text">').text('мм'))
				)
				.append(
				$('<div class="col-5 p-0">')
					.append($('<lebel class="ml-1">').text('Длина '+ i))
					.append(
						$('<input type="number" class="numberInput ml-1" step-id="'+stepId+'" element-id="'+elementId+'" it-is="width" size-number="'+
						enteredVal.number+'">')
						.val(enteredVal.w)
					)
					.append($('<lebel class="blue-text">').text('мм'))
				)
				.append(
				$('<div class="col-2 p-0">')
					.append(
						$('<div class="custom-control custom-checkbox">')
							.append('<input id="hardening-'+enteredVal.number+'" class="custom-control-input" type="checkbox" step-id="'+stepId+'" element-id="'+elementId+'" it-is="hardening" size-number="'+ enteredVal.number+'" '+isHardenedChecked+'>')
							.append('<label class="custom-control-label" for="hardening-'+enteredVal.number+'">Закалка</label>')
					)
				)
				.appendTo($elementsGroupRowContainer);
			}
			
			$elementsGroupRowContainer.appendTo('#'+sizeElementGroupId);
			
			this.setIputPanelSizeEventOutElements(elementId);
		},
		removePanelSizeElementRows: function(elementId){
			this.removeIputPanelSizeEventOutElement(elementId);
			
			let sizeElementGroupId = 'size-element-specific-group-'+elementId;
			$('#'+sizeElementGroupId).remove();
		},
		inputPanelSizeEventElements:[],
		setIputPanelSizeEventOutElements:function(sizeElementGroupId){
			this.inputPanelSizeEventElements.push(sizeElementGroupId);
			
			$(document).on('change', 'input[element-id="'+sizeElementGroupId+'"]', function (event) {
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
				
				let setp = _orderStepsHelper.getStepOrNull(stepId);
				let element = _orderStepsHelper.getStepElementOrNull(setp, elementId);
				_orderStepsHelper.savePanelSize(element, sizeNumber, valueType, val);
				_calculationHelper.recalcAll();
			});
			
		},
		removeIputPanelSizeEventOutElements:function(){
			for(let i=0; i < this.inputPanelSizeEventElements.length; i++){
					$(document).off('change', 'input[element-id="'+this.inputPanelSizeEventElements[i]+'"]');
			}
				
			this.inputPanelSizeEventElements = [];
		},
		removeIputPanelSizeEventOutElement:function(elementId){
			$(document).off('change', 'input[element-id="'+elementId+'"]');
			this.inputPanelSizeEventElements = this.inputPanelSizeEventElements.filter(e => e !== elementId);
		},
		
		
		renderRadioInstallationOfRails:function(element){
			let currentOrderStep = this;
								
			if (element.title !== undefined){
				currentOrderStep.renderElementTitle(element.title, element.info);
			}
			
			if (element.items !== undefined){				
				let $container = $('<div class="container mb-4 px-0">');
				let $row = $('<div class="row">');
				let $radio = $('<div id="'+element.id+'" class="col-1 mr-4 mt-4">');
				$radio.appendTo($row);
				
				$container.append($row);
				$('#'+_stepId).append($container);
				
				element.items.forEach(function(item, index){							
					let radioItemDiv = $('<div class="custom-control custom-radio">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					radioItemDiv.append('<input id="'+item.id+'" type="radio" class="custom-control-input" name="'+element.id+'" '+chackedAtr+' step-id="'+_stepId+'"/>').append('<label for="'+item.id+'" class="custom-control-label">'+item.title+'</label>');
					
					if (item.info !== undefined){
						let toolTip = currentOrderStep.renderToolTip(item.info);
						radioItemDiv.append(toolTip);
					}
					
					$radio.append(radioItemDiv);
				});

				currentOrderStep.renderInputInstallationOfRails(element, _stepId);
				currentOrderStep.radioSetEvents(element);
			}
		},
		renderInputInstallationOfRails: function(element, stepId){
			let elementId = element.id;
			let $container = $('#'+elementId).parent();
			let installationOfRailsCountId = 'installation-of-rails-count-'+elementId;
			
			let sizeElementGroup = $('<div id="'+installationOfRailsCountId+'" class="col right mt-3">');
			sizeElementGroup.appendTo($container);
			
			var $elementsGroupRowContainer = $('<div class="container">');
			let enteredVal = element.enteredValue;
			for(let i=0; i<element.items.length; i++){
				let item = element.items[i];
				
				if(item.title === 'Да'){
					let displayCssClass = item.isSelected === true ? 'd-inline-block' : 'd-none';
					
					$('<div class="row mt-1 ml-0 mb-0 mr-0">')
					.append(
						$('<div class="p-0">')
							.append(
								$('<input id="inputInstallationOfRails" type="number" class="numberInput" step-id="'+stepId+'" element-id="'+elementId+'" item-id="'+item.id+'">')
								.addClass(displayCssClass)
								.val(enteredVal)
							)
							.append(
								$('<lebel id="labelInstallationOfRails" class="blue-text ml-1">')
								.addClass(displayCssClass)
								.text('шт')
							)
					)
					.appendTo($elementsGroupRowContainer);
				}
			}
			
			$elementsGroupRowContainer.appendTo('#'+installationOfRailsCountId);
			
			this.setEventInputInstallationOfRails();
		},
		displayInputInstallationOfRails: function(show){
			if (show === true){
				$('#inputInstallationOfRails').removeClass('d-none');
				$('#inputInstallationOfRails').addClass('d-inline-block');
				
				$('#labelInstallationOfRails').removeClass('d-none');
				$('#labelInstallationOfRails').addClass('d-inline-block');
			}
			else{
				$('#inputInstallationOfRails').removeClass('d-inline-block');
				$('#inputInstallationOfRails').addClass('d-none');
				
				$('#labelInstallationOfRails').removeClass('d-inline-block');
				$('#labelInstallationOfRails').addClass('d-none');
			}
		},
		eventInstallationOfRailsElements:[],
		setEventInstallationOfRailsElements:function(elementId){
			this.eventInstallationOfRailsElements.push(elementId);
			$(document).on('change', 'input:radio[name^="'+elementId+'"]', function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('name');
				let itemId = this.id;
				
				let setp = _orderStepsHelper.getStepOrNull(stepId);
				let element = _orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				_orderStepsHelper.unselectElementItems(element.items);
				let selectedItem = _orderStepsHelper.selectElementItem(element.items, itemId);
				
				let show = selectedItem.title === 'Да' && selectedItem.isSelected === true;
				orderStep.displayInputInstallationOfRails(show);
				_calculationHelper.recalcAll();
			});
		},
		removeEventInstallationOfRailsElements:function(){
			for(let i=0; i < this.eventInstallationOfRailsElements.length; i++){
					$(document).off('change', 'input:radio[name^="'+this.eventInstallationOfRailsElements[i]+'"]');
			}
				
			this.eventInstallationOfRailsElements = [];
		},

		setEventInputInstallationOfRails:function(){
			$(document).on('change', '#inputInstallationOfRails', function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('element-id');
				let itemId = $(this).attr('item-id');
				let val = $('#inputInstallationOfRails').val();
				
				let setp = _orderStepsHelper.getStepOrNull(stepId);
				let element = _orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				_orderStepsHelper.saveInstallationOfRailsCount(element, itemId, val);
				_calculationHelper.recalcAll();
			});
		},
		removeEventInputInstallationOfRails:function(){
			$(document).off('change', '#inputInstallationOfRails');
		},
		
		
		renderRadioSocketsCount:function(element){
			let currentOrderStep = this;
								
			if (element.title !== undefined){
				currentOrderStep.renderElementTitle(element.title, element.info);
			}
			
			if (element.items !== undefined){				
				let $container = $('<div class="container mb-4 px-0">');
				let $row = $('<div class="row">');
				let $radio = $('<div id="'+element.id+'" class="col-1 mr-4 mt-4">');
				$radio.appendTo($row);
				
				$container.append($row);
				$('#'+_stepId).append($container);
				
				element.items.forEach(function(item, index){							
					let radioItemDiv = $('<div class="custom-control custom-radio">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					radioItemDiv.append('<input id="'+item.id+'" type="radio" class="custom-control-input" name="'+element.id+'" '+chackedAtr+' step-id="'+_stepId+'"/>').append('<label for="'+item.id+'" class="custom-control-label">'+item.title+'</label>');
					
					if (item.info !== undefined){
						let toolTip = currentOrderStep.renderToolTip(item.info);
						radioItemDiv.append(toolTip);
					}
					
					$radio.append(radioItemDiv);
				});

				currentOrderStep.renderInputSocketsCount(element, _stepId);
				currentOrderStep.radioSetEvents(element);
			}
		},
		renderInputSocketsCount: function(element, stepId){
			let elementId = element.id;
			let $container = $('#'+elementId).parent();
			let installationOfRailsCountId = 'sockets-count-'+elementId;
			
			let sizeElementGroup = $('<div id="'+installationOfRailsCountId+'" class="col right mt-3">');
			sizeElementGroup.appendTo($container);
			
			var $elementsGroupRowContainer = $('<div class="container">');
			let enteredVal = element.enteredValue;
			for(let i=0; i<element.items.length; i++){
				let item = element.items[i];
				
				if(item.title === 'Да'){
					let displayCssClass = item.isSelected === true ? 'd-inline-block' : 'd-none';
					
					$('<div class="row mt-1 ml-0 mb-0 mr-0">')
					.append(
						$('<div class="p-0">')
							.append(
								$('<input id="inputSocketsCount" type="number" class="numberInput" step-id="'+stepId+'" element-id="'+elementId+'" item-id="'+item.id+'">')
								.addClass(displayCssClass)
								.val(enteredVal)
							)
							.append(
								$('<lebel id="labelSocketsCount" class="blue-text ml-1">')
								.addClass(displayCssClass)
								.text('шт')
							)
					)
					.appendTo($elementsGroupRowContainer);
				}
			}
			
			$elementsGroupRowContainer.appendTo('#'+installationOfRailsCountId);
			
			this.setEventInputSocketsCount();
		},
		displayInputSocketsCount: function(show){
			if (show === true){
				$('#inputSocketsCount').removeClass('d-none');
				$('#inputSocketsCount').addClass('d-inline-block');
				
				$('#labelSocketsCount').removeClass('d-none');
				$('#labelSocketsCount').addClass('d-inline-block');
			}
			else{
				$('#inputSocketsCount').removeClass('d-inline-block');
				$('#inputSocketsCount').addClass('d-none');
				
				$('#labelSocketsCount').removeClass('d-inline-block');
				$('#labelSocketsCount').addClass('d-none');
			}
		},
		eventSocketsCountElements:[],
		setEventSocketsCountElements:function(elementId){
			this.eventSocketsCountElements.push(elementId);
			$(document).on('change', 'input:radio[name^="'+elementId+'"]', function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('name');
				let itemId = this.id;
				
				let setp = _orderStepsHelper.getStepOrNull(stepId);
				let element = _orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				_orderStepsHelper.unselectElementItems(element.items);
				let selectedItem = _orderStepsHelper.selectElementItem(element.items, itemId);
				
				let show = selectedItem.title === 'Да' && selectedItem.isSelected === true;
				orderStep.displayInputSocketsCount(show);
				_calculationHelper.recalcAll();
			});
		},
		removeSocketsCountElements:function(){
			for(let i=0; i < this.eventSocketsCountElements.length; i++){
					$(document).off('change', 'input:radio[name^="'+this.eventSocketsCountElements[i]+'"]');
			}
				
			this.eventSocketsCountElements = [];
		},
		
		setEventInputSocketsCount:function(){
			$(document).on('change', '#inputSocketsCount', function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('element-id');
				let itemId = $(this).attr('item-id');
				let val = $('#inputSocketsCount').val();
				
				let setp = _orderStepsHelper.getStepOrNull(stepId);
				let element = _orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				_orderStepsHelper.saveSocketsCount(element, itemId, val);
				_calculationHelper.recalcAll();
			});
		},
		removeEventInputSocketsCount:function(){
			$(document).off('change', '#inputSocketsCount');
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
				$('#'+_stepId).append($container);
				
				element.items.forEach(function(item, index){							
					let radioItemDiv = $('<div class="image-radio-item custom-control custom-radio col-4 my-1">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					radioItemDiv
					.append('<input id="'+item.id+'" type="radio" class="custom-control-input" name="'+element.id+'" '+chackedAtr+' step-id="'+_stepId+'"/>')
					.append('<label for="'+item.id+'" class="custom-control-label"><img for="'+item.id+'" class="custom-control-label handle-type-img" src="img/handleTypes/'+item.title+'.jpg" alt="'+item.title+'"/></label>');
					
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
			$(document).on('change', 'input:radio[name^="'+elementId+'"]', function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('name');
				let itemId = this.id;
				
				let setp = _orderStepsHelper.getStepOrNull(stepId);
				let element = _orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				_orderStepsHelper.unselectElementItems(element.items);
				let selectedItem = _orderStepsHelper.selectElementItem(element.items, itemId);
			});
		},
		removeEventRadioHandleTypesElements:function(){
			for(let i=0; i < this.eventRadioHandleTypesElements.length; i++){
				$(document).off('change', 'input:radio[name^="'+this.eventRadioHandleTypesElements[i]+'"]');
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
				
				$('#'+_stepId).append($mainRow);
				
				element.items.forEach(function(item, index){											
					let $radioItemDiv = $('<div class="image-radio-item custom-control custom-radio col-3 my-1 mx-0">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					
					if (item.isSelected === true){
						currentOrderStep.renderSelectedCabinTypeData(_stepId, element.id, item);
					}
					
					$radioItemDiv
					.append('<input id="'+item.id+'" type="radio" class="custom-control-input" name="'+element.id+'" '+chackedAtr+' step-id="'+_stepId+'"/>')
					.append('<label for="'+item.id+'" class="custom-control-label"><img for="'+item.id+'" class="custom-control-label cabin-type-img img-fluid" src="img/cabinTypes/'+item.number+'.png" alt="'+item.number+'"/></label>');
					
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
			
			orderStep.removeEventFocusOutCabinTypeSize();
			orderStep.removeEventCahngeCabinTypesParametrs();
			
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
						
					maxValueAtr = 'max-val="'+size.maxValue+'"';
				}
				
				$('<div>')
					.append(
						$('<span class="mr-1">').text(size.title)
					)
					.append(
						$('<span class="blue-text mr-1">').text(size.name)
					)
					.append(
						$('<input id="'+size.name+'" step-id="'+stepId+'" element-id="'+elementId+'" item-id="'+selectedItem.id+'" type="number" class="numberInput form-control form-control-sm" '+maxValueAtr+'>')
						.val(size.enteredValue)
					)
					.appendTo(sizeBlock);
				
				if (size.maxValue !== undefined){
					$('<div class="invalid-feedback">')
						.append('Значение должно быть меньше или равно '+size.maxValue)
						.appendTo(sizeBlock);
				}
						
					orderStep.setEventFocusOutCabinTypeSize(size.name);
			});

			orderStep.renderAdditionalParamatres(stepId, elementId, selectedItem);
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
						$('<input id="'+additionalItem.id+'" type="radio" class="custom-control-input" name="'+selectedItem.additionalParamatres[0].id+'" '+chackedAtr+' item-id="'+selectedItem.id+'" element-id="'+elementId+'"  step-id="'+stepId+'"/>')
					)
					.append(
						$('<label for="'+additionalItem.id+'" class="custom-control-label">'+additionalItem.title+'</label>')
					)
					.appendTo($radioItemDiv);
					
				});

				$radioItemDiv.appendTo($row);
				
				orderStep.removeEventCahngeCabinTypesParametrs();
				orderStep.setEventCahngeCabinTypesAdditionalParamatrs(selectedItem.additionalParamatres[0].id);
			}
		},
		eventCabinTypesElements:[],
		setEventCabinTypesElements: function(elementId){
			this.eventCabinTypesElements.push(elementId);
			$(document).on('change', 'input:radio[name^="'+elementId+'"]', function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('name');
				let itemId = this.id;
				
				let setp = _orderStepsHelper.getStepOrNull(stepId);
				let element = _orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				_orderStepsHelper.unselectElementItems(element.items);
				let selectedItem = _orderStepsHelper.selectElementItem(element.items, itemId);
				
			    stepsRenderHelper.clearSteps();
			    stepsRenderHelper.renderAllSteps();
			});
		},
		removeEventCabinTypesElements:function(){			
			for(let i=0; i < this.eventCabinTypesElements.length; i++){
				$(document).off('change', 'input:radio[name^="'+this.eventCabinTypesElements[i]+'"]');
			}

			this.eventCabinTypesElements = [];
		},
		eventFocusOutCabinTypeSizes:[],
		setEventFocusOutCabinTypeSize(sizeName){
			this.eventFocusOutCabinTypeSizes.push(sizeName);
			$(document).on('focusout', '#'+sizeName, function (event) {
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
				
				let setp = _orderStepsHelper.getStepOrNull(stepId);
				let element = _orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				_orderStepsHelper.saveCabinTypesSize(element, itemId, _sizeName, this.value);
			});
		},
		removeEventFocusOutCabinTypeSize(){
			for(let i=0; i < this.eventFocusOutCabinTypeSizes.length; i++){
				$(document).off('focusout', 'input:["#'+this.eventFocusOutCabinTypeSizes[i]+'"]');
			}

			this.eventFocusOutCabinTypeSizes = [];
		},
		eventCahngeCabinTypesAdditionalParamatrs:[],
		setEventCahngeCabinTypesAdditionalParamatrs(elementId){
			this.eventCahngeCabinTypesAdditionalParamatrs.push(elementId);
			$(document).on('change', 'input:radio[name^="'+elementId+'"]', function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('element-id');
				let itemId = $(this).attr('item-id');
				let additionalParamatresId = this.name;
				let additionalItemId = this.id;
				
				let setp = _orderStepsHelper.getStepOrNull(stepId);
				let element = _orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				_orderStepsHelper.unselectCabinTypesAdditionalParamatr(element, itemId, additionalParamatresId);
				_orderStepsHelper.saveCabinTypesAdditionalParamatr(element, itemId, additionalParamatresId, additionalItemId);
			});
		},
		removeEventCahngeCabinTypesParametrs(){
			for(let i=0; i < this.eventCahngeCabinTypesAdditionalParamatrs.length; i++){
				$(document).off('change', '#'+this.eventCahngeCabinTypesAdditionalParamatrs[i]);
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
				
				$('#'+_stepId).append($mainRow);
				
				element.items.forEach(function(item, index){											
					let $radioItemDiv = $('<div class="image-radio-item custom-control custom-radio col-12 my-1 mx-0">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					
					if (item.isSelected === true){
						//currentOrderStep.renderSelectedSlidingDoorTypeData(_stepId, element.id, item);
					}
					
					$radioItemDiv
					.append('<input id="'+item.id+'" type="radio" class="custom-control-input" name="'+element.id+'" '+chackedAtr+' step-id="'+_stepId+'"/>')
					.append('<label for="'+item.id+'" class="custom-control-label sliding-door-type-label"><div class="row m-0"><h7 class="blue-text left ml-1">'+item.title+'</h7></div><img for="'+item.id+'" class="custom-control-label sliding-door-type-img img-fluid" src="img/slidingDoorTypes/'+item.number+'.png" alt="'+item.number+'"/></label>');
					
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
				
				$('#'+_stepId).append($mainRow);
				
				element.items.forEach(function(item, index){											
					let $radioItemDiv = $('<div class="image-radio-item custom-control custom-radio col-12 my-1 mx-0">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					
					if (item.isSelected === true){
						//currentOrderStep.renderSelectedSwingDoorTypeData(_stepId, element.id, item);
					}
					
					$radioItemDiv
					.append('<input id="'+item.id+'" type="radio" class="custom-control-input" name="'+element.id+'" '+chackedAtr+' step-id="'+_stepId+'"/>')
					.append('<label for="'+item.id+'" class="custom-control-label swing-door-type-label"><div class="row m-0"><h7 class="blue-text left ml-1">'+item.title+'</h7></div><img for="'+item.id+'" class="custom-control-label swing-door-type-img img-fluid" src="img/swingDoorsTypes/'+item.number+'.png" alt="'+item.number+'"/></label>');
					
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
	
	let stepsRenderHelper = {
		init: function(orderStepsHelper, orderSteps, calculationHelper){
			_orderStepsHelper = orderStepsHelper;
			_orderSteps = orderSteps;
			_calculationHelper = calculationHelper;
		},
		createStep: function(step){
			orderStep.createStep(step);
		},
		setTooltipeEvents: function(){
			$('[data-toggle="tooltip"]').tooltip();
		},
		removeTooltipeEvents: function(){
			$('[data-toggle="tooltip"]').off('.tooltip');
		},
		renderSteps: function(steps){
			if (steps === undefined){
				return;
			}
			
			let _this = this;
			steps.forEach(function(step, index){
				orderStep.createStep(step);
				
				if ($.isArray(step.stepElements)){
					step.stepElements.forEach(function(stepElement, index){
						if (stepElement.items !== undefined){
							stepElement.items.forEach(function(item, index){
								if (item.isSelected === true){
									_this.renderSteps(item.childSteps);
								}
							});
						}
					});
				}
			});
		},
		renderAllSteps: function(){
			this.renderSteps(_orderSteps);
			this.setTooltipeEvents();
			
			_calculationHelper.recalcAll();
		},
		clearSteps: function(){
			this.removeTooltipeEvents();
			orderStep.removeRadioEventRefreshSteps();
			orderStep.removeRadioEventAppendSizeElements();				
			orderStep.removeIputPanelSizeEventOutElements();
			
			orderStep.removeEventInputInstallationOfRails();
			orderStep.removeEventInstallationOfRailsElements();
			
			orderStep.removeEventInputSocketsCount();
			orderStep.removeSocketsCountElements();
			
			orderStep.removeEventRadioHandleTypesElements();
			
			orderStep.removeEventCabinTypesElements();
			orderStep.removeEventCahngeCabinTypesParametrs();
			orderStep.removeEventFocusOutCabinTypeSize();
			
			$('.calculator').empty();
		},
		setTotalPrice: function(totalPrice){
			orderStep.setTotalPrice(totalPrice);
		}
	};
	
	return stepsRenderHelper;
}());