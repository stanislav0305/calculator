var railAndSocketStepModule = (function(){
    let orderStep;
    let orderStepRender;
	let orderStepsHelper;
	let calcHelper;
	
	let module = {
		renderRadioInstallationOfRails:function(element, stepId){			
			if (element.title !== undefined){
			    orderStepRender.renderElementTitle(element.title, element.info);
			}
			
			if (element.items !== undefined){				
				let $container = $('<div class="container mb-4 px-0">');
				let $row = $('<div class="row">');
				let $radio = $(`<div id="${element.id}" class="col-1 mr-4 mt-4">`);
				$radio.appendTo($row);
				
				$container.append($row);
				$(`#${stepId}`).append($container);
				
				element.items.forEach(function(item, index){							
					let radioItemDiv = $('<div class="custom-control custom-radio">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					radioItemDiv.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${chackedAtr} step-id="${stepId}"/>`).append(`<label for="${item.id}" class="custom-control-label">${item.title}</label>`);
					
					if (item.info !== undefined){
                        let toolTip = orderStepRender.renderToolTip(item.info);
						radioItemDiv.append(toolTip);
					}
					
					$radio.append(radioItemDiv);
				});

				module.renderInputInstallationOfRails(element, stepId);
			    orderStepRender.radioSetEvents(element);
			}
		},
		renderInputInstallationOfRails: function(element, stepId){
			let elementId = element.id;
			let $container = $(`#${elementId}`).parent();
			let installationOfRailsCountId = `installation-of-rails-count-${elementId}`;
			
			let sizeElementGroup = $(`<div id="${installationOfRailsCountId}" class="col right mt-3">`);
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
								$(`<input id="inputInstallationOfRails" type="number" class="numberInput" step-id="${stepId}" element-id="${elementId}" item-id="${item.id
								    }" min="1" max="99999">`)
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
			
			$elementsGroupRowContainer.appendTo(`#${installationOfRailsCountId}`);
			
			module.setEventInputInstallationOfRails();
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
			module.eventInstallationOfRailsElements.push(elementId);
			$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('name');
				let itemId = this.id;
				
				let setp = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				orderStepsHelper.unselectElementItems(element.items);
				let selectedItem = orderStepsHelper.selectElementItem(element.items, itemId);
				
				let show = selectedItem.title === 'Да' && selectedItem.isSelected === true;
				module.displayInputInstallationOfRails(show);
				calcHelper.recalcAll();
			});
		},
		removeEventInstallationOfRailsElements:function(){
			for(let i=0; i < module.eventInstallationOfRailsElements.length; i++){
					$(document).off('change', `input:radio[name^="${module.eventInstallationOfRailsElements[i]}"]`);
			}
				
			module.eventInstallationOfRailsElements = [];
		},

		setEventInputInstallationOfRails:function(){
			$(document).on('change', '#inputInstallationOfRails', function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('element-id');
				let itemId = $(this).attr('item-id');
				let val = $('#inputInstallationOfRails').val();
				
				let setp = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				orderStepsHelper.saveInstallationOfRailsCount(element, itemId, val);
				calcHelper.recalcAll();
			});
		},
		removeEventInputInstallationOfRails:function(){
			$(document).off('change', '#inputInstallationOfRails');
		},
		
		
		renderRadioSocketsCount:function(element, stepId){
			if (element.title !== undefined){
			    orderStepRender.renderElementTitle(element.title, element.info);
			}
			
			if (element.items !== undefined){				
				let $container = $('<div class="container mb-4 px-0">');
				let $row = $('<div class="row">');
                let $radio = $(`<div id="${element.id}" class="ml-3 mt-1">`);
				$radio.appendTo($row);
				
				$container.append($row);
				$(`#${stepId}`).append($container);
				
				element.items.forEach(function(item, index){							
					let radioItemDiv = $('<div class="custom-control custom-radio">');
					let chackedAtr = item.isSelected === true ? 'checked' : '';
					radioItemDiv.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${chackedAtr} step-id="${stepId}"/>`).append(`<label for="${item.id}" class="custom-control-label">${item.title}</label>`);
					
					if (item.info !== undefined){
						let toolTip = module.renderToolTip(item.info);
						radioItemDiv.append(toolTip);
					}
					
					$radio.append(radioItemDiv);
				});

				module.renderSocketCountElements(element, stepId);
			    orderStepRender.radioSetEvents(element);
			}
		},
		renderSocketCountElements: function(element, stepId){
			let elementId = element.id;
			let $container = $(`#${elementId}`).parent();
			let installationOfRailsCountId = `sockets-count-${elementId}`;
			
			let sizeElementGroup = $(`<div id="${installationOfRailsCountId}" class="mt-3">`);
			sizeElementGroup.appendTo($container);
			
			var $elementsGroupRowContainer = $('<div class="row">');
			for(let i=0; i<element.items.length; i++){
				let item = element.items[i];
				
				if(item.title === 'Да'){
					let displayCssClass = item.isSelected === true ? 'd-inline-block' : 'd-none';

                    item.socketsBloks.forEach(function (socketsBlok, index) {
                        let chackedAtr = socketsBlok.isSelected === true ? 'checked' : '';
                        let checkboxEnteredValueDiv =
                            $('<div class="image-checkbox-item custom-control custom-checkbox my-1">')
                                .append(`<input id="${item.id}-entered-value-${socketsBlok.number}" type="checkbox" class="custom-control-input" name="${element.id}" ${chackedAtr} step-id="${stepId}" item-id="${item.id}" socket-blok-number="${socketsBlok.number}" />`);

                        let enteredValueLabel = $(`<label for="${item.id}-entered-value-${socketsBlok.number}" class="custom-control-label socket-checkbox-label">`);
                        for (let i = 0; i < socketsBlok.number; i++) {
                            enteredValueLabel.append(`<img for="${item.id}" class="socket-img" src="img/socket.jpg" alt="${socketsBlok.title}"/>`);
                        }

                        let displayBlockCountCssClass = socketsBlok.isSelected === true ? 'd-inline-block' : 'd-none';
                        checkboxEnteredValueDiv
                            .append(enteredValueLabel)
                            .append(
                                $(`<input id="inputSocketsCount-${socketsBlok.number
                                }" type="number" class="small-numberInput ml-2 align-bottom ${displayBlockCountCssClass}" step-id="${stepId}" element-id="${
                                elementId}" item-id="${item.id}" socket-blok-number=${socketsBlok.number} min="1" max="99">`)
                                .val(socketsBlok.blockCount)
                            )
                            .append(
                            $(`<lebel id="labelSocketsCount-${socketsBlok.number}" class="blue-text ml-1 align-bottom ${displayBlockCountCssClass}">`)
                                .text('блок(ов)')
                            );

                        $(`<div class="sockets-count-blok col-12 p-0 mt-1 ml-0 mb-0 mr-0 ${displayCssClass}">`)
                        .append(checkboxEnteredValueDiv)
                        .appendTo($elementsGroupRowContainer);

                        module.setEventInputSocketsCount(socketsBlok.number);
				    });
				}
			}
			
			$elementsGroupRowContainer.appendTo(`#${installationOfRailsCountId}`);
			
           
            module.setEventSocketsBlockElements(elementId);
		},
		displayInputSocketsCount: function(show){
            if (show === true) {
                $('.sockets-count-blok').removeClass('d-none');
                $('.sockets-count-blok').addClass('d-inline-block');
			}
            else {
                $('.sockets-count-blok').removeClass('d-inline-block');
                $('.sockets-count-blok').addClass('d-none');
			}
		},
		eventSocketsCountElements:[],
		setEventSocketsCountElements:function(elementId){
			module.eventSocketsCountElements.push(elementId);
			$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('name');
				let itemId = this.id;
				
				let setp = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(setp, elementId);
				
				orderStepsHelper.unselectElementItems(element.items);
				let selectedItem = orderStepsHelper.selectElementItem(element.items, itemId);
				
				let show = selectedItem.title === 'Да' && selectedItem.isSelected === true;
				module.displayInputSocketsCount(show);
				calcHelper.recalcAll();
			});
		},
		removeSocketsCountElements:function(){
			for(let i=0; i < module.eventSocketsCountElements.length; i++){
					$(document).off('change', `input:radio[name^="${module.eventSocketsCountElements[i]}"]`);
			}
				
			module.eventSocketsCountElements = [];
		},

		eventSocketsBlockElements: [],
		setEventSocketsBlockElements: function (elementId) {
            module.eventSocketsBlockElements.push(elementId);
            $(document).on('change', `input:checkbox[name^="${elementId}"]`, function (event) {
		        let stepId = $(this).attr('step-id');
                let elementId = $(this).attr('name');
				let itemId = $(this).attr('item-id');
                let socketsBlokNumber = $(this).attr('socket-blok-number');
                let isChecked = $(this).is(':checked');
		        
		        let setp = orderStepsHelper.getStepOrNull(stepId);
		        let element = orderStepsHelper.getStepElementOrNull(setp, elementId);				

				let selectedSocketsBlok = orderStepsHelper.saveSocketsBlokSelect(element, itemId, socketsBlokNumber, isChecked);
				
                module.displaySocketBlokCountInputCount(socketsBlokNumber, isChecked);
		        calcHelper.recalcAll();
               
		    });
		},
		removeSocketsBlockElements: function () {
            for (let i = 0; i < module.eventSocketsBlockElements.length; i++) {
                $(document).off('change', `input:checkbox[name^="${module.eventSocketsBlockElements[i]}"]`);
		    }

            module.eventSocketsBlockElements = [];
		},
        displaySocketBlokCountInputCount: function (socketsBlokNumber, show) {
            if (show === true) {
                $(`#inputSocketsCount-${socketsBlokNumber}`)
                    .removeClass('d-none')
                    .addClass('d-inline-block');

                $(`#labelSocketsCount-${socketsBlokNumber}`)
                    .removeClass('d-none')
                    .addClass('d-inline-block');
		    }
            else {
                $(`#inputSocketsCount-${socketsBlokNumber}`)
                    .removeClass('d-inline-block')
                    .addClass('d-none');

                $(`#labelSocketsCount-${socketsBlokNumber}`)
                    .removeClass('d-inline-block')
                    .addClass('d-none');
		    }
        },

		eventInputSocketsCount:[],
        setEventInputSocketsCount: function (socketsBlokNumber) {
            module.eventInputSocketsCount.push(`#inputSocketsCount-${socketsBlokNumber}`);
            $(document).on('change', `#inputSocketsCount-${socketsBlokNumber}`, function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('element-id');
                let itemId = $(this).attr('item-id');
                let socketsBlokNumber = $(this).attr('socket-blok-number');
                let val = $(this).val();
				
				let setp = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(setp, elementId);
				
                orderStepsHelper.saveSocketsCount(element, itemId, socketsBlokNumber, val);
				calcHelper.recalcAll();
			});
		},
        removeEventInputSocketsCount: function () {
            for (let i = 0; i < module.eventInputSocketsCount.length; i++) {
                $(document).off('change', `#inputSocketsCount-${module.eventInputSocketsCount[i]}`);
            }

            module.eventInputSocketsCount = [];
		}
	};
	
	return {
		init:function(orderStepModule, orderStepsHelperModule, calcHelperModule){
            orderStep = orderStepModule;
		    orderStepRender = orderStep.orderStepRender;
            orderStepsHelper = orderStepsHelperModule;
			calcHelper = calcHelperModule;
		},
		renderRadioInstallationOfRails: module.renderRadioInstallationOfRails,
		renderRadioSocketsCount: module.renderRadioSocketsCount,
		
		setEventInstallationOfRailsElements: module.setEventInstallationOfRailsElements,
		setEventSocketsCountElements: module.setEventSocketsCountElements,
		
		removeEventInputInstallationOfRails: module.removeEventInputInstallationOfRails,
		removeEventInstallationOfRailsElements: module.removeEventInstallationOfRailsElements,
		removeSocketsCountElements: module.removeSocketsCountElements,
		removeSocketsBlockElements: module.removeSocketsBlockElements,
		removeEventInputSocketsCount: module.removeEventInputSocketsCount
	};
}());