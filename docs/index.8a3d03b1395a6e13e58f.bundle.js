/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 437:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/js/bootstrap.js
var bootstrap = __webpack_require__(754);
// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(692);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
// EXTERNAL MODULE: ./node_modules/jquery-validation/dist/jquery.validate.js
var jquery_validate = __webpack_require__(960);
;// ./src/lib/jquery-validation/localization/messages_ru.js



/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: RU (Russian; русский язык)
 */

jquery_default().extend( (jquery_default()).validator.messages, {
	required: "Это поле необходимо заполнить.",
	remote: "Пожалуйста, введите правильное значение.",
	email: "Пожалуйста, введите корректный адрес электронной почты.",
	url: "Пожалуйста, введите корректный URL.",
	date: "Пожалуйста, введите корректную дату.",
	dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
	number: "Пожалуйста, введите число.",
	digits: "Пожалуйста, вводите только цифры.",
	creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
	equalTo: "Пожалуйста, введите такое же значение ещё раз.",
	extension: "Пожалуйста, выберите файл с правильным расширением.",
	maxlength: jquery_default().validator.format( "Пожалуйста, введите не больше {0} символов." ),
	minlength: jquery_default().validator.format( "Пожалуйста, введите не меньше {0} символов." ),
	rangelength: jquery_default().validator.format( "Пожалуйста, введите значение длиной от {0} до {1} символов." ),
	range: jquery_default().validator.format( "Пожалуйста, введите число от {0} до {1}." ),
	max: jquery_default().validator.format( "Пожалуйста, введите число, меньшее или равное {0}." ),
	min: jquery_default().validator.format( "Пожалуйста, введите число, большее или равное {0}." )
});

// EXTERNAL MODULE: ./src/lib/smtp-min.js
var smtp_min = __webpack_require__(191);
;// ./src/js/calculatorConfig.js
﻿/* harmony default export */ var calculatorConfig = (function() {
    const isLocalhost = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);

    const module = {
        //-----------------------------
        //для душевых кабин
        //-----------------------------
        //цена доставки (с PVN) (для душевых кабин)
        SHOWER_CABIN_DELIVERY_PRICE: 7.00,

        //цена монтажа за 1 квадратный метр (с PVN) (для душевых кабин)
        SHOWER_CABIN_INSTALLATION_PRICE: 10.00,

        //цена фотопечати (с PVN)
        SHOWER_CABIN_PHOTO_PRINTING_PRICE: 30.00,

        //цена однотонной покраски (с PVN)
        SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE: 20.00,
        //-----------------------------


        //-----------------------------
        //для скинали
        //-----------------------------
        //минимальная площадь одной панели
        //если площадь одной панели < 0.3 то её площадь будет = 0.3 для всех расчётов
        SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS: 0.3,

        //цена замера (с PVN)
        SKINALI_METRING_PRICE: 10.00,

        //цена доставки (с PVN)
        SKINALI_DELIVERY_PRICE: 21.78,

        //цена монтажа за 1 квадратный метр (с PVN)
        SKINALI_INSTALLATION_PRICE: 20.57,

        //цена закалки панелей за 1 квадратный метр (с PVN)
        SKINALI_PANEL_HARDENING_PRICE: 25.31,

        //цена шлифовки панелей за 1 погонный метр (за 1 метр периметра) (с PVN)
        // если величина погонного метра (периметр) > 2 метров то цена за погонного метра (периметр) увеличивается на 25%
        // если величина погонного метра (периметр) > 3 метров то цена за погонного метра (периметр) увеличивается на 50%
        SKINALI_PANEL_GRINDING_PRICE: 2.13,

        //цена фотопечати за 1 квадратный метр (с PVN)
        SKINALI_PHOTO_PRINTING_PRICE: 45.19,

        //цена оформления фотопечати (с PVN)
        SKINALI_PHOTO_PRINTING_DESIGN_PRICE: 18.08,

        //цена фотопечати на 1 розетке в блоке розеток (с PVN)
        SKINALI_PHOTO_PRINTING_ON_ONE_SOCKET_BLOCK_PRICE: 5.00,

        //цена однотонной покраски за 1 квадратный метр (с PVN)
        SKINALI_MONOCHROMATIC_PAINTING_PRICE: 29.87,

        //цена за 1 квадратный метр обычного стекла
        SKINALI_NORMAL_GLASS_TYPE_PRICE: 16.64,

        //цена за 1 квадратный метр осветлённого стекла
        SKINALI_CLARIFIED_GLASS_TYPE_PRICE: 32.54,

        //цена за высверливание 1 отверстия в панелей (количество отверстий в одной панели = 1 + (целое число от длинна панели в метрах, если оно равно 0 то 1))
        SKINALI_ONE_HOLE_DRILLING_PRICE: 2.73,

        //цена за клей для всех панелей
        SKINALI_GLUE_PRICE: 5.00,

        //цена за высверливание 1 отверстия под 1 розетку в 1 блоке розеток (это цена за 1 высверливание, блок розеток требует несколько высверливаний)
        SKINALI_ONE_SOCKET_DRILLING_PRICE: 7.56,

        //-----------------------------


        //-----------------------------
        //для дверей
        //-----------------------------

        //цена доставки (с PVN) (для душевых кабин)
        DOORS_DELIVERY_PRICE: 7.00,

        //цена монтажа за 1 квадратный метр (с PVN) (для дверей)
        DOORS_INSTALLATION_PRICE: 10.00,

        //цена фотопечати (с PVN)
        DOORS_PHOTO_PRINTING_PRICE: 30.00,

        //цена однотонной покраски (с PVN)
        DOORS_MONOCHROMATIC_PAINTING_PRICE: 20.00,
        //-----------------------------

        //выводить лог в консоль
        PRINT_LOG_TO_CONSOLE_ON: isLocalhost === true ? true : true,

        //-----------------------------

        //отображать кнопку "заказать"
        SHOW_ORDER_BUTTON: true,

        //ключ для отправки мэйлов сгенерированный на smtpJs.com
        SEND_ORDER_SECURE_TOKEN: "2a89635f-a426-414c-9cdd-4616b54b3fec",

        //e-mail отправителя письма с данными заказа к которому привязан ключ на smtpJs.com
        SEND_ORDER_FROM: "stasmainwork@gmail.com",

        //e-mail получателя письма с данными заказа
        SEND_ORDER_TO: isLocalhost === true ? "0305stas@inbox.lv" : "bugsy@inbox.lv",

        //subject отправителя e-mail с данными заказа
        SEND_ORDER_SUBJECT: "Новый заказ от ",

        //-----------------------------

        //максимальное количество файлов с чертежами которое можно приложить к письму
        CLIENT_DRAWING_FILES_MAX_COUNT: 10,
        
        //максимальный объём всех приложенных файлов с чертежами
        CLIENT_DRAWING_TOTAL_FILES_MAX_SIZE_IN_BYTES: 25 * 1000000 // 25 Mb    
    };

    return module;
}());
// EXTERNAL MODULE: ./node_modules/underscore/modules/index-all.js + 160 modules
var index_all = __webpack_require__(523);
;// ./src/js/utils/miscHelper.js
﻿


/* harmony default export */ var miscHelper = (function() {

    const module = {
        isPositiveInteger: function(s) {
            return !!s.match(/^[0-9]+$/);
        },
        getFormData: function(formSelector) {
            let out = {};

            const serializedArr = $(formSelector).serializeArray();
            (0,index_all/* default */.Ay)(serializedArr).each(record => {
                out[record.name] = record.value;
            });

            return out;
        }
    };

    return module;
}());
;// ./src/js/utils/logger.js



/* harmony default export */ var logger = (function() {

    const module = {
        createLogger: function() {
            return {
                log: [],
                clear: function() {
                    this.log = [];
                },
                getFilteredLog: function() {
                    return (0,index_all/* default */.Ay)(this.log).filter(row => {
                        return (row.isMainParamsCalcInfo === true ||
                            row.isCalcInfo === true ||
                            row.isInfo === true ||
                            row.isTotalSumInfo === true);
                    });
                },
                pushMessageObj: function(messageObj) {
                    const logRow = {
                        message: messageObj.message,
                        isHeader: messageObj.isHeader,
                        isCalcInfo: messageObj.isCalcInfo,
                        isMainParamsCalcInfo: messageObj.isMainParamsCalcInfo,
                        isLine: messageObj.isLine,
                        isInfo: messageObj.isInfo,
                        isTotalSumInfo: messageObj.isTotalSumInfo
                    };

                    this.log.push(logRow);
                },
                line: function() {
                    this.pushMessageObj({ message: "--------------------", isLine: true });
                },
                header: function(message) {
                    this.pushMessageObj({ message: message, isHeader: true });
                },
                calcInfo: function(message) {
                    this.pushMessageObj({ message: message, isCalcInfo: true });
                },
                mainParamsCalcInfo: function(message) {
                    this.pushMessageObj({ message: message, isMainParamsCalcInfo: true });
                },
                totalSumInfo: function(message) {
                    this.pushMessageObj({ message: message, isTotalSumInfo: true });
                },
                info: function(message) {
                    this.pushMessageObj({ message: message, isInfo: true });
                }
            };
        }
    };

    return module;
}());
;// ./src/js/utils/cp.js



/* harmony default export */ var cp = (function() {
    let calculatorConfig;

    const module = {
        print: function(logger) {
            if (calculatorConfig.PRINT_LOG_TO_CONSOLE_ON !== true) {
                return;
            }

            (0,index_all/* default */.Ay)(logger.log).each(logRow => {
                console.log(logRow.message);
            });
        },
        init: function(calculatorConfigModule) {
            calculatorConfig = calculatorConfigModule;
        }
    };

    return module;
}());
;// ./src/js/utils/mailSender.js
/* harmony default export */ var mailSender = (function() {
    let templateHelper;
    let calculatorConfig;

    const getOrderMailBody = function(client, totalPrice, fileNames, logRows) {
        const data = {
            clientName: client.name,
            clientSurname: client.surname,
            clientPhone: client.phone,
            totalPrice: totalPrice,
            fileNames: fileNames,
            logRows: logRows
        };
        const html = templateHelper.getTemplateResult("order-mail", data);
        return html;
    };

    const module = {
        createOrderMailDataObj: function(client, totalPrice, fileNames, logRows, attachments) {
            return {
                SecureToken: calculatorConfig.SEND_ORDER_SECURE_TOKEN,
                To: calculatorConfig.SEND_ORDER_TO,
                From: calculatorConfig.SEND_ORDER_FROM,
                Subject: `${calculatorConfig.SEND_ORDER_SUBJECT} ${client.name} ${client.surname}`,
                Body: getOrderMailBody(client, totalPrice, fileNames, logRows),
                Attachments: attachments
            };
        },
        send: function(mailData) {
            const promise = Email.send(mailData);
            return promise;
        },
        init: function(templateHelperModule, calculatorConfigModule) {
            templateHelper = templateHelperModule;
            calculatorConfig = calculatorConfigModule;
        }
    };
    return module;
}());
;// ./src/js/utils/templateHelper.js




