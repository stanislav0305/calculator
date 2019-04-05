var totalPriceStepModule = (function() {
    let templateHelper;
    let orderStepsHelper;
    let mailSender;
    let calculatorConfig;
    let calcHelper;

    let clientDravingCount = 0;

    let getBase64String = function(inputElement) {
        var deferred = $.Deferred();

        var files = inputElement.get(0).files;
        if (files && files[0]) {
            var fr = new FileReader();
            fr.onload = function(e) {
                deferred.resolve(e.target.result);
            };
            fr.readAsDataURL(files[0]);
        } else {
            deferred.resolve(undefined);
        }

        return deferred.promise();
    };

    let getAttachmentObj = function($fileInput) {
        return {
            name: $fileInput.attr("file-name"),
            data: $fileInput.attr("base64-file-string")
        };
    };

    let getAttachments = function ($fileInputs) {
        let attachments = [];
        _.each($fileInputs, function (fileInput) {
            let $fileInput = $(fileInput);
            if ($fileInput.attr("file-name") != undefined && $fileInput.attr("file-name") !== "") {
                let attachment = getAttachmentObj($fileInput);
                attachments.push(attachment);
            }
        });

        return attachments;
    }

    let appendCliendDravingBlock = function() {
        clientDravingCount = clientDravingCount + 1;
        let clientDravingNumber = clientDravingCount;
        let data = {
            number: clientDravingNumber
        };
        let html = templateHelper.getTemplateResult("file-input-block", data);
        $("#file-input-block-container").append(html);
    };

    let module = {
        totalPriceBlock: function(element, stepId) {
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

                clientDravingCount = 0;
                module.setClientDravingChangeEvent();
            }
        },
        setTotalPrice: function(totalPrice) {
            $('#totalPrice').text(totalPrice.toFixed(2));
        },
        setOrderBtnEvent: function() {
            $(document).on('click', '#orderBtn', function(event) {
                let stepId = $(this).attr('step-id');
                let elementId = $(this).attr('element-id');

                let step = orderStepsHelper.getStepOrNull(stepId);
                let element = orderStepsHelper.getStepElementOrNull(step, elementId);

                element.totalPriceBlock.orderSendBlock.showSendForm = true;

                module.showSendForm();
            });
        },
        removeOrderBtnEvent: function() {
            $(document).off('click', '#orderBtn');
        },
        showSendForm: function() {
            $("#orderBtn").removeClass("visible").addClass("invisible");
            $("#sendOrderForm").removeClass("invisible").addClass("visible");
        },
        hideSendForm: function() {
            $("#orderBtn").removeClass("invisible").addClass("visible");
            $("#sendOrderForm").removeClass("visible").addClass("invisible");
        },
        getFormData: function(dom_query) {
            let out = {};
            let s_data = $(dom_query).serializeArray();

            for (let i = 0; i < s_data.length; i++) {
                let record = s_data[i];
                out[record.name] = record.value;
            }
            return out;
        },
        setClientDravingChangeEvent: function () {
           
            $(document).on("change", ".client-drawing", function() {
                let $fileInput = $(this);
                getBase64String($fileInput).done(function (base64Data) {
                    let inputNumber = $fileInput.attr("input-number");
                    let fileName = $fileInput.val().split("\\").pop();
                    fileName = `${inputNumber}-${fileName}`;

                    var idxDot = fileName.lastIndexOf(".") + 1;
                    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                    if (extFile !== "jpg"  && extFile !== "jpeg" && extFile !== "pdf") {
                        alert("Можно загружать только jpg/jpeg или pdf файлы!");
                        $fileInput.val("");
                        return;
                    }

                    $fileInput.attr("base64-file-string", base64Data);
                    $fileInput.attr("file-name", fileName);

                    $(`#client-drawing-label-${inputNumber}`).addClass("selected").html(fileName);

                    appendCliendDravingBlock();
                });
            });

            $(document).on("click", ".file-input-block-remove-btn", function() {
                let inputNumber = $(this).attr("input-number");
                $(`#file-input-block-${inputNumber}`).remove();
            });
    },
        removeClientDravingChangeEvents: function () {
            $(document).off("change", ".client-drawing");
            $(document).off("click", ".file-input-block-remove-btn");
        },
	    setOrderFormSubmitEvent : function(){
            $(document).on('submit', "#sendOrderForm", function (event) {
                event.preventDefault();

                //$("#sendOrderForm").validate();

                let client = module.getFormData("#sendOrderForm");
                let totalPrice = $('#totalPrice').text();
                let log = calcHelper.getLogger().getFiltredLog();
                let attachments = getAttachments($(".client-drawing"));

                let fileNames = _($(".client-drawing"))
                    .map(function(fileInput) {
                        let fileName = $(fileInput).attr("file-name");
                        return fileName;
                    })
                    .filter(function(fileName) {
                        return (fileName != undefined && fileName !== "");
                    });
               
                
                let mailData = mailSender.createOrderMailDataObj(client, totalPrice, fileNames, log, attachments);
                
                $("#sendProgressNotification").fadeIn(2000,
                    function() {
                        let promise = mailSender.send(mailData);
                        promise.then(
                            message => {
                                $("#sendProgressNotification").fadeOut(500);
                                if (message === "OK") {
                                    $("#sendFinishNotification")
                                        .fadeIn(500,
                                            function() {
                                                module.hideSendForm();
                                            })
                                        .delay(5000)
                                        .fadeOut(2000, "linear");
                                } else {
                                    console.log(`В процессе отправки произошла ошибка. Ошибка: ${message}`);
                                    $("#sendErrorText").text(message);

                                    $("#sendErrorNotification")
                                        .fadeIn(500)
                                        .delay(5000)
                                        .fadeOut(2000, "linear");
                                }

                            }
                        );
                    });
                
                return false;
            });
        },
        removeOrderFormSubmitEvent: function () {
            $(document).off('submit', "#sendOrderForm");
        },

        init: function (templateHelperModule, orderStepsHelperModule, mailSenderModule, calculatorConfigModule, calcHelperModule) {
	        templateHelper = templateHelperModule;
	        orderStepsHelper = orderStepsHelperModule;
	        mailSender = mailSenderModule;
	        calculatorConfig = calculatorConfigModule;
            calcHelper = calcHelperModule;
        }
	};

    return module;
}());