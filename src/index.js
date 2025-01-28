
import './lib/googleapis/css/family-oswald.css';
import './css/calculator.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

import './lib/jquery-validation/localization/messages_ru.js';

import 'popper.js';


import './lib/smtp-min.js';

import calculatorConfigModule from './js/calculatorConfig.js';
import miscHelperModule from './js/utils/miscHelper.js';
import loggerModule from './js/utils/logger.js';
import consolePrinterModule from './js/utils/cp.js';
import mailSenderModule from './js/utils/mailSender.js';
import templateHelperModule from './js/utils/templateHelper.js';

import panelSizeStepModule from './js/steps/panelSizeStep.js';
import railAndSocketStepModule from './js/steps/railAndSocketStep.js';
import totalPriceStepModule from './js/steps/totalPriceStep.js';
import orderStepModule from './js/steps/orderStep.js';
import orderStepsModule from './js/steps/orderSteps.js';
import orderStepsHelperModule from './js/steps/orderStepsHelper.js';
import calcHelperModule from './js/steps/calcHelper.js';
import metringAndInstallationStepModule from './js/steps/metringAndInstallationStep.js';

import libConfigModule from './js/libConfig.js';
import calculatorModule from './js/calculator.js';

$(function () {

    libConfigModule.init();
    calculatorModule.init(calculatorConfigModule,
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
        metringAndInstallationStepModule);
});
