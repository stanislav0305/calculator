var totalPriceStepModule = (function () {
    let templateHelper;
    let orderStepsHelper;
    let mailSender;
    let calculatorConfig;

	let module = {
	    totalPriceBlock: function (element, stepId) {
	        if (element.totalPriceBlock !== undefined) {
	            let data = {
	                stepId: stepId,
	                elementId: element.id,
	                totalPriceBlock: element.totalPriceBlock,
	                showOrderButton: calculatorConfig.SHOW_ORDER_BUTTON
	            };
	            let html = templateHelper.getTemplateResult("total-price-block", data);
	            $(`#${stepId}`).append(html);

	            module.setOrderBtnEvent();
	            module.setOrderFormSubmitEvent();
	        }
	    },
	    setTotalPrice: function(totalPrice) {
	        $('#totalPrice').text(totalPrice.toFixed(2));
	    },

	    setOrderBtnEvent: function() {
	        $(document).on('click', '#orderBtn', function (event) {
	            let stepId = $(this).attr('step-id');
	            let elementId = $(this).attr('element-id');

	            let step = orderStepsHelper.getStepOrNull(stepId);
	            let element = orderStepsHelper.getStepElementOrNull(step, elementId);

	            element.totalPriceBlock.orderSendBlock.showSendForm = true;

	            module.showSendForm();
	        });
	    },
	    removeOrderBtnEvent: function () {
	        $(document).off('click', '#orderBtn');
	    },
        showSendForm: function() {
            $("#orderBtn").removeClass("visible").addClass("invisible");
            $("#sendOrderForm").removeClass("invisible").addClass("visible");
        },
	    hideSendForm: function () {
	        $("#orderBtn").removeClass("invisible").addClass("visible");
	        $("#sendOrderForm").removeClass("visible").addClass("invisible");
	    },
	    getFormData:function(dom_query){
	        let out = {};
	        let s_data = $(dom_query).serializeArray();
	       
	        for(let i = 0; i<s_data.length; i++){
	            let record = s_data[i];
	            out[record.name] = record.value;
	        }
	        return out;
	    },
        setOrderFormSubmitEvent: function() {
            $(document).on('submit', "#sendOrderForm", function (event) {
                event.preventDefault();

                let client = module.getFormData("#sendOrderForm");
                console.log(module.getFormData("#sendOrderForm"));

                mailSender.createMailDataObj(client, []);
                mailSender.send();
                //$("#client-name").val();

                //var formdata = $(this).serialize();
                
                
               
                //$("#sendFinishNotification").fadeIn(2000, function() {
                //    module.hideSendForm();
                //}).delay(3500).fadeOut(3000, "linear");
                
                return false;
            });
        },
        removeOrderFormSubmitEvent: function () {
            $(document).off('submit', "#sendOrderForm");
        },

    init: function (templateHelperModule, orderStepsHelperModule, mailSenderModule, calculatorConfigModule) {
	        templateHelper = templateHelperModule;
	        orderStepsHelper = orderStepsHelperModule;
	        mailSender = mailSenderModule;
            calculatorConfig = calculatorConfigModule;
    }
	};

    return module;
}());