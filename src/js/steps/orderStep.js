import $ from "jquery";
import _ from 'underscore';


export default (function () {
	const mainContainerId = '.calculator';
	let _stepId;
	let orderStepsHelper;
	let calcHelper;
	let orderSteps;
	let railAndSocketStep;
	let panelSizeStep;
	let totalPriceStep;
	let metringAndInstallationStep;
	let templateHelper;

	let orderStepRender =
	{
		createStep: function (step) {
			_stepId = step.id;

			let $column = $('<div>');
			if (step.doubleWidthSize === true && step.doubleWidthSizeInMiddle === undefined && step.tripleWidthSize === undefined) {
				$column.addClass('col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 py-2 px-2');
			}
			else if (step.doubleWidthSize === undefined && step.doubleWidthSizeInMiddle === true && step.tripleWidthSize === undefined) {
				$column.addClass('col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 py-2 px-2');
			}
			else if (step.doubleWidthSize === undefined && step.doubleWidthSizeInMiddle === undefined && step.tripleWidthSize === true) {
				$column.addClass('col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 py-2 px-2');
			}
			else {
				$column.addClass('col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 py-2 px-2');
			}

			let $orderStepRender = $('<div class="order-step">')
				.append(`<div id=${_stepId} class="card-body">`)
				.appendTo($column);

			if (step.isTotalPriceStep === true) {
				$orderStepRender
					.addClass('text-light')
					.addClass('bg-primary');
			}

			$column.appendTo(mainContainerId);

			this.renderTitle(step.title, step.info);

			let currentOrderStep = this;

			if (step.stepElements !== undefined) {
				step.stepElements.forEach(function (element, index) {
					if (element.itemChange === 'eventAppendSizeElements') {
						panelSizeStep.renderRadioAppendSize(element, _stepId);
					} else if (element.itemChange === 'eventSocketsCount') {
						railAndSocketStep.renderRadioSocketsCount(element, _stepId);
					} else if (element.itemChange === 'eventHandleTypes') {
						currentOrderStep.renderRadioHandleTypes(element);
					} else if (element.itemChange === 'eventCabinTypes') {
						currentOrderStep.renderRadioCabinTypes(element);
					} else if (element.itemChange === 'eventSlidingDoorTypes') {
						currentOrderStep.renderSlidingDoorTypes(element);
					} else if (element.itemChange === 'eventMetringElementChange') {
						metringAndInstallationStep.renderMetringBlock(element, _stepId);
					} else if (element.itemChange === 'eventInstallingElementChange') {
						metringAndInstallationStep.renderInstallationBlock(element, step);
					} else if (element.itemChange === 'eventSwingDoorsTypes') {
						currentOrderStep.renderSwingDoorsTypes(element);
					} else {
						currentOrderStep.renderRadio(element);
					}
					currentOrderStep.renderTextBlock(element);
					currentOrderStep.textBlockCenter(element);
					totalPriceStep.totalPriceBlock(element, _stepId);
				});
			}
		},
		renderTitle: function (stepTitle, stepInfo) {


			const data = {
				stepTitle: stepTitle,
				toolTypeHtml: this.renderToolTip(stepInfo)
			};
			const html = templateHelper.getTemplateResult("element-title-block", data);
			$(`#${_stepId}`).append(html);

			/*
			let titleContainer = $('<h5 class="card-title">');
			titleContainer.append(stepTitle);
			
			let currentOrderStep = this;
			if (stepInfo !== undefined){
				let toolTip = currentOrderStep.renderToolTip(stepInfo);
				titleContainer.append(toolTip);
			}
			
			titleContainer.appendTo(`#${_stepId}`);*/
		},
		renderElementTitle: function (elementTitle, elementInfo) {
			let elementTitleElement = $(`<h6 class="card-subtitle mb-2 text-muted">${elementTitle}</div>`);

			let currentOrderStep = this;
			if (elementInfo !== undefined) {
				let toolTip = currentOrderStep.renderToolTip(elementInfo);
				elementTitleElement.append(toolTip);
			}

			elementTitleElement.appendTo(`#${_stepId}`);
		},
		renderToolTip: function (toolTipText) {
			const data = {
				title: toolTipText,
			};
			return templateHelper.getTemplateResult("tool-type-info-or-empty", data);

			//return $(`<div class="float-right question-img" data-toggle="tooltip-white" data-placement="top" title="${toolTipText}"></div>`)
		},
		renderTextBlock: function (element) {
			if (element.textBlock !== undefined) {
				$(`<p class="card-text text-left text-muted">${element.textBlock}</p>`).appendTo(`#${_stepId}`);
			}
		},
		textBlockCenter: function (element) {
			if (element.textBlockCenter !== undefined) {
				let data = {
					text: element.textBlockCenter
				};

				let html = templateHelper.getTemplateResult("text-block-center", data);
				$(`#${_stepId}`).append(html);
			}
		},
		radioSetEvents: function (element) {
			if (element.itemChange === 'eventRefreshSteps') {
				this.setRadioEventRefreshSteps(element.id);
			} else if (element.itemChange === 'eventAppendSizeElements') {
				panelSizeStep.setRadioEventAppendSizeElements(element.id);
			} else if (element.itemChange === 'eventSocketsCount') {
				railAndSocketStep.setEventSocketsCountElements(element.id);
			} else if (element.itemChange === 'eventHandleTypes') {
				this.setEventRadioHandleTypesElements(element.id);
			} else if (element.itemChange === 'eventMetringElementChange') {
				// is added in render function in step module
			} else if (element.itemChange === 'eventInstallingElementChange') {
				// is added in render function  in step module
			} else if (element.itemChange === 'eventCabinTypes') {
				this.setEventCabinTypesElements(element.id);
			} else if (element.itemChange === 'eventSlidingDoorTypes') {

			} else if (element.itemChange === 'eventSwingDoorsTypes') {

			} else {
				this.setRadioEventDefault(element.id);
			}
		},


		renderRadio: function (element) {
			let currentOrderStep = this;

			if (element.title !== undefined) {
				currentOrderStep.renderElementTitle(element.title, element.info);
			}

			if (element.items !== undefined) {
				let $container = $('<div class="container mb-4 px-0">');
				let $row = $('<div class="row">');
				let $radio = $(`<div id="${element.id}" class="col">`);
				$radio.appendTo($row);

				$container.append($row);
				$(`#${_stepId}`).append($container);

				element.items.forEach(function (item, index) {
					let radioItemDiv = $('<div class="custom-control custom-radio">');
					let checkedAtr = item.isSelected === true ? 'checked' : '';
					radioItemDiv.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${checkedAtr} step-id="${_stepId}"/>`).append(`<label for="${item.id}" class="custom-control-label">${item.title}</label>`);

					if (item.info !== undefined) {
						let toolTip = currentOrderStep.renderToolTip(item.info);
						radioItemDiv.append(toolTip);
					}

					$radio.append(radioItemDiv);
				});

				currentOrderStep.radioSetEvents(element);
			}
		},
		radioIdsWithEventRefreshSteps: [],
		setRadioEventRefreshSteps: function (elementId) {
			this.radioIdsWithEventRefreshSteps.push(elementId);

			$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = $(this).attr('step-id');
				let itemId = $(this).attr('id');
				let elementId = $(this).attr('name');
				let step = orderStepsHelper.getStepOrNull(stepId);

				if (step !== null) {
					let element = orderStepsHelper.getStepElementOrNull(step, elementId);
					orderStepsHelper.unselectElementItems(element.items);
					orderStepsHelper.selectElementItem(element.items, itemId);

					module.clearSteps();
					module.renderAllSteps();
				}
			});
		},
		setRadioEventDefault: function (elementId) {
			this.radioIdsWithEventRefreshSteps.push(elementId);

			$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = $(this).attr('step-id');
				let itemId = $(this).attr('id');
				let elementId = $(this).attr('name');
				let step = orderStepsHelper.getStepOrNull(stepId);

				if (step !== null) {
					let element = orderStepsHelper.getStepElementOrNull(step, elementId);
					orderStepsHelper.unselectElementItems(element.items);
					orderStepsHelper.selectElementItem(element.items, itemId);

					calcHelper.recalcAll();
				}
			});
		},
		removeRadioEventRefreshSteps: function () {
			for (let i = 0; i < this.radioIdsWithEventRefreshSteps.length; i++) {
				$(document).off('change', `input:radio[name^="${this.radioIdsWithEventRefreshSteps[i]}"]`);
			}

			this.radioIdsWithEventRefreshSteps = [];
		},
		renderRadioHandleTypes: function (element) {
			let currentOrderStep = this;

			if (element.title !== undefined) {
				currentOrderStep.renderElementTitle(element.title, element.info);
			}

			if (element.items !== undefined) {
				let $container = $('<div class="container mb-4 px-0">');
				let $row = $('<div class="row">');

				$container.append($row);
				$(`#${_stepId}`).append($container);

				element.items.forEach(function (item, index) {
					let radioItemDiv = $('<div class="image-radio-item custom-control custom-radio col-4 my-1">');
					let checkedAtr = item.isSelected === true ? 'checked' : '';
					radioItemDiv
						.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${checkedAtr} step-id="${_stepId}"/>`)
						.append(`<label for="${item.id}" class="custom-control-label"><img for="${item.id
							}" class="custom-control-label handle-type-img handle-type-img-content-${item.title}" alt="${item.title}"/></label>`);

					if (item.info !== undefined) {
						let toolTip = currentOrderStep.renderToolTip(item.info);
						radioItemDiv.append(toolTip);
					}

					$row.append(radioItemDiv);
				});

				currentOrderStep.radioSetEvents(element);
			}
		},
		eventRadioHandleTypesElements: [],
		setEventRadioHandleTypesElements: function (elementId) {
			this.eventRadioHandleTypesElements.push(elementId);
			$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('name');
				let itemId = this.id;

				let step = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(step, elementId);

				orderStepsHelper.unselectElementItems(element.items);
				let selectedItem = orderStepsHelper.selectElementItem(element.items, itemId);

				calcHelper.recalcAll();
			});
		},
		removeEventRadioHandleTypesElements: function () {
			for (let i = 0; i < this.eventRadioHandleTypesElements.length; i++) {
				$(document).off('change', `input:radio[name^="${this.eventRadioHandleTypesElements[i]}"]`);
			}

			this.eventRadioHandleTypesElements = [];
		},


		renderRadioCabinTypes: function (element) {
			let currentOrderStep = this;

			if (element.title !== undefined) {
				currentOrderStep.renderElementTitle(element.title, element.info);
			}

			if (element.items !== undefined) {

				let $mainRow = $('<div class="row" mainRow="0">');

				let $mainRowColumn1 = $('<div class="col-8">');
				$mainRowColumn1.appendTo($mainRow);

				let $mainRowColumn2 = $('<div id="selected-cabin-type-data" class="col-4">');
				$mainRowColumn2.appendTo($mainRow);

				let $row = $('<div class="row">');
				$mainRowColumn1.append($row);

				$(`#${_stepId}`).append($mainRow);

				element.items.forEach(function (item, index) {
					let $radioItemDiv = $('<div class="image-radio-item custom-control custom-radio col-3 my-1 mx-0">');
					let checkedAtr = item.isSelected === true ? 'checked' : '';

					if (item.isSelected === true) {
						currentOrderStep.renderSelectedCabinTypeData(_stepId, element.id, item);
					}

					$radioItemDiv
						.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${checkedAtr} step-id="${_stepId}"/>`)
						.append(`<label for="${item.id}" class="custom-control-label"><img for="${item.id
							}" class="custom-control-label cabin-type-img img-fluid cabin-type-img-content-${item.number}" alt="${item.number}"/></label>`);

					if (item.info !== undefined) {
						let toolTip = currentOrderStep.renderToolTip(item.info);
						$radioItemDiv.append(toolTip);
					}

					$row.append($radioItemDiv);
				});

				currentOrderStep.radioSetEvents(element);
			}
		},
		renderSelectedCabinTypeData: function (stepId, elementId, selectedItem) {

			orderStepRender.removeEventFocusOutCabinTypeSize();
			orderStepRender.removeEventChangeCabinTypesParameters();

			$('#selected-cabin-type-data').empty();

			$('<h6 class="card-subtitle mb-0 text-muted">')
				.text('Тип перегородки:')
				.appendTo('#selected-cabin-type-data');

			if (selectedItem.title !== undefined) {
				$('<span class="blue-text">')
					.text(selectedItem.title)
					.appendTo('#selected-cabin-type-data');
			}

			$('<h6 class="card-subtitle mt-2 text-muted">')
				.text('Размер:')
				.appendTo('#selected-cabin-type-data');

			selectedItem.sizes.forEach(function (size, index) {
				let sizeBlock = $('<div class="mt-3">');
				sizeBlock.appendTo('#selected-cabin-type-data');

				let maxValueAtr = '';
				if (size.maxValue !== undefined) {
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

				if (size.maxValue !== undefined) {
					$('<div class="invalid-feedback">')
						.append(`Значение должно быть меньше или равно ${size.maxValue}`)
						.appendTo(sizeBlock);
				}

				orderStepRender.setEventFocusOutCabinTypeSize(size.name);
			});

			orderStepRender.renderAdditionalParameters(stepId, elementId, selectedItem);
		},
		renderAdditionalParameters: function (stepId, elementId, selectedItem) {
			if (selectedItem.additionalParameters !== undefined) {
				let $row = $('<div class="row">')
					.appendTo('#selected-cabin-type-data')

				let $radioItemDiv = $('<div class="col-12 my-1 mx-0">');
				$radioItemDiv
					.append(
						$('<h6 class="card-subtitle mt-2 text-muted">').text(selectedItem.additionalParameters[0].title)
					);

				selectedItem.additionalParameters[0].items.forEach(function (additionalItem, index) {
					let checkedAtr = additionalItem.isSelected === true ? 'checked' : '';

					$('<div class="custom-control custom-radio">')
						.append(
							$(`<input id="${additionalItem.id}" type="radio" class="custom-control-input" name="${selectedItem.additionalParameters[0].id}" ${checkedAtr} item-id="${selectedItem.id}" element-id="${elementId
								}"  step-id="${stepId}"/>`)
						)
						.append(
							$(`<label for="${additionalItem.id}" class="custom-control-label">${additionalItem.title}</label>`)
						)
						.appendTo($radioItemDiv);

				});

				$radioItemDiv.appendTo($row);

				orderStepRender.removeEventChangeCabinTypesParameters();
				orderStepRender.setEventChangeCabinTypesAdditionalParameters(selectedItem.additionalParameters[0].id);
			}
		},
		eventCabinTypesElements: [],
		setEventCabinTypesElements: function (elementId) {
			this.eventCabinTypesElements.push(elementId);
			$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('name');
				let itemId = this.id;

				let step = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(step, elementId);

				orderStepsHelper.unselectElementItems(element.items);
				let selectedItem = orderStepsHelper.selectElementItem(element.items, itemId);

				calcHelper.recalcAll();
				module.clearSteps();
				module.renderAllSteps();
			});
		},
		removeEventCabinTypesElements: function () {
			for (let i = 0; i < this.eventCabinTypesElements.length; i++) {
				$(document).off('change', `input:radio[name^="${this.eventCabinTypesElements[i]}"]`);
			}

			this.eventCabinTypesElements = [];
		},
		eventFocusOutCabinTypeSizes: [],
		setEventFocusOutCabinTypeSize(sizeName) {
			this.eventFocusOutCabinTypeSizes.push(sizeName);
			$(document).on('focusout', `#${sizeName}`, function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('element-id');
				let itemId = $(this).attr('item-id');
				let _sizeName = this.id;
				let maxValueAtr = $(this).attr('max-val');

				if (maxValueAtr != undefined && maxValueAtr * 1 < this.value * 1) {
					$(this).addClass('is-invalid');
					return;
				}
				else {
					$(this).removeClass('is-invalid');
				}

				let step = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(step, elementId);

				orderStepsHelper.saveCabinTypesSize(element, itemId, _sizeName, this.value);
				calcHelper.recalcAll();
			});
		},
		removeEventFocusOutCabinTypeSize() {
			for (let i = 0; i < this.eventFocusOutCabinTypeSizes.length; i++) {
				$(document).off('focusout', `input:["#${this.eventFocusOutCabinTypeSizes[i]}"]`);
			}

			this.eventFocusOutCabinTypeSizes = [];
		},
		eventChangeCabinTypesAdditionalParameters: [],
		setEventChangeCabinTypesAdditionalParameters(elementId) {
			this.eventChangeCabinTypesAdditionalParameters.push(elementId);
			$(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = $(this).attr('step-id');
				let elementId = $(this).attr('element-id');
				let itemId = $(this).attr('item-id');
				let additionalParametersId = this.name;
				let additionalItemId = this.id;

				let step = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(step, elementId);

				orderStepsHelper.unselectCabinTypesAdditionalParameter(element, itemId, additionalParametersId);
				orderStepsHelper.saveCabinTypesAdditionalParameter(element, itemId, additionalParametersId, additionalItemId);

				calcHelper.recalcAll();
			});
		},
		removeEventChangeCabinTypesParameters() {
			for (let i = 0; i < this.eventChangeCabinTypesAdditionalParameters.length; i++) {
				$(document).off('change', `#${this.eventChangeCabinTypesAdditionalParameters[i]}`);
			}

			this.eventChangeCabinTypesAdditionalParameters = [];
		},


		renderSlidingDoorTypes: function (element) {
			let currentOrderStep = this;

			if (element.title !== undefined) {
				currentOrderStep.renderElementTitle(element.title, element.info);
			}

			if (element.items !== undefined) {

				let $mainRow = $('<div class="row" mainRow="0">');

				let $mainRowColumn1 = $('<div class="col-6">');
				$mainRowColumn1.appendTo($mainRow);

				let $mainRowColumn2 = $('<div id="selected-cabin-type-data" class="col-6">');
				$mainRowColumn2.appendTo($mainRow);

				let $row = $('<div class="row">');
				$mainRowColumn1.append($row);

				$(`#${_stepId}`).append($mainRow);

				element.items.forEach(function (item, index) {
					let $radioItemDiv = $('<div class="image-radio-item custom-control custom-radio col-12 my-1 mx-0">');
					let checkedAtr = item.isSelected === true ? 'checked' : '';

					if (item.isSelected === true) {
						//currentOrderStep.renderSelectedSlidingDoorTypeData(_stepId, element.id, item);
					}

					$radioItemDiv
						.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${checkedAtr} step-id="${_stepId}"/>`)
						.append(`<label for="${item.id
							}" class="custom-control-label sliding-door-type-label"><div class="row m-0"><h7 class="blue-text left ml-1">${item.title
							}</h7></div><img for="${item.id
							}" class="custom-control-label sliding-door-type-img img-fluid sliding-door-type-img-content-${item.number}" alt="${item.number
							}"/></label>`);

					if (item.info !== undefined) {
						let toolTip = currentOrderStep.renderToolTip(item.info);
						$radioItemDiv.append(toolTip);
					}

					$row.append($radioItemDiv);
				});

				//currentOrderStep.radioSetEvents(element);
			}
		},



		renderSwingDoorsTypes: function (element) {
			let currentOrderStep = this;

			if (element.title !== undefined) {
				currentOrderStep.renderElementTitle(element.title, element.info);
			}

			if (element.items !== undefined) {

				let $mainRow = $('<div class="row" mainRow="0">');

				let $mainRowColumn1 = $('<div class="col-6">');
				$mainRowColumn1.appendTo($mainRow);

				let $mainRowColumn2 = $('<div id="selected-cabin-type-data" class="col-6">');
				$mainRowColumn2.appendTo($mainRow);

				let $row = $('<div class="row">');
				$mainRowColumn1.append($row);

				$(`#${_stepId}`).append($mainRow);

				element.items.forEach(function (item, index) {
					let $radioItemDiv = $('<div class="image-radio-item custom-control custom-radio col-12 my-1 mx-0">');
					let checkedAtr = item.isSelected === true ? 'checked' : '';

					if (item.isSelected === true) {
						//currentOrderStep.renderSelectedSwingDoorTypeData(_stepId, element.id, item);
					}

					$radioItemDiv
						.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${checkedAtr} step-id="${_stepId}"/>`)
						.append(`<label for="${item.id
							}" class="custom-control-label swing-door-type-label"><div class="row m-0"><h7 class="blue-text left ml-1">${item.title
							}</h7></div><img for="${item.id}" class="custom-control-label swing-door-type-img img-fluid 
							swing-door-type-img-content-${item.number}" alt="${item.number}"/></label>`);

					if (item.info !== undefined) {
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
		init: function (orderStepsHelperModule, steps, calcHelperModule, railAndSocketStepModule, panelSizeStepModule,
			totalPriceStepModule, metringAndInstallationStepModule, templateHelperModule) {
			orderStepsHelper = orderStepsHelperModule;
			totalPriceStep = totalPriceStepModule;
			metringAndInstallationStep = metringAndInstallationStepModule;
			orderSteps = steps;
			calcHelper = calcHelperModule;

			railAndSocketStep = railAndSocketStepModule;
			panelSizeStep = panelSizeStepModule;

			templateHelper = templateHelperModule;
		},

		createStep: function (step) {
			orderStepRender.createStep(step);
		},
		setTooltipEvents: function () {
			$('[data-toggle="tooltip-white"]').tooltip();
		},
		removeTooltipEvents: function () {
			$('[data-toggle="tooltip-white"]').off('.tooltip');
		},
		stopRenderSteps: undefined,
		renderSteps: function (steps) {
			if (steps === undefined) {
				return;
			}

			let _this = this;
			for (let sIdx = 0; sIdx < steps.length; sIdx++) {
				let step = steps[sIdx];
				orderStepRender.createStep(step);

				orderStepRender.stopRenderSteps = step.stopRender;
				if (orderStepRender.stopRenderSteps === true) {
					return;
				}

				if ($.isArray(step.stepElements)) {
					for (let seIdx = 0; seIdx < step.stepElements.length; seIdx++) {
						let stepElement = step.stepElements[seIdx];
						if (stepElement.items !== undefined) {
							let i = stepElement.items.findIndex(item => item.isSelected === true);
							if (i >= 0) {
								_this.renderSteps(stepElement.items[i].childSteps);
								if (orderStepRender.stopRenderSteps === true) {
									return;
								}
							}
						}
					}
				}
			}
		},
		renderAllSteps: function () {
			orderStepRender.stopRenderSteps = undefined;
			this.renderSteps(orderSteps);
			this.setTooltipEvents();

			calcHelper.recalcAll();
		},
		clearSteps: function () {
			this.removeTooltipEvents();
			orderStepRender.removeRadioEventRefreshSteps();

			panelSizeStep.removeRadioEventAppendSizeElements();
			panelSizeStep.removeInputPanelSizeEventOutElements();
			panelSizeStep.removePanelSizeContinueBtnEventEvent();

			railAndSocketStep.removeSocketsCountElements();
			railAndSocketStep.removeSocketsBlockElements();
			railAndSocketStep.removeEventInputSocketsCount();
			railAndSocketStep.removeSocketsBlockNeedPhotoPrintingElements();

			orderStepRender.removeEventRadioHandleTypesElements();

			metringAndInstallationStep.removeEventMetringElementChange();
			metringAndInstallationStep.removeEventInstallingElementChange();

			orderStepRender.removeEventCabinTypesElements();
			orderStepRender.removeEventChangeCabinTypesParameters();
			orderStepRender.removeEventFocusOutCabinTypeSize();

			totalPriceStep.removeOrderBtnEvent();
			totalPriceStep.removeOrderFormSubmitEvent();
			totalPriceStep.removeClientDrawingChangeEvents();

			$('.calculator').empty();
		},
		setTotalPrice: function (totalPrice) {
			totalPriceStep.setTotalPrice(totalPrice);
		},

		orderStepRender: orderStepRender

	};

	return module;
}());