/* harmony default export */ var templateHelper = (function() {

    const templateDictionary = {
        compiledTemplates: [],
        get: function(templateId) {
            const keyPair = (0,index_all/* default */.Ay)(templateDictionary.compiledTemplates).find(item => {
                return item.id === templateId;
            });

            let compiledTemplate;
            if (keyPair) {
                compiledTemplate = keyPair.compiledTemplate;
            } else {
                const html = jquery_default()(`#${templateId}`).html();
                compiledTemplate = templateDictionary.add(templateId, html);
            }

            return compiledTemplate;
        },
        add: function(id, html) {
            const compiledTemplate = index_all/* default.template */.Ay.template(html);
            templateDictionary.compiledTemplates.push({ id: id, compiledTemplate: compiledTemplate });

            return compiledTemplate;
        }
    };

    const module = {
        getTemplateResult: function(templateId, data) {
            const result = templateDictionary.get(templateId);

            if (data !== undefined) {
                return result(data);
            }

            return result;
        }
    };

    return module;
}());
;// ./src/js/steps/panelSizeStep.js
﻿


/* harmony default export */ var panelSizeStep = (function() {

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
			let $radio = jquery_default()(`<div id="${element.id}" class="col-1 mr-4 mt-1">`);
			
			element.items.forEach(function(item, index){							
				let radioItemDiv = jquery_default()('<div class="custom-control custom-radio">');
				let checkedAtr = item.isSelected === true ? 'checked' : '';
                radioItemDiv.append(`<input id="${item.id}" type="radio" class="custom-control-input" name="${element.id}" ${checkedAtr} step-id="${stepId}"/>`)
                    .append(`<label for="${item.id}" class="custom-control-label">${item.title}</label>`);
				
				if (item.info !== undefined){
					let toolTip = orderStepRender.renderToolTip(item.info);
					radioItemDiv.append(toolTip);
				}
				
				$radio.append(radioItemDiv);
			});
			
			jquery_default()(`#${stepId}`)
				.append(
					jquery_default()('<div class="container mb-4 px-0">')
					.append(
						jquery_default()('<div class="row">')
							.append(
								$radio
							)
					)
					.append(
						jquery_default()('<div class="row">')
							.append(
								jquery_default()('<div class="col-12">')
									.append(
										jquery_default()(`<button id="panelSizeContinueBtn" type="button" class="btn btn-outline-primary btn-sm float-right" step-id="${stepId}">`)
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
	
	radioIdsWithEventAppendSizeElements:[],
	setRadioEventAppendSizeElements:function(elementId){
		module.radioIdsWithEventAppendSizeElements.push(elementId);
		
		jquery_default()(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
							
			let stepId = jquery_default()(this).attr('step-id');
			let itemId = jquery_default()(this).attr('id');
			let $itemParent = jquery_default()(this).parent();
			let panelCount = $itemParent.find(`label[for="${itemId}"]`).text();
			let radioId = jquery_default()(this).attr('name');				
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
		for(let i=0; i < module.radioIdsWithEventAppendSizeElements.length; i++){
				jquery_default()(document).off('change', `input:radio[name^="${module.radioIdsWithEventAppendSizeElements[i]}"]`);
			}
			
		module.radioIdsWithEventAppendSizeElements = [];
	},
	
	panelSizeContinueBtnEvent: 'panelSizeContinueBtn',
	setPanelSizeContinueBtnEvent: function(){
		jquery_default()(document).on('click', `#${module.panelSizeContinueBtnEvent}`, function () {
			//let stepId = $(this).attr('step-id');
			
			//let step = orderStepsHelper.getStepOrNull(stepId);
			calcHelper.recalcAll();
			
			orderStep.clearSteps();
			orderStep.renderAllSteps();
			
		});
	},
	removePanelSizeContinueBtnEventEvent: function(){
		jquery_default()(document).off('click', `#${module.panelSizeContinueBtnEvent}`);
	},
	
	renderPanelSizeElementRows: function(element, elementsGroupRowCount, stepId){
		let elementId = element.id;
		let $container = jquery_default()(`#${elementId}`).parent();
		let sizeElementGroupId = `size-element-specific-group-${elementId}`;
		
		let sizeElementGroup = jquery_default()(`<div id="${sizeElementGroupId}" class="col right">`);
		sizeElementGroup.appendTo($container);
		
		jquery_default()('<h8 class="card-subtitle mb-2 text-muted">Размер:</div>')
		.appendTo(sizeElementGroup);
		
		var $elementsGroupRowContainer = jquery_default()('<div class="container">');
		for(let i=1; i < (elementsGroupRowCount*1+1); i++){
			let enteredVal = element.enteredValues[i*1-1];
			let isHardenedChecked = enteredVal.hardening === true ? 'checked' : '';
			let hInvalidClass = (enteredVal.h === '') ? 'is-invalid' : '';
			let wInvalidClass = (enteredVal.w === '') ? 'is-invalid' : '';

			jquery_default()('<div class="row mt-1 ml-0 mb-0 mr-0">')
			.append(
				jquery_default()('<div class="col-5 p-0">')
					.append(jquery_default()('<label>').text(`Высота ${i}`))
					.append(
				jquery_default()(`<input type="number" class="numberInput ml-1 d-inline-block form-control form-control-sm ${hInvalidClass}" step-id="${stepId}" element-id="${elementId}" it-is="height" size-number="${enteredVal.number}" min="1" max="99999">`)
						.val(enteredVal.h)
					)
					.append(jquery_default()('<label class="blue-text ml-1">').text('мм'))
			)
			.append(
			jquery_default()('<div class="col-5 p-0">')
				.append(jquery_default()('<label class="ml-1">').text(`Длина ${i}`))
				.append(
				jquery_default()(`<input type="number" required class="numberInput ml-1 d-inline-block form-control form-control-sm ${wInvalidClass}" step-id="${stepId}" element-id="${elementId}" it-is="width" size-number="${enteredVal.number}" min="1" max="99999">`)
					.val(enteredVal.w)
				)
				.append(jquery_default()('<label class="blue-text ml-1">').text('мм'))
			)
			.append(
			jquery_default()('<div class="col-2 p-0">')
				.append(
					jquery_default()('<div class="custom-control custom-checkbox">')
						.append(`<input id="hardening-${enteredVal.number}" class="d-inline-block custom-control-input" type="checkbox" required step-id="${stepId}" element-id="${elementId
						}" it-is="hardening" size-number="${enteredVal.number}" ${isHardenedChecked}>`)
						.append(`<label class="custom-control-label" for="hardening-${enteredVal.number}">Закалка</label>`)
				)
			)
			.appendTo($elementsGroupRowContainer);
		}
		
		$elementsGroupRowContainer.appendTo(`#${sizeElementGroupId}`);
		
		module.setInputPanelSizeEventOutElements(elementId);
	},
	removePanelSizeElementRows: function(elementId){
		module.removeInputPanelSizeEventOutElement(elementId);
		
		let sizeElementGroupId = `size-element-specific-group-${elementId}`;
		jquery_default()(`#${sizeElementGroupId}`).remove();
	},
	inputPanelSizeEventElements:[],
	setInputPanelSizeEventOutElements:function(sizeElementGroupId){
		module.inputPanelSizeEventElements.push(sizeElementGroupId);
		
		jquery_default()(document).on('change', `input[element-id="${sizeElementGroupId}"]`, function (event) {
			let stepId = jquery_default()(this).attr('step-id');
			let elementId = jquery_default()(this).attr('element-id');
			let sizeNumber = jquery_default()(this).attr('size-number');
			let valueType = jquery_default()(this).attr('it-is');

			let val;
			if (valueType === 'hardening'){
				val = jquery_default()(this).is(':checked');
			}
			else {
				val = jquery_default()(this).val();
			}
			
			let step = orderStepsHelper.getStepOrNull(stepId);
			let element = orderStepsHelper.getStepElementOrNull(step, elementId);
			orderStepsHelper.savePanelSize(element, sizeNumber, valueType, val);
			calcHelper.recalcAll();
		});
		
	},
	removeInputPanelSizeEventOutElements:function(){
		for(let i=0; i < module.inputPanelSizeEventElements.length; i++){
				jquery_default()(document).off('change', `input[element-id="${module.inputPanelSizeEventElements[i]}"]`);
		}
			
		module.inputPanelSizeEventElements = [];
	},
	removeInputPanelSizeEventOutElement:function(elementId){
		jquery_default()(document).off('change', `input[element-id="${elementId}"]`);
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
;// ./src/js/steps/railAndSocketStep.js
﻿


/* harmony default export */ var railAndSocketStep = (function(){
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
                let $container = jquery_default()('<div class="container mb-4 px-0">');
                let $row = jquery_default()('<div class="row">');
                let $radio = jquery_default()(`<div id="${element.id}" class="ml-3 mt-1">`);
                $radio.appendTo($row);

                $container.append($row);
                jquery_default()(`#${stepId}`).append($container);

                element.items.forEach(function (item, index) {
                    let radioItemDiv = jquery_default()('<div class="custom-control custom-radio">');
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
            let $container = jquery_default()(`#${elementId}`).parent();
            let installationOfRailsCountId = `sockets-count-${elementId}`;

            let sizeElementGroup = jquery_default()(`<div id="${installationOfRailsCountId}" class="mt-3">`);
            sizeElementGroup.appendTo($container);

            var $elementsGroupRowContainer = jquery_default()('<div class="row">');
            for (let i = 0; i < element.items.length; i++) {
                let item = element.items[i];

                if (item.title === 'Да') {
                    let displayCssClass = item.isSelected === true ? 'd-inline-block' : 'd-none';

                    item.socketsBlocs.forEach(function(socketsBlok, index) {
                        let checkedAtr = socketsBlok.isSelected === true ? 'checked' : '';
                        let checkboxEnteredValueDiv =
                            jquery_default()('<div class="image-checkbox-item custom-control custom-checkbox my-1 d-inline-block">')
                                .append(
                                    `<input id="${item.id}-entered-value-${socketsBlok.number
                                    }" type="checkbox" class="custom-control-input" name="${element.id}" ${checkedAtr
                                    } step-id="${stepId}" element-id="${element.id}" item-id="${item.id
                                    }" socket-block-number="${socketsBlok.number}" />`);

                        let enteredValueLabel =
                            jquery_default()(`<label for="${item.id}-entered-value-${socketsBlok.number
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
                                jquery_default()(`<input id="inputSocketsCount-${socketsBlok.number
                                    }" type="number" class="small-numberInput ml-2 align-bottom ${
                                    displayBlockCountCssClass}" step-id="${stepId}" element-id="${
                                    elementId}" item-id="${item.id}" socket-block-number=${socketsBlok.number
                                    } min="1" max="99">`)
                                .val(socketsBlok.blockCount)
                            )
                            .append(
                                jquery_default()(`<label id="labelSocketsCount-${socketsBlok.number
                                    }" class="blue-text ml-1 align-bottom ${displayBlockCountCssClass}">`)
                                .text('блок(ов)')
                            );


                        let blockWitPhotoPrintDiv =
                            jquery_default()(`<div id="divSocketsPrint-${socketsBlok.number
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


                        jquery_default()(`<div class="sockets-count-blok col-12 p-0 mt-1 ml-0 mb-0 mr-0 ${displayCssClass}">`)
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
                jquery_default()('.sockets-count-blok').removeClass('d-none');
                jquery_default()('.sockets-count-blok').addClass('d-inline-block');
            } else {
                jquery_default()('.sockets-count-blok').removeClass('d-inline-block');
                jquery_default()('.sockets-count-blok').addClass('d-none');
            }
        },
        eventSocketsCountElements: [],
        setEventSocketsCountElements: function(elementId) {
            module.eventSocketsCountElements.push(elementId);
            jquery_default()(document).on('change',
                `input:radio[name^="${elementId}"]`,
                function(event) {
                    let stepId = jquery_default()(this).attr('step-id');
                    let elementId = jquery_default()(this).attr('name');
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
                jquery_default()(document).off('change', `input:radio[name^="${module.eventSocketsCountElements[i]}"]`);
            }

            module.eventSocketsCountElements = [];
        },

        eventSocketsBlockElements: [],
        setEventSocketsBlockElements: function(elementId) {
            module.eventSocketsBlockElements.push(elementId);
            jquery_default()(document).on('change', `input:checkbox[name^="${elementId}"]`, function(event) {
                let isSelected = jquery_default()(this).is(':checked');
                let socketBlock = module.getSocketBlock(jquery_default()(this));

                socketBlock.isSelected = isSelected;

                module.displaySocketBlokCountInputCount(socketBlock.number, isSelected);
                calcHelper.recalcAll();
            });
        },
        removeSocketsBlockElements: function() {
            for (let i = 0; i < module.eventSocketsBlockElements.length; i++) {
                jquery_default()(document).off('change', `input:checkbox[name^="${module.eventSocketsBlockElements[i]}"]`);
            }

            module.eventSocketsBlockElements = [];
        },
        displaySocketBlokCountInputCount: function(socketsBlokNumber, show) {
            if (show === true) {
                jquery_default()(`#inputSocketsCount-${socketsBlokNumber}`)
                    .removeClass('d-none')
                    .addClass('d-inline-block');

                jquery_default()(`#labelSocketsCount-${socketsBlokNumber}`)
                    .removeClass('d-none')
                    .addClass('d-inline-block');

                jquery_default()(`#inputSocketsPrint-${socketsBlokNumber}`)
                    .removeClass('d-none')
                    .addClass('d-inline-block');

                jquery_default()(`#labelSocketsPrint-${socketsBlokNumber}`)
                    .removeClass('d-none')
                    .addClass('d-inline-block');

                jquery_default()(`#divSocketsPrint-${socketsBlokNumber}`)
                    .removeClass('d-none')
                    .addClass('d-inline-block');

            } else {
                jquery_default()(`#inputSocketsCount-${socketsBlokNumber}`)
                    .removeClass('d-inline-block')
                    .addClass('d-none');

                jquery_default()(`#labelSocketsCount-${socketsBlokNumber}`)
                    .removeClass('d-inline-block')
                    .addClass('d-none');

                jquery_default()(`#inputSocketsPrint-${socketsBlokNumber}`)
                    .removeClass('d-inline-block')
                    .addClass('d-none');

                jquery_default()(`#labelSocketsPrint-${socketsBlokNumber}`)
                    .removeClass('d-inline-block')
                    .addClass('d-none');

                jquery_default()(`#divSocketsPrint-${socketsBlokNumber}`)
                    .removeClass('d-inline-block')
                    .addClass('d-none');
            }
        },

        eventSocketsBlockNeedPhotoPrintingElements: [],
        setEventSocketsBlockNeedPhotoPrintingElements: function(socketBlockNumber) {
            module.eventSocketsBlockNeedPhotoPrintingElements.push(`inputSocketsPrint-${socketBlockNumber}`);
            jquery_default()(document).on('change',`#inputSocketsPrint-${socketBlockNumber}`, function(event) {
                let needSocketPrinting = jquery_default()(this).is(':checked');

                let socketBlock = module.getSocketBlock(jquery_default()(this));
                socketBlock.needPhotoPrinting = needSocketPrinting;

                calcHelper.recalcAll();
            });
        },
        removeSocketsBlockNeedPhotoPrintingElements: function() {
            for (let i = 0; i < module.eventSocketsBlockNeedPhotoPrintingElements.length; i++) {
                jquery_default()(document).off('change', `#"${module.eventSocketsBlockNeedPhotoPrintingElements[i]}`);
            }

            module.eventSocketsBlockNeedPhotoPrintingElements = [];
        },


        eventInputSocketsCount: [],
        setEventInputSocketsCount: function(socketsBlokNumber) {
            module.eventInputSocketsCount.push(`#inputSocketsCount-${socketsBlokNumber}`);
            jquery_default()(document).on('change',`#inputSocketsCount-${socketsBlokNumber}`, function (event) {
                let blockCount = jquery_default()(this).val();

                let socketBlock = module.getSocketBlock(jquery_default()(this));
                socketBlock.blockCount = blockCount;
                   
                calcHelper.recalcAll();
            });
        },
        removeEventInputSocketsCount: function() {
            for (let i = 0; i < module.eventInputSocketsCount.length; i++) {
                jquery_default()(document).off('change', `#inputSocketsCount-${module.eventInputSocketsCount[i]}`);
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
;// ./src/js/steps/totalPriceStep.js
﻿


/* harmony default export */ var totalPriceStep = (function() {
    let templateHelper;
    let orderStepsHelper;
    let mailSender;
    let calculatorConfig;
    let calcHelper;
    let miscHelper;

    const drawingManager = {
        drawingCount: 1,
        currentNumber: 0,
        totalFilesSizeInBytes: 0
    };

    const getBase64String = function(inputElement) {
        const deferred = jquery_default().Deferred();
        const files = inputElement.get(0).files;
        if (files && files[0]) {
            const fr = new FileReader();
            fr.onload = function(e) {
                deferred.resolve(e.target.result);
            };
            fr.readAsDataURL(files[0]);
        } else {
            deferred.resolve(undefined);
        }

        return deferred.promise();
    };

    const getFileSize = function($fileInput) {
        const f = $fileInput.files[0];
        if (f.size !== undefined) {
            return f.size;
        }

        return f.fileSize;
    };

    const getAttachmentObj = function($fileInput) {
        return {
            name: $fileInput.attr("file-name"),
            data: $fileInput.attr("base64-file-string")
        };
    };

    const getAttachments = function($fileInputs) {
        const attachments = [];
        const filteredInputs = (0,index_all/* default */.Ay)($fileInputs).filter(fileInput => {
            const $fileInput = jquery_default()(fileInput);
            return $fileInput.attr("file-name") != undefined && $fileInput.attr("file-name") !== "";
        });

        (0,index_all/* default */.Ay)(filteredInputs).each(fileInput => {
            const $fileInput = jquery_default()(fileInput);
            const attachment = getAttachmentObj($fileInput);
            attachments.push(attachment);
        });

        return attachments;
    };

    const appendClientDrawingBlock = function() {
        drawingManager.drawingCount = drawingManager.drawingCount + 1;
        drawingManager.currentNumber = drawingManager.currentNumber + 1;

        const data = {
            number: drawingManager.currentNumber
        };
        const html = templateHelper.getTemplateResult("file-input-block", data);
        jquery_default()("#file-input-block-container").append(html);
    };

    const hideSendForm = function() {
        jquery_default()("#orderBtn").removeClass("invisible").addClass("visible");
        jquery_default()("#sendOrderForm").removeClass("visible").addClass("invisible");
    };

    const sendOrderEmail = function() {
        const client = miscHelper.getFormData("#sendOrderForm");
        const totalPrice = jquery_default()("#totalPrice").text();
        const log = calcHelper.getLogger().getFilteredLog();
        const attachments = getAttachments(jquery_default()(".client-drawing"));

       const mappedFilenames = (0,index_all/* default */.Ay)(jquery_default()(".client-drawing")).map(fileInput => {
                const fileName = jquery_default()(fileInput).attr("file-name");
                return fileName;
            });

       const fileNames = (0,index_all/* default */.Ay)(mappedFilenames).filter(function(fileName) {
                return (fileName != undefined && fileName !== "");
            });

       const mailData = mailSender.createOrderMailDataObj(client, totalPrice, fileNames, log, attachments);

        jquery_default()("#sendProgressNotification").fadeIn(2000,
            function() {
                const promise = mailSender.send(mailData);
                promise.then(
                    message => {
                        jquery_default()("#sendProgressNotification").fadeOut(500);
                        if (message === "OK") {
                            jquery_default()("#sendFinishNotification")
                                .fadeIn(500,
                                    function() {
                                        hideSendForm();
                                    })
                                .delay(5000)
                                .fadeOut(2000, "linear");
                        } else {
                            console.log(`В процессе отправки произошла ошибка. Ошибка: ${message}`);
                            jquery_default()("#sendErrorText").text(message);

                            jquery_default()("#sendErrorNotification")
                                .fadeIn(500)
                                .delay(5000)
                                .fadeOut(2000, "linear");
                        }

                    }
                );
            });
    };


    const module = {
        totalPriceBlock: function(element, stepId) {
            if (element.totalPriceBlock !== undefined) {
                const data = {
                    stepId: stepId,
                    elementId: element.id,
                    totalPriceBlock: element.totalPriceBlock,
                    showOrderButton: calculatorConfig.SHOW_ORDER_BUTTON
                };
                const html = templateHelper.getTemplateResult("total-price-block", data);
                jquery_default()(`#${stepId}`).append(html);

                module.setOrderBtnEvent();
                module.setOrderFormSubmitEvent();

                drawingManager.drawingCount = 1;
                drawingManager.currentNumber = 0;
                module.setClientDrawingChangeEvent();
            }
        },
        setTotalPrice: function(totalPrice) {
            jquery_default()("#totalPrice").text(totalPrice.toFixed(2));
        },
        setOrderBtnEvent: function() {
            jquery_default()(document).on("click",
                "#orderBtn",
                function() {
                    const stepId = jquery_default()(this).attr("step-id");
                    const elementId = jquery_default()(this).attr("element-id");

                    const step = orderStepsHelper.getStepOrNull(stepId);
                    const element = orderStepsHelper.getStepElementOrNull(step, elementId);

                    element.totalPriceBlock.orderSendBlock.showSendForm = true;

                    module.showSendForm();
                });
        },
        removeOrderBtnEvent: function() {
            jquery_default()(document).off("click", "#orderBtn");
        },
        showSendForm: function() {
            jquery_default()("#orderBtn")
                .removeClass("visible")
                .addClass("invisible");

            jquery_default()("#sendOrderForm")
                .removeClass("invisible")
                .addClass("visible");
        },
        setClientDrawingChangeEvent: function() {

            jquery_default()(document).on("change",
                ".client-drawing",
                function() {
                    const $fileInput = jquery_default()(this);
                    let fileName = $fileInput.val().split("\\").pop();

                    const idxDot = fileName.lastIndexOf(".") + 1;
                    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                    if (extFile !== "jpg" && extFile !== "jpeg" && extFile !== "pdf") {
                        alert("Можно загружать только jpg/jpeg или pdf файлы!");
                        $fileInput.val("");
                        return;
                    }

                    const fileSize = getFileSize($fileInput[0]);

                    if (fileSize > calculatorConfig.CLIENT_DRAWING_TOTAL_FILES_MAX_SIZE_IN_BYTES) {
                        alert(`Размер файла не может превышать ${calculatorConfig
                            .CLIENT_DRAWING_TOTAL_FILES_MAX_SIZE_IN_BYTES /
                            1000000} Мб`);
                        $fileInput.val("");
                        return;
                    }

                    if (drawingManager.totalFilesSizeInBytes + fileSize >
                        calculatorConfig.CLIENT_DRAWING_TOTAL_FILES_MAX_SIZE_IN_BYTES) {
                        alert(`Общий объём приложенных файлов не может превышать ${calculatorConfig
                            .CLIENT_DRAWING_TOTAL_FILES_MAX_SIZE_IN_BYTES /
                            1000000} Мб`);
                        $fileInput.val("");
                        return;
                    }

                    //if need replace file
                    let currentFileSize = $fileInput.attr("file-size-in-bytes");
                    if (currentFileSize === undefined) {
                        currentFileSize = 0;
                    }
                    drawingManager.totalFilesSizeInBytes = drawingManager.totalFilesSizeInBytes - currentFileSize;
                    $fileInput.attr("file-size-in-bytes", 0);

                    getBase64String($fileInput).done(function(base64Data) {
                        const inputNumber = $fileInput.attr("input-number");
                        fileName = `${inputNumber}-${fileName}`;

                        $fileInput
                            .attr("base64-file-string", base64Data)
                            .attr("file-name", fileName)
                            .attr("file-size-in-bytes", fileSize);

                        drawingManager.totalFilesSizeInBytes = drawingManager.totalFilesSizeInBytes + fileSize;

                        jquery_default()(`#client-drawing-label-${inputNumber}`)
                            .addClass("selected")
                            .html(fileName);

                        const emptyInputCount = (0,index_all/* default */.Ay)(jquery_default()(".client-drawing")).filter(input => {
                            return !input.value;
                        }).length;

                        if (drawingManager.drawingCount < calculatorConfig.CLIENT_DRAWING_FILES_MAX_COUNT &&
                            emptyInputCount === 0) {
                            appendClientDrawingBlock();
                        }
                    });
                });

            jquery_default()(document).on("click",
                ".file-input-block-remove-btn",
                function() {
                    const inputNumber = jquery_default()(this).attr("input-number");

                    let fileSize = jquery_default()(`#client-drawing-${inputNumber}`).attr("file-size-in-bytes");
                    if (fileSize === undefined) {
                        fileSize = 0;
                    }

                    jquery_default()(`#file-input-block-${inputNumber}`).remove();
                    drawingManager.drawingCount = drawingManager.drawingCount - 1;
                    drawingManager.totalFilesSizeInBytes = drawingManager.totalFilesSizeInBytes - fileSize;

                    const emptyInputCount = (0,index_all/* default */.Ay)(jquery_default()(".client-drawing")).filter(input => {
                            return !input.value;
                        }).length;

                    if (emptyInputCount === 0) {
                        appendClientDrawingBlock();
                    }
                });

            jquery_default()(document).on("click",
                ".file-input-block-clear-btn",
                function() {
                    const inputNumber = jquery_default()(this).attr("input-number");

                    let fileSize = jquery_default()(`#client-drawing-${inputNumber}`).attr("file-size-in-bytes");

                    if (fileSize === undefined) {
                        fileSize = 0;
                    }
                    drawingManager.totalFilesSizeInBytes = drawingManager.totalFilesSizeInBytes - fileSize;

                    jquery_default()(`#client-drawing-${inputNumber}`)
                        .val("")
                        .attr("base64-file-string", "")
                        .attr("file-name", "")
                        .attr("file-size-in-bytes", 0);

                    jquery_default()(`#client-drawing-label-${inputNumber}`)
                        .text("Выбрать файл .jpg .jpeg .pdf");
                });
        },
        removeClientDrawingChangeEvents: function() {
            jquery_default()(document).off("change", ".client-drawing");
            jquery_default()(document).off("click", ".file-input-block-remove-btn");
        },
        setOrderFormSubmitEvent: function() {
            jquery_default()("#sendOrderForm").validate({
                rules: {
                    name: {
                        required: true,
                        rangelength: [2, 50]
                    },
                    surname: {
                        required: true,
                        rangelength: [2, 50]
                    },
                    phone: {
                        required: true,
                        latvianPhone: true
                    }
                },
                showErrors: function(errorMap, errorList) {
                    jquery_default()(".tooltip-form-error").remove();

                    (0,index_all/* default */.Ay)(errorList).each(item => {
                        const errorContainerId = `tooltip-form-error-container-id-${item.element.name}`;
                        const errorLabelId = `tooltip-form-error-label-id-${item.element.name}`;

                        if (jquery_default()(`#${errorContainerId}`).length === 0) {
                            const data = {
                                containerId: errorContainerId,
                                labelId: errorLabelId,
                                errorMessage: item.message
                            };
                            const html = templateHelper.getTemplateResult("tooltip-form-error", data);
                            jquery_default()(item.element).parent().append(html);
                        } else {
                            jquery_default()(`#${errorLabelId}`).html(item.message);
                        }
                    });
                }
            });

            jquery_default()(document).on("submit",
                "#sendOrderForm",
                function(event) {
                    event.preventDefault();
                    sendOrderEmail();
                    return false;
                });
        },
        removeOrderFormSubmitEvent: function() {
            jquery_default()(document).off("submit", "#sendOrderForm");
        },

        init: function(templateHelperModule,
            orderStepsHelperModule,
            mailSenderModule,
            calculatorConfigModule,
            calcHelperModule,
            miscHelperModule) {
            templateHelper = templateHelperModule;
            orderStepsHelper = orderStepsHelperModule;
            mailSender = mailSenderModule;
            calculatorConfig = calculatorConfigModule;
            calcHelper = calcHelperModule;
            miscHelper = miscHelperModule;
        }
    };

    return module;
}());
;// ./src/js/steps/orderStep.js
﻿



/* harmony default export */ var orderStep = (function () {
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

			let $column = jquery_default()('<div>');
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

			let $orderStepRender = jquery_default()('<div class="order-step">')
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
			jquery_default()(`#${_stepId}`).append(html);

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
			let elementTitleElement = jquery_default()(`<h6 class="card-subtitle mb-2 text-muted">${elementTitle}</div>`);

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
				jquery_default()(`<p class="card-text text-left text-muted">${element.textBlock}</p>`).appendTo(`#${_stepId}`);
			}
		},
		textBlockCenter: function (element) {
			if (element.textBlockCenter !== undefined) {
				let data = {
					text: element.textBlockCenter
				};

				let html = templateHelper.getTemplateResult("text-block-center", data);
				jquery_default()(`#${_stepId}`).append(html);
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
				let $container = jquery_default()('<div class="container mb-4 px-0">');
				let $row = jquery_default()('<div class="row">');
				let $radio = jquery_default()(`<div id="${element.id}" class="col">`);
				$radio.appendTo($row);

				$container.append($row);
				jquery_default()(`#${_stepId}`).append($container);

				element.items.forEach(function (item, index) {
					let radioItemDiv = jquery_default()('<div class="custom-control custom-radio">');
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

			jquery_default()(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = jquery_default()(this).attr('step-id');
				let itemId = jquery_default()(this).attr('id');
				let elementId = jquery_default()(this).attr('name');
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

			jquery_default()(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = jquery_default()(this).attr('step-id');
				let itemId = jquery_default()(this).attr('id');
				let elementId = jquery_default()(this).attr('name');
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
				jquery_default()(document).off('change', `input:radio[name^="${this.radioIdsWithEventRefreshSteps[i]}"]`);
			}

			this.radioIdsWithEventRefreshSteps = [];
		},
		renderRadioHandleTypes: function (element) {
			let currentOrderStep = this;

			if (element.title !== undefined) {
				currentOrderStep.renderElementTitle(element.title, element.info);
			}

			if (element.items !== undefined) {
				let $container = jquery_default()('<div class="container mb-4 px-0">');
				let $row = jquery_default()('<div class="row">');

				$container.append($row);
				jquery_default()(`#${_stepId}`).append($container);

				element.items.forEach(function (item, index) {
					let radioItemDiv = jquery_default()('<div class="image-radio-item custom-control custom-radio col-4 my-1">');
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
			jquery_default()(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = jquery_default()(this).attr('step-id');
				let elementId = jquery_default()(this).attr('name');
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
				jquery_default()(document).off('change', `input:radio[name^="${this.eventRadioHandleTypesElements[i]}"]`);
			}

			this.eventRadioHandleTypesElements = [];
		},


		renderRadioCabinTypes: function (element) {
			let currentOrderStep = this;

			if (element.title !== undefined) {
				currentOrderStep.renderElementTitle(element.title, element.info);
			}

			if (element.items !== undefined) {

				let $mainRow = jquery_default()('<div class="row" mainRow="0">');

				let $mainRowColumn1 = jquery_default()('<div class="col-8">');
				$mainRowColumn1.appendTo($mainRow);

				let $mainRowColumn2 = jquery_default()('<div id="selected-cabin-type-data" class="col-4">');
				$mainRowColumn2.appendTo($mainRow);

				let $row = jquery_default()('<div class="row">');
				$mainRowColumn1.append($row);

				jquery_default()(`#${_stepId}`).append($mainRow);

				element.items.forEach(function (item, index) {
					let $radioItemDiv = jquery_default()('<div class="image-radio-item custom-control custom-radio col-3 my-1 mx-0">');
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

			jquery_default()('#selected-cabin-type-data').empty();

			jquery_default()('<h6 class="card-subtitle mb-0 text-muted">')
				.text('Тип перегородки:')
				.appendTo('#selected-cabin-type-data');

			if (selectedItem.title !== undefined) {
				jquery_default()('<span class="blue-text">')
					.text(selectedItem.title)
					.appendTo('#selected-cabin-type-data');
			}

			jquery_default()('<h6 class="card-subtitle mt-2 text-muted">')
				.text('Размер:')
				.appendTo('#selected-cabin-type-data');

			selectedItem.sizes.forEach(function (size, index) {
				let sizeBlock = jquery_default()('<div class="mt-3">');
				sizeBlock.appendTo('#selected-cabin-type-data');

				let maxValueAtr = '';
				if (size.maxValue !== undefined) {
					jquery_default()('<div>')
						.append(
							jquery_default()('<span class="blue-text mr-1 font-italic">').text('До')
						)
						.append(
							jquery_default()('<span class="blue-text mr-1 font-italic">').text(size.maxValue)
						)
						.append(
							jquery_default()('<span class="blue-text ml-1 font-italic">').text('мм')
						)
						.appendTo(sizeBlock);

					maxValueAtr = `max-val="${size.maxValue}"`;
				}

				jquery_default()('<div>')
					.append(
						jquery_default()('<span class="mr-1">').text(size.title)
					)
					.append(
						jquery_default()('<span class="blue-text mr-1">').text(size.name)
					)
					.append(
						jquery_default()(`<input id="${size.name}" step-id="${stepId}" element-id="${elementId}" item-id="${selectedItem.id
							}" type="number" class="numberInput form-control form-control-sm" ${maxValueAtr} min="1" max="99999">`)
							.val(size.enteredValue)
					)
					.appendTo(sizeBlock);

				if (size.maxValue !== undefined) {
					jquery_default()('<div class="invalid-feedback">')
						.append(`Значение должно быть меньше или равно ${size.maxValue}`)
						.appendTo(sizeBlock);
				}

				orderStepRender.setEventFocusOutCabinTypeSize(size.name);
			});

			orderStepRender.renderAdditionalParameters(stepId, elementId, selectedItem);
		},
		renderAdditionalParameters: function (stepId, elementId, selectedItem) {
			if (selectedItem.additionalParameters !== undefined) {
				let $row = jquery_default()('<div class="row">')
					.appendTo('#selected-cabin-type-data')

				let $radioItemDiv = jquery_default()('<div class="col-12 my-1 mx-0">');
				$radioItemDiv
					.append(
						jquery_default()('<h6 class="card-subtitle mt-2 text-muted">').text(selectedItem.additionalParameters[0].title)
					);

				selectedItem.additionalParameters[0].items.forEach(function (additionalItem, index) {
					let checkedAtr = additionalItem.isSelected === true ? 'checked' : '';

					jquery_default()('<div class="custom-control custom-radio">')
						.append(
							jquery_default()(`<input id="${additionalItem.id}" type="radio" class="custom-control-input" name="${selectedItem.additionalParameters[0].id}" ${checkedAtr} item-id="${selectedItem.id}" element-id="${elementId
								}"  step-id="${stepId}"/>`)
						)
						.append(
							jquery_default()(`<label for="${additionalItem.id}" class="custom-control-label">${additionalItem.title}</label>`)
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
			jquery_default()(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = jquery_default()(this).attr('step-id');
				let elementId = jquery_default()(this).attr('name');
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
				jquery_default()(document).off('change', `input:radio[name^="${this.eventCabinTypesElements[i]}"]`);
			}

			this.eventCabinTypesElements = [];
		},
		eventFocusOutCabinTypeSizes: [],
		setEventFocusOutCabinTypeSize(sizeName) {
			this.eventFocusOutCabinTypeSizes.push(sizeName);
			jquery_default()(document).on('focusout', `#${sizeName}`, function (event) {
				let stepId = jquery_default()(this).attr('step-id');
				let elementId = jquery_default()(this).attr('element-id');
				let itemId = jquery_default()(this).attr('item-id');
				let _sizeName = this.id;
				let maxValueAtr = jquery_default()(this).attr('max-val');

				if (maxValueAtr != undefined && maxValueAtr * 1 < this.value * 1) {
					jquery_default()(this).addClass('is-invalid');
					return;
				}
				else {
					jquery_default()(this).removeClass('is-invalid');
				}

				let step = orderStepsHelper.getStepOrNull(stepId);
				let element = orderStepsHelper.getStepElementOrNull(step, elementId);

				orderStepsHelper.saveCabinTypesSize(element, itemId, _sizeName, this.value);
				calcHelper.recalcAll();
			});
		},
		removeEventFocusOutCabinTypeSize() {
			for (let i = 0; i < this.eventFocusOutCabinTypeSizes.length; i++) {
				jquery_default()(document).off('focusout', `input:["#${this.eventFocusOutCabinTypeSizes[i]}"]`);
			}

			this.eventFocusOutCabinTypeSizes = [];
		},
		eventChangeCabinTypesAdditionalParameters: [],
		setEventChangeCabinTypesAdditionalParameters(elementId) {
			this.eventChangeCabinTypesAdditionalParameters.push(elementId);
			jquery_default()(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
				let stepId = jquery_default()(this).attr('step-id');
				let elementId = jquery_default()(this).attr('element-id');
				let itemId = jquery_default()(this).attr('item-id');
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
				jquery_default()(document).off('change', `#${this.eventChangeCabinTypesAdditionalParameters[i]}`);
			}

			this.eventChangeCabinTypesAdditionalParameters = [];
		},


		renderSlidingDoorTypes: function (element) {
			let currentOrderStep = this;

			if (element.title !== undefined) {
				currentOrderStep.renderElementTitle(element.title, element.info);
			}

			if (element.items !== undefined) {

				let $mainRow = jquery_default()('<div class="row" mainRow="0">');

				let $mainRowColumn1 = jquery_default()('<div class="col-6">');
				$mainRowColumn1.appendTo($mainRow);

				let $mainRowColumn2 = jquery_default()('<div id="selected-cabin-type-data" class="col-6">');
				$mainRowColumn2.appendTo($mainRow);

				let $row = jquery_default()('<div class="row">');
				$mainRowColumn1.append($row);

				jquery_default()(`#${_stepId}`).append($mainRow);

				element.items.forEach(function (item, index) {
					let $radioItemDiv = jquery_default()('<div class="image-radio-item custom-control custom-radio col-12 my-1 mx-0">');
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

				let $mainRow = jquery_default()('<div class="row" mainRow="0">');

				let $mainRowColumn1 = jquery_default()('<div class="col-6">');
				$mainRowColumn1.appendTo($mainRow);

				let $mainRowColumn2 = jquery_default()('<div id="selected-cabin-type-data" class="col-6">');
				$mainRowColumn2.appendTo($mainRow);

				let $row = jquery_default()('<div class="row">');
				$mainRowColumn1.append($row);

				jquery_default()(`#${_stepId}`).append($mainRow);

				element.items.forEach(function (item, index) {
					let $radioItemDiv = jquery_default()('<div class="image-radio-item custom-control custom-radio col-12 my-1 mx-0">');
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
			jquery_default()('[data-toggle="tooltip-white"]').tooltip();
		},
		removeTooltipEvents: function () {
			jquery_default()('[data-toggle="tooltip-white"]').off('.tooltip');
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

				if (jquery_default().isArray(step.stepElements)) {
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

			jquery_default()('.calculator').empty();
		},
		setTotalPrice: function (totalPrice) {
			totalPriceStep.setTotalPrice(totalPrice);
		},

		orderStepRender: orderStepRender

	};

	return module;
}());
;// ./src/js/steps/orderSteps.js
﻿


/* harmony default export */ var orderSteps = (function () {
    let calculatorConfig;
    let orderSteps;

    let getHandleTypeStep = function (stepId, itemCount) {
        let handleTypeStepElements = [{
            id: `element-98-2-${stepId}`,
            itemChange: 'eventHandleTypes',
            items: []
        }];

        for (let i = 1; i < itemCount + 1; i++) {
            let item = {
                id: `item-98-2-${i}-${stepId}`,
                title: i.toString()
            };

            handleTypeStepElements[0].items.push(item);
        }

        return {
            id: stepId,
            title: 'Тип ручки',
            stepElements: handleTypeStepElements
        }
    };

    let printingTypeStep = function (stepId, photoPrintingPrice, monochromaticPaintingPrice) {
        return {
            id: stepId,
            title: 'Вид печати',
            doubleWidthSizeInMiddle: true,
            calcFunc: 'printingTypeStepCalc',
            stepElements: [
                {
                    id: `element-34-${stepId}`,
                    items: [
                        {
                            id: `item-35-${stepId}`,
                            title: 'Фотопечать',
                            info: 'Фотопечать на стекле используется в оформлении дизайна интерьера и расширяет спектр применяемых стилевых решений.',
                            isSelected: true,
                            price: photoPrintingPrice,
                            photoPrintingDesignPrice: calculatorConfig.SKINALI_PHOTO_PRINTING_DESIGN_PRICE
                        },
                        {
                            id: `item-36-${stepId}`,
                            title: 'Однотонная краска',
                            info: 'Цветное изображение на поверхности стекла. Широко используется в оформлении дизайна интерьера и расширяет спектр применяемых стилевых решений. ',
                            price: monochromaticPaintingPrice
                        },
                        {
                            id: `item-37-${stepId}`,
                            title: 'Без печати',
                            price: 0.00
                        }
                    ]
                },
                {
                    id: `element-38-${stepId}`,
                    textBlock: 'Рисунок на стекло может наносить несколькими способами. Или посредством нанесения на стекло пескоструйной обработки или посредством химического матирования. Цена за квадратный метр может меняться от способа нанесения рисунка и сложности наносимого рисунка'
                }
            ]
        }
    }

    let glassThicknessStep = function (stepId) {
        return {
            id: stepId,
            title: 'Толщина стекла',
            stepElements: [
                {
                    id: `element-79-${stepId}`,
                    items: [
                        {
                            id: `item-80-${stepId}`,
                            title: '8 мм',
                            isSelected: true
                        },
                        {
                            id: `item-81-${stepId}`,
                            title: '10 мм'
                        }
                    ]
                },
                {
                    id: `element-82-${stepId}`,
                    textBlock: 'От выбранной вами толщины будет зависеть не только цена, но и прочность изделия.'
                }
            ]
        }
    }

    let glassTypeStep = function (stepId) {
        return {
            id: stepId,
            title: 'Тип стекла',
            stepElements: [
                {
                    id: `element-10-${stepId}`,
                    items: [
                        {
                            id: `item-11-${stepId}`,
                            title: 'Прозрачное',
                            isSelected: true
                        },
                        {
                            id: `item-12-${stepId}`,
                            title: 'Матовое'
                        },
                        {
                            id: `item-13-${stepId}`,
                            title: 'Бронзовое'
                        },
                        {
                            id: `item-14-${stepId}`,
                            title: 'Оптивайт'
                        },
                        {
                            id: `item-15-${stepId}`,
                            title: 'Серое'
                        }
                    ]
                }
            ]
        }
    }

    let glassType2Step = function (stepId) {
        return {
            id: stepId,
            title: 'Тип стекла',
            calcFunc: 'priceMultiplyByAreaSizeCalc',
            stepElements: [
                {
                    id: `element-1-${stepId}`,
                    items: [{
                        id: `item-31-${stepId}`,
                        title: 'Обычное',
                        isSelected: true,
                        price: calculatorConfig.SKINALI_NORMAL_GLASS_TYPE_PRICE,
                        info: 'Имеет в срезе зеленоватый оттенок. Данный зеленоватый оттенок может искажать цвет нанесенного на стекла изображения фотопечати или иным способом нанесенных изображений'
                    },
                    {
                        id: `item-32-${stepId}`,
                        title: 'Осветленное',
                        price: calculatorConfig.SKINALI_CLARIFIED_GLASS_TYPE_PRICE,
                        info: 'Характеризуется стопроцентной прозрачностью, а потому способно точно передавать изображение. Однако стоимость данного стекла значительно дороже обычного. '
                    }
                    ]
                }
            ]
        }
    }

    let deliveryStep = function (stepId, price) {
        return {
            id: stepId,
            title: 'Доставка',
            calcFunc: 'defaultCalc',
            stepElements: [
                {
                    id: `element-1-${stepId}`,
                    items: [
                        {
                            id: `item-1-element-1-${stepId}`,
                            title: 'Да',
                            price: price
                        },
                        {
                            id: `item-2-element-1-${stepId}`,
                            title: 'Нет',
                            isSelected: true
                        }
                    ]
                }
            ]
        }
    }

    let installationStep = function (stepId, price) {
        return {
            id: stepId,
            title: 'Монтаж',
            doubleWidthSizeInMiddle: true,
            calcFunc: 'priceMultiplyByAreaSizeCalc',
            stepElements: [
                {
                    id: `element-1-${stepId}`,
                    items: [
                        {
                            id: `item-1-element-1-${stepId}`,
                            title: 'Надо',
                            price: price
                        },
                        {
                            id: `item-2-element-1-${stepId}`,
                            title: 'Я сам поставлю',
                            isSelected: true
                        }
                    ]
                }
            ]
        }
    }

    let metringAndInstallationStep = function (stepId, metringPrice, installationPrice) {
        return {
            id: stepId,
            title: 'Замер / Монтаж',
            calcFunc: 'metringAndInstallationPriceCalc',
            stepElements: [
                {
                    id: `element-60-${stepId}`,
                    itemChange: 'eventMetringElementChange',
                    title: 'Замер',
                    items: [
                        {
                            id: `item-1-element-60-${stepId}`,
                            title: 'Надо',
                            price: metringPrice,
                            enableElementId: `element-60-2-${stepId}`
                        },
                        {
                            id: `item-2-element-60-${stepId}`,
                            title: 'Не надо',
                            isSelected: true,
                            disableElementId: `element-60-2-${stepId}`,
                            selectItemId: `item-2-element-60-2-${stepId}`
                        }
                    ]
                },
                {
                    id: `element-60-2-${stepId}`,
                    itemChange: 'eventInstallingElementChange',
                    title: 'Монтаж',
                    items: [
                        {
                            id: `item-1-element-60-2-${stepId}`,
                            title: 'Надо',
                            price: installationPrice
                        },
                        {
                            id: `item-2-element-60-2-${stepId}`,
                            title: 'Я сам поставлю',
                            isSelected: true
                        }
                    ]
                }
            ]
        };
    }



    return {
        init: function (calculatorConfigObj) {
            calculatorConfig = calculatorConfigObj;

            orderSteps = [
                {
                    id: 'step-1',
                    title: 'Выбор изделия',
                    stepElements: [{
                        id: 'element-2',
                        itemChange: 'eventRefreshSteps',
                        items: [
                            /* {
                                id:'item-3',
                                title:'Душевая кабина',
                                childSteps:[
                                    glassThicknessStep('step-4'),
                                    glassTypeStep('step-9'),
                                    {
                                        id:'step-16',
                                        title:'Тип кабины, размер',
                                        tripleWidthSize:true,
                                        itemChange:'eventCabinTypes',
                                        stepElements:[
                                            {
                                                id:'element-16-2',
                                                itemChange:'eventCabinTypes',
                                                items: [
                                                    {
                                                        id:'item-16-2-1',
                                                        number:1,
                                                        title:'Название',
                                                        childSteps:[
                                                            printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
                                                            getHandleTypeStep('step-24', 1)
                                                        ],
                                                        sizes:[
                                                            {
                                                                title:'Высота',
                                                                name:'h',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Параметр',
                                                                name:'w',
                                                                enteredValue:'',
                                                                maxValue:1000
                                                            }
                                                        ],
                                                        additionalParameters:[
                                                            {
                                                                id:'additional-parameter-16-2-1',
                                                                title:'Наличие верхней штанги',
                                                                items:[
                                                                    {
                                                                        id:'additional-item-16-2-1',
                                                                        title:'Да'
                                                                    },
                                                                    {
                                                                        id:'additional-item-16-2-2',
                                                                        title:'Нет',
                                                                        isSelected:true
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id:'item-16-2-2',
                                                        number:2,													
                                                        title:'Название',
                                                        childSteps:[
                                                            printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
                                                            getHandleTypeStep('step-24', 21)
                                                        ],
                                                        isSelected:true,
                                                        sizes:[
                                                            {
                                                                title:'Высота',
                                                                name:'h',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Дверь',
                                                                name:'d',
                                                                enteredValue:'',
                                                                maxValue:1000
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id:'item-16-2-3',
                                                        number:3,
                                                        title:'Название',
                                                        childSteps:[
                                                            printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
                                                            getHandleTypeStep('step-24', 21)
                                                        ],
                                                        sizes:[
                                                            {
                                                                title:'Высота',
                                                                name:'h',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Дверь',
                                                                name:'d',
                                                                enteredValue:'',
                                                                maxValue:1000
                                                            },
                                                            {
                                                                title:'Параметр',
                                                                name:'l',
                                                                enteredValue:''
                                                            }
                                                        ],
                                                        additionalParameters:[
                                                            {
                                                                id:'additional-parameter-16-2-3',
                                                                title:'Наличие верхней штанги',
                                                                items:[
                                                                    {
                                                                        id:'additional-item-16-2-3',
                                                                        title:'Да'
                                                                    },
                                                                    {
                                                                        id:'additional-item-16-2-4',
                                                                        title:'Нет',
                                                                        isSelected:true
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id:'item-16-2-4',
                                                        number:4,
                                                        title:'Название',
                                                        sizes:[
                                                            {
                                                                title:'Высота',
                                                                name:'h',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Параметр',
                                                                name:'l',
                                                                enteredValue:'',
                                                                maxValue:1000
                                                            },
                                                            {
                                                                title:'Дверь',
                                                                name:'d',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Параметр',
                                                                name:'w',
                                                                enteredValue:''
                                                            }
                                                        ],
                                                        additionalParameters:[
                                                            {
                                                                id:'additional-parameter-16-2-4',
                                                                title:'Наличие верхней штанги',
                                                                items:[
                                                                    {
                                                                        id:'additional-item-16-2-5',
                                                                        title:'Да'
                                                                    },
                                                                    {
                                                                        id:'additional-item-16-2-6',
                                                                        title:'Нет',
                                                                        isSelected:true
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id:'item-16-2-5',
                                                        number:5,
                                                        title:'Название',
                                                        childSteps:[
                                                            printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
                                                            getHandleTypeStep('step-24', 21)
                                                        ],
                                                        sizes:[
                                                            {
                                                                title:'Высота',
                                                                name:'h',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Параметр',
                                                                name:'f',
                                                                enteredValue:'',
                                                                maxValue:1000
                                                            },
                                                            {
                                                                title:'Параметр',
                                                                name:'l',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Дверь',
                                                                name:'d2',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Дверь',
                                                                name:'d',
                                                                enteredValue:''
                                                            }
                                                        ],
                                                        additionalParameters:[
                                                            {
                                                                id:'additional-parameter-16-2-5',
                                                                title:'Наличие верхней штанги',
                                                                items:[
                                                                    {
                                                                        id:'additional-item-16-2-7',
                                                                        title:'Да'
                                                                    },
                                                                    {
                                                                        id:'additional-item-16-2-8',
                                                                        title:'Нет',
                                                                        isSelected:true
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id:'item-16-2-6',
                                                        number:6,
                                                        title:'Название',
                                                        childSteps:[
                                                            printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
                                                            getHandleTypeStep('step-24', 21)
                                                        ],
                                                        sizes:[
                                                            {
                                                                title:'Высота',
                                                                name:'h',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Параметр',
                                                                name:'w',
                                                                enteredValue:'',
                                                                maxValue:1000
                                                            },
                                                            {
                                                                title:'Параметр',
                                                                name:'l',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Дверь',
                                                                name:'d',
                                                                enteredValue:''
                                                            }
                                                        ],
                                                        additionalParameters:[
                                                            {
                                                                id:'additional-parameter-16-2-6',
                                                                title:'Наличие верхней штанги',
                                                                items:[
                                                                    {
                                                                        id:'additional-item-16-2-9',
                                                                        title:'Да'
                                                                    },
                                                                    {
                                                                        id:'additional-item-16-2-10',
                                                                        title:'Нет',
                                                                        isSelected:true
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id:'item-16-2-7',
                                                        number:7,
                                                        title:'Название',
                                                        childSteps:[
                                                            printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
                                                            getHandleTypeStep('step-24', 21)
                                                        ],
                                                        sizes:[
                                                            {
                                                                title:'Высота',
                                                                name:'h',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Дверь',
                                                                name:'d',
                                                                enteredValue:'',
                                                                maxValue:1000
                                                            },
                                                            {
                                                                title:'Параметр',
                                                                name:'l',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Параметр',
                                                                name:'w',
                                                                enteredValue:''
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id:'item-16-2-8',
                                                        number:8,
                                                        title:'Угловая душевая кабина',
                                                        childSteps:[
                                                            printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
                                                            getHandleTypeStep('step-24', 21)
                                                        ],
                                                        sizes:[
                                                            {
                                                                title:'Высота',
                                                                name:'h',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Параметр',
                                                                name:'f',
                                                                enteredValue:'',
                                                                maxValue:1000
                                                            },
                                                            {
                                                                title:'Дверь',
                                                                name:'d2',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Дверь',
                                                                name:'d',
                                                                enteredValue:''
                                                            },
                                                            {
                                                                title:'Параметр',
                                                                name:'l',
                                                                enteredValue:''
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id:'step-25',
                                        title:'Цвет ручки',
                                        stepElements:[
                                            {
                                                id:'element-26',
                                                items: [
                                                    {
                                                        id:'item-27',
                                                        title:'Матовая нержавеющая сталь',
                                                        isSelected:true
                                                    },
                                                    {
                                                        id:'item-28',
                                                        title:'Другой цвет'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    deliveryStep('step-25-2', calculatorConfig.SHOWER_CABIN_DELIVERY_PRICE),
                                    installationStep('step-25-3', calculatorConfig.SHOWER_CABIN_INSTALLATION_PRICE)
                                ]
                            },*/
                            {
                                id: 'item-29',
                                title: 'Скинали',
                                isSelected: true,
                                childSteps: [
                                    glassType2Step('step-30'),
                                    printingTypeStep('step-33', calculatorConfig.SKINALI_PHOTO_PRINTING_PRICE, calculatorConfig.SKINALI_MONOCHROMATIC_PAINTING_PRICE),
                                    {
                                        id: 'step-panel-size',
                                        title: 'Количество панелей / размер',
                                        mainParamsCalcFunc: 'panelSizeMainParamsCalc',
                                        calcFunc: 'panelSizeCalc',
                                        doubleWidthSize: true,
                                        stopRender: true,
                                        stepElements: [
                                            {
                                                id: 'element-40',
                                                title: 'Количество:',
                                                itemChange: 'eventAppendSizeElements',
                                                items: [
                                                    {
                                                        id: 'item-40',
                                                        title: '1',
                                                        isSelected: true
                                                    },
                                                    {
                                                        id: 'item-41',
                                                        title: '2'
                                                    },
                                                    {
                                                        id: 'item-42',
                                                        title: '3'
                                                    },
                                                    {
                                                        id: 'item-43',
                                                        title: '4'
                                                    },
                                                    {
                                                        id: 'item-43_2',
                                                        title: '5'
                                                    },
                                                    {
                                                        id: 'item-43_3',
                                                        title: '6'
                                                    }
                                                ],
                                                enteredValues: [
                                                    {
                                                        number: 1,
                                                        w: undefined,
                                                        h: undefined,
                                                        hardening: false
                                                    },
                                                    {
                                                        number: 2,
                                                        w: undefined,
                                                        h: undefined,
                                                        hardening: false
                                                    },
                                                    {
                                                        number: 3,
                                                        w: undefined,
                                                        h: undefined,
                                                        hardening: false
                                                    },
                                                    {
                                                        number: 4,
                                                        w: undefined,
                                                        h: undefined,
                                                        hardening: false
                                                    },
                                                    {
                                                        number: 5,
                                                        w: undefined,
                                                        h: undefined,
                                                        hardening: false
                                                    },
                                                    {
                                                        number: 6,
                                                        w: undefined,
                                                        h: undefined,
                                                        hardening: false
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'step-44',
                                        title: 'Розетки',
                                        calcFunc: 'railsAndSocketsCalc',
                                        stepElements: [
                                            {
                                                id: 'element-48',
                                                title: 'Выпил под блоки розеток:',
                                                itemChange: 'eventSocketsCount',
                                                enteredValue: '',
                                                items: [{
                                                    id: 'item-49',
                                                    title: 'Да',
                                                    socketsBlocs: [
                                                        {
                                                            number: 1,
                                                            title: 'блок розеток из 1 розетки',
                                                            blockCount: '',
                                                            isSelected: false,
                                                            needPhotoPrinting: false
                                                        },
                                                        {
                                                            number: 2,
                                                            title: 'блок розеток из 2 розетки',
                                                            blockCount: '',
                                                            isSelected: false,
                                                            needPhotoPrinting: false
                                                        },
                                                        {
                                                            number: 3,
                                                            title: 'блок розеток из 3 розетки',
                                                            blockCount: '',
                                                            isSelected: false,
                                                            needPhotoPrinting: false
                                                        },
                                                        {
                                                            number: 4,
                                                            title: 'блок розеток из 4 розетки',
                                                            blockCount: '',
                                                            isSelected: false,
                                                            needPhotoPrinting: false
                                                        },
                                                        {
                                                            number: 5,
                                                            title: 'блок розеток из 5 розетки',
                                                            blockCount: '',
                                                            isSelected: false,
                                                            needPhotoPrinting: false
                                                        }
                                                    ]
                                                },
                                                {
                                                    id: 'item-50',
                                                    title: 'Нет',
                                                    isSelected: true
                                                }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'step-51',
                                        title: 'Тип крепления',
                                        calcFunc: 'mountingTypeCalc',
                                        stepElements: [
                                            {
                                                id: 'element-52',
                                                items: [{
                                                    id: 'item-53',
                                                    title: 'Клей',
                                                    itemType: 'glue',
                                                    info: 'Использование данного типа крепления требует выровненные и предварительно подготовленные поверхности стен. Необходимо учитывать, что в случае необходимости демонтировать изделие, данные работы будет выполнить достаточно сложно.'
                                                },
                                                {
                                                    id: 'item-54',
                                                    title: 'Отверстия под крепления',
                                                    itemType: 'drilling',
                                                    info: 'Для такого крепежа в стекле высверливаются отверстия и изделие закрепляется на стену посредством специальных крепежей. '
                                                },
                                                {
                                                    id: 'item-55',
                                                    title: 'Без отверстий',
                                                    itemType: 'withoutDrilling',
                                                    isSelected: true
                                                }]
                                            }
                                        ]
                                    },
                                    metringAndInstallationStep('step-59', calculatorConfig.SKINALI_METRING_PRICE, calculatorConfig.SKINALI_INSTALLATION_PRICE),
                                    deliveryStep('step-59-2', calculatorConfig.SKINALI_DELIVERY_PRICE)
                                ]
                            } /*,
						{
							id:'item-64',
							title:'Двери',
							childSteps:[
								{
									id:'step-65',
									title:'Тип конструкции',
									stepElements:[
										{
											id:'element-66',
											itemChange:'eventRefreshSteps',
											items: [
												{
													id:'item-67',
													title:'Раздвижные двери',
													isSelected:true,
													childSteps:[
														{
															id:'step-68',
															title:'Механизм',
															stepElements:[
																{
																	id:'element-69',
																	items:[
																		{
																			id:'item-70',
																			title:'Система Слайдер',
																			info:'Данная система является &quot;закрытой&quot;. Все крепежи, ролики и каретки спрятаны за горизонтальной декоративной алюминиевой крышкой. ',
																			isSelected:true
																		},
																		{
																			id:'item-71',
																			title:'Система ГЛАСС',
																			info:'Данная система является &quot;открытой&quot;. Основа системы - это трек (труба). Все точечные крепежи, держатели и каретки визуально просматриваются. '
																		},
																		{
																			id:'item-72',
																			title:'Не имеет значения'
																		}
																	]
																}
															]
														},
														glassTypeStep('step-69-2'),
														{
															id:'step-69-3',
															title:'Тип, размер 1',
															doubleWidthSize:true,
															stepElements:[
																{
																	id:'element-69-3-1',
																	itemChange:'eventSlidingDoorTypes',
																	items:[
																			{
																				id:'item-1-element-108',
																				title:'Одностворчатая',
																				number:'1',
																				sizes:[
																					{
																						title:'Высота',
																						name:'h',
																						enteredValue:'',
																						minValue:250,
																						maxValue:2500
																					},
																					{
																						title:'Размер двери',
																						name:'d',
																						enteredValue:'',
																						minValue:250,
																						maxValue:1000
																					}
																				]
																			},
																			{
																				id:'item-2-element-108',
																				title:'Двустворчатая',
																				number:'2',
																				sizes:[
																					{
																						title:'Высота',
																						name:'h',
																						enteredValue:'',
																						minValue:250,
																						maxValue:2500
																					},
																					{
																						title:'Размер двери',
																						name:'d',
																						enteredValue:'',
																						minValue:250,
																						maxValue:1000
																					},
																					{
																						title:'Размер двери',
																						name:'d2',
																						enteredValue:''
																					}
																				]
																			}
																	]
																}
															]
														}
													]
												},
												{
													id:'item-73',
													title:'Распашные двери',
													childSteps:[
														{
															id:'step-74',
															title:'Вид петель',
															stepElements:[
																{
																	id:'element-75',
																	items:[
																		{
																			id:'item-76-element-75',
																			title:'Боковые петли',
																			isSelected:true
																		},
																		{
																			id:'item-77-element-75',
																			title:'Маятниковые петли (фитинги)'
																		}
																	]
																}
															]
														},
														glassTypeStep('step-74-2'),
														{
															id:'step-74-3',
															title:'Тип, размер 2',
															doubleWidthSize:true,
															stepElements:[
																{
																	id:'element-108',
																	itemChange:'eventSwingDoorsTypes',
																	items:[
																			{
																				id:'item-1-element-108',
																				title:'Одностворчатая',
																				number:'1',
																				sizes:[
																					{
																						title:'Высота',
																						name:'h',
																						enteredValue:'',
																						minValue:250,
																						maxValue:2500
																					},
																					{
																						title:'Размер двери',
																						name:'d',
																						enteredValue:'',
																						minValue:250,
																						maxValue:1000
																					}
																				],
																				additionalParameters:[
																					{
																						id:'additional-parameter-108-1',
																						title:'Рама для одностворчатых дверей',
																						text:'В расчёте учитывается цена за раму под полотно не более 2000х900 мм',
																						items:[
																							{
																								id:'additional-item-108-1-1',
																								title:'Без рамы',
																								isSelected:true
																							},
																							{
																								id:'additional-item-108-1-2',
																								title:'Деревянная'
																							},
																							{
																								id:'additional-item-108-1-3',
																								title:'Алюминиевая серая'
																							},
																							{
																								id:'additional-item-108-1-3',
																								title:'Алюминиевая (цвет RAL)'
																							}
																						]
																					}
																				]
																			},
																			{
																				id:'item-2-element-108',
																				title:'Двустворчатая',
																				number:'2',
																				sizes:[
																					{
																						title:'Высота',
																						name:'h',
																						enteredValue:'',
																						minValue:250,
																						maxValue:2500
																					},
																					{
																						title:'Размер двери',
																						name:'d',
																						enteredValue:'',
																						minValue:250,
																						maxValue:1000
																					},
																					{
																						title:'Размер двери',
																						name:'d2',
																						enteredValue:''
																					}
																				]
																			}
																	]
																}
															]
															
														}
													]
												}
											]
										}
									]
								},
								printingTypeStep('step-91', calculatorConfig.DOORS_PHOTO_PRINTING_PRICE, calculatorConfig.DOORS_MONOCHROMATIC_PAINTING_PRICE),
								getHandleTypeStep('step-98', 21),
								{
									id:'step-99',
									title:'Цвет ручки',
									stepElements:[
										{
											id:'element-100',
											items: [
												{
													id:'item-101',
													title:'Матовая нержавеющая сталь',
													isSelected:true
												},
												{
													id:'item-102',
													title:'Другой цвет'
												}
											]
										}
									]
								},
								deliveryStep('step-99-1', calculatorConfig.DOORS_DELIVERY_PRICE),
								installationStep('step-99-2', calculatorConfig.DOORS_INSTALLATION_PRICE)
							]
						} */
                        ]
                    }]
                },
                {
                    id: 'step-112',
                    title: 'Стоимость заказа',
                    doubleWidthSize: true,
                    isTotalPriceStep: true,
                    stepElements: [
                        {
                            id: 'total-price-step',
                            totalPriceBlock: {
                                totalPrice: 0.00,
                                orderSendBlock: {
                                    showSendForm: false,
                                    client: {
                                        name: '',
                                        surname: '',
                                        phone: ''
                                    }
                                }
                            }
                        }
                    ]
                }
            ];
        },
        getOrderSteps: function () {
            return orderSteps;
        }
    };
}());
;// ./src/js/steps/orderStepsHelper.js
﻿/* harmony default export */ var orderStepsHelper = (function(){
	let orderSteps;
	
	let module = {
		init(orderStepsModule){
			orderSteps = orderStepsModule;
		},
        
        findStep: function(stepId, steps) {
            let result = null;

            for (let sInx = 0; sInx < steps.length; sInx++) {
                let step = steps[sInx];
                if (step.id === stepId && step.id.length === stepId.length) {
                    result = step;
                    break;
                }
                if (step.stepElements !== undefined) {
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
		getStepElementOrNull(step, elementId) {
		    if (step.stepElements === undefined) {
		        return null;
		    }

            let elementIndex = step.stepElements.findIndex(element => element.id === elementId && element.id.length === elementId.length);
            return elementIndex >= 0 ? step.stepElements[elementIndex] : null;
		},
        getItemOrNull: function (element, itemId) {
            if (element.items === undefined) {
                return null;
            }

            let itemIndex = element.items.findIndex(item => item.id === itemId);            
            return itemIndex >= 0 ? element.items[itemIndex] : null;
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
        saveCabinTypesAdditionalParameter(element, itemId, additionalParametersId, additionalItemId) {
            let isChanged = false;
            for (let iIdx = 0; iIdx < element.items.length; iIdx++) {
                let item = element.items[iIdx];
                if (item.id === itemId && item.additionalParameters !== undefined) {
                    for (let apIdx = 0; apIdx < item.additionalParameters.length; apIdx++) {
                        let additionalParameter = item.additionalParameters[apIdx];
                        if (additionalParameter.id === additionalParametersId) {
                            for (let apiIdx = 0; apiIdx < additionalParameter.items.length; apiIdx++) {
                                if (additionalParameter.items[apiIdx].id === additionalItemId) {
                                    additionalParameter.items[apiIdx].isSelected = true;
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
        unselectCabinTypesAdditionalParameter(element, itemId, additionalParametersId) {
            let isChanged = false;
            for (let iIdx = 0; iIdx < element.items.length; iIdx++) {
                let item = element.items[iIdx];
                if (item.id === itemId && item.additionalParameters !== undefined) {
                    for (let apIdx = 0; apIdx < item.additionalParameters.length; apIdx++) {
                        let additionalParameter = item.additionalParameters[apIdx];
                        if (additionalParameter.id === additionalParametersId) {
                            for (let apiIdx = 0; apiIdx < additionalParameter.items.length; apiIdx++) {
                                additionalParameter.items[apiIdx].isSelected = false;
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
        getItemBlockOrNull(item, socketBlockNumber) {
            let socketBlock = item.socketsBlocs[socketBlockNumber - 1];
            return socketBlock === undefined ? null : socketBlock;
        }
    };
	
	return module;
}());
;// ./src/js/steps/calcHelper.js
﻿



/* harmony default export */ var calcHelper = (function() {
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
                (0,index_all/* default */.Ay)(steps).each(step => {
                    if (step.mainParamsCalcFunc === "panelSizeMainParamsCalc") {
                        _this.panelSizeMainParamsCalc(step);
                    }

                    if (jquery_default().isArray(step.stepElements)) {
                        (0,index_all/* default */.Ay)(step.stepElements).each(stepElement => {
                            if (stepElement.items !== undefined) {
                                (0,index_all/* default */.Ay)(stepElement.items).each(item => {
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
                const selectedItem = (0,index_all/* default */.Ay)(step.stepElements[0].items).find(item => {
                    return item.isSelected === true;
                });
                const panelCount = selectedItem.title * 1;

                module.mainParams.areaSize = 0.00;
                module.mainParams.perimeterSize = 0.00;
                module.mainParams.drillingCount = 0;

                const panelSizeStep = orderStepsHelper.getStepOrNull("step-panel-size");
                panelSizeStep.stopRender = false;


                const enteredSizes = (0,index_all/* default */.Ay)(step.stepElements[0].enteredValues).filter(item => {
                    return item.number <= panelCount;
                });

                (0,index_all/* default */.Ay)(enteredSizes).each(enteredSizesItem => {
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
            const selectedItem = (0,index_all/* default */.Ay)(step.stepElements[0].items).find(item => {
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
            const selectedItem = (0,index_all/* default */.Ay)(step.stepElements[0].items).find(item => {
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
            const selectedItem = (0,index_all/* default */.Ay)(step.stepElements[0].items).find(item => {
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
            const socketSelectedItem = (0,index_all/* default */.Ay)(step.stepElements[0].items).find(item => {
                return item.isSelected === true;
            });

            if (socketSelectedItem.socketsBlocs) {
                (0,index_all/* default */.Ay)(socketSelectedItem.socketsBlocs).each(socketsBlok => {

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
            const selectedItem = (0,index_all/* default */.Ay)(step.stepElements[0].items).find(item => {
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
            const metringSelectedItem = (0,index_all/* default */.Ay)(step.stepElements[0].items).find(item => {
                return item.isSelected === true;
            });

            if (metringSelectedItem && metringSelectedItem.price !== undefined) {
                logger.calcInfo(`цена замера = = ${metringSelectedItem.price}`);
                result = result + metringSelectedItem.price;
            }

            //installing calc
            const installingSelectedItem = (0,index_all/* default */.Ay)(step.stepElements[1].items).find(item => {
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
            const selectedItem = (0,index_all/* default */.Ay)(step.stepElements[0].items).find(item => {
                return item.isSelected === true;
            });
            const panelCount = selectedItem.title * 1;
            let hardeningTotal = 0.00;
            let grindingTotal = 0.00;

            logger.calcInfo(`Шаг "${step.title}"`);
            const enteredSizes = (0,index_all/* default */.Ay)(step.stepElements[0].enteredValues).filter(item => {
                return item.number <= panelCount;
            });

            (0,index_all/* default */.Ay)(enteredSizes).each(enteredSizesItem => {

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
            (0,index_all/* default */.Ay)(steps).each(step => {
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

                if (jquery_default().isArray(step.stepElements)) {
                    (0,index_all/* default */.Ay)(step.stepElements).each(stepElement => {
                        if (stepElement.items) {
                            (0,index_all/* default */.Ay)(stepElement.items).each(item => {
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
;// ./src/js/steps/metringAndInstallationStep.js




/* harmony default export */ var metringAndInstallationStep = (function() {
    let templateHelper;
    let orderStepsHelper;
    let calcHelper;

    let eventMetringElements = [];
    let eventInstallingElements = [];

    const switchInstallationRadio = function(selectedItem) {
        if (selectedItem.selectItemId !== undefined) {
            jquery_default()(`#${selectedItem.selectItemId}`).click();
        }

        if (selectedItem.enableElementId !== undefined) {
            const $inputs = jquery_default()(`input:radio[name^="${selectedItem.enableElementId}"]`);
            $inputs.removeClass("disabled");
            $inputs.removeAttr("disabled");
        }

        if (selectedItem.disableElementId !== undefined) {
            const $inputs = jquery_default()(`input:radio[name^="${selectedItem.disableElementId}"]`);
            $inputs.addClass("disabled");
            $inputs.attr("disabled", "disabled");
        }
    };

    const module = {
        renderMetringBlock: function(element, stepId) {
            const data = {
                id: element.id,
                title: element.title,
                items: element.items,
                stepId: stepId
            };

            const html = templateHelper.getTemplateResult("metring-element-block", data);
            jquery_default()(`#${stepId}`).append(html);

            this.setEventMetringElementChange(element.id);
        },
        renderInstallationBlock: function(element, step) {
            const data = {
                id: element.id,
                title: element.title,
                items: element.items,
                stepId: step.id
            };

            const html = templateHelper.getTemplateResult("installation-element-block", data);
            jquery_default()(`#${step.id}`).append(html);

            const selectedMetringItem = (0,index_all/* default */.Ay)(step.stepElements[0].items).find(item => {
                return item.isSelected;
            });

            switchInstallationRadio(selectedMetringItem);

            this.setEventInstallingElementChange(element.id);
        },

        setEventMetringElementChange: function(radioElementId) {
            eventMetringElements.push(radioElementId);
            jquery_default()(document).on("change",
                `input:radio[name^="${radioElementId}"]`,
                function() {
                    const stepId = jquery_default()(this).attr("step-id");
                    const elementId = jquery_default()(this).attr("name");
                    const itemId = this.id;

                    const step = orderStepsHelper.getStepOrNull(stepId);
                    const element = orderStepsHelper.getStepElementOrNull(step, elementId);

                    orderStepsHelper.unselectElementItems(element.items);
                    const selectedItem = orderStepsHelper.selectElementItem(element.items, itemId);

                    switchInstallationRadio(selectedItem);

                    calcHelper.recalcAll();
                });
        },
        removeEventMetringElementChange: function() {
            (0,index_all/* default */.Ay)(eventMetringElements).each(element => {
                jquery_default()(document).off("change", `input:radio[name^="${element}"]`);
            });

            eventMetringElements = [];
        },


        setEventInstallingElementChange: function(inputRadioElementId) {
            eventInstallingElements.push(inputRadioElementId);
            jquery_default()(document).on("change",
                `input:radio[name^="${inputRadioElementId}"]`,
                function() {
                    const stepId = jquery_default()(this).attr("step-id");
                    const elementId = jquery_default()(this).attr("name");
                    const itemId = this.id;

                    const step = orderStepsHelper.getStepOrNull(stepId);
                    const element = orderStepsHelper.getStepElementOrNull(step, elementId);

                    orderStepsHelper.unselectElementItems(element.items);
                    orderStepsHelper.selectElementItem(element.items, itemId);

                    calcHelper.recalcAll();
                });
        },
        removeEventInstallingElementChange: function() {
            (0,index_all/* default */.Ay)(eventInstallingElements).each(element => {
                jquery_default()(document).off("change", `input:radio[name^="${element}"]`);
            });

            eventInstallingElements = [];
        },
        init: function(orderStepsHelperModule, templateHelperModule, calcHelperModule) {
            orderStepsHelper = orderStepsHelperModule;
            templateHelper = templateHelperModule;
            calcHelper = calcHelperModule;
        }
    };

    return module;
}());
;// ./src/js/libConfig.js
﻿



/* harmony default export */ var libConfig = (function() {

    const initJQueryValidation = function() {
        jquery_default().validator.setDefaults({
            debug: true,
            success: "valid",
            messages: (jquery_default()).validator.messages
        });

        jquery_default().validator.addMethod("latvianPhone",
            function(value, element) {
                return this.optional(element) || /(^[+]371\d{8}$)|(^371\d{8}$)|(^\d{8}$)/g.test(value);
            },
            "Не верный формат телефона");
    };

    const initUnderscore = function() {
        index_all/* default.templateSettings */.Ay.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g,
            evaluate: /\[\[(.+?)\]\]/g,
            escape: /\(\((.+?)\)\)/g
        };
    };


    const module = {
        init: function() {
            initJQueryValidation();
            initUnderscore();
        }
    };

    return module;
}());
;// ./src/js/calculator.js
﻿/* harmony default export */ var calculator = (function() {

    const module = {
        init: function(calculatorConfigModule,
            orderStepsModule,
            orderStepsHelperModule,
            calcHelperModule,
            orderStepModule,
            railAndSocketStepModule,
            panelSizeStepModule,
            totalPriceStepModule,
            miscHelperModule,
            loggerModule,
            consolePrinterModule,
            mailSenderModule,
            templateHelperModule,
            metringAndInstallationStepModule) {

            orderStepsModule.init(calculatorConfigModule);
            const orderSteps = orderStepsModule.getOrderSteps();

            const orderStep = orderStepModule;

            const calcHelper = calcHelperModule;
            calcHelper.init(orderSteps,
                orderStepsHelperModule,
                calculatorConfigModule,
                orderStep,
                miscHelperModule,
                loggerModule,
                consolePrinterModule,
                totalPriceStepModule);

            panelSizeStepModule.init(orderStep, orderStepsHelperModule, calcHelper);
            railAndSocketStepModule.init(orderStep, orderStepsHelperModule, calcHelper, templateHelperModule);

            mailSenderModule.init(templateHelperModule, calculatorConfigModule);

            totalPriceStepModule.init(templateHelperModule,
                orderStepsHelperModule,
                mailSenderModule,
                calculatorConfigModule,
                calcHelper,
                miscHelperModule);

            metringAndInstallationStepModule.init(orderStepsHelperModule, templateHelperModule, calcHelper);

            orderStep.init(orderStepsHelperModule,
                orderSteps,
                calcHelper,
                railAndSocketStepModule,
                panelSizeStepModule,
                totalPriceStepModule,
                metringAndInstallationStepModule,
                templateHelperModule);

            orderStepsHelperModule.init(orderSteps);

            orderStep.renderAllSteps();
        }
    };


    return module;
}());
;// ./src/index.js









window.$ = window.jQuery = (jquery_default());



























$(function () {

    libConfig.init();
    calculator.init(calculatorConfig,
        orderSteps,
        orderStepsHelper,
        calcHelper,
        orderStep,
        railAndSocketStep,
        panelSizeStep,
        totalPriceStep,
        miscHelper,
        logger,
        cp,
        mailSender,
        templateHelper,
        metringAndInstallationStep);
});


/***/ }),

/***/ 191:
/***/ (function() {

/* SmtpJS.com - v3.0.0 */
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			57: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcalculator"] = self["webpackChunkcalculator"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [965,979,867], function() { return __webpack_require__(437); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;