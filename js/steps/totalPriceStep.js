var totalPriceStepModule = (function() {
    let templateHelper;
    let orderStepsHelper;
    let mailSender;
    let calculatorConfig;
    let calcHelper;

    let clientDravingCount = 1;
    const CLIENT_DRAVING_MAX_COUNT = 10;
    let clientDravingNumber = 0;
    let clientDravingTotalFilesSizeInBytes = 0;
    const CLIENT_DRAVING_MAX_TOTAL_FILES_SIZE_IN_BYTES = 25 * 1000000; // 25 Mb

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

    let getFileSize = function ($fileInput) {
        var f = $fileInput.files[0];

        if (f.size !== undefined) {
            return f.size;
        }

        return f.fileSize;
    }

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
        clientDravingNumber = clientDravingNumber + 1;

        let data = {
            number: clientDravingNumber
        };
        let html = templateHelper.getTemplateResult("file-input-block", data);
        $("#file-input-block-container").append(html);
    };

    let sendOrderEmail = function() {
        let client = module.getFormData("#sendOrderForm");
        let totalPrice = $('#totalPrice').text();
        let log = calcHelper.getLogger().getFiltredLog();
        let attachments = getAttachments($(".client-drawing"));

        let fileNames = _($(".client-drawing"))
            .map(function (fileInput) {
                let fileName = $(fileInput).attr("file-name");
                return fileName;
            })
            .filter(function (fileName) {
                return (fileName != undefined && fileName !== "");
            });


        let mailData = mailSender.createOrderMailDataObj(client, totalPrice, fileNames, log, attachments);

        $("#sendProgressNotification").fadeIn(2000,
            function () {
                let promise = mailSender.send(mailData);
                promise.then(
                    message => {
                        $("#sendProgressNotification").fadeOut(500);
                        if (message === "OK") {
                            $("#sendFinishNotification")
                                .fadeIn(500,
                                function () {
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

                clientDravingCount = 1;
                clientDravingNumber = 0;
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
                let fileName = $fileInput.val().split("\\").pop();

                var idxDot = fileName.lastIndexOf(".") + 1;
                var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                if (extFile !== "jpg" && extFile !== "jpeg" && extFile !== "pdf") {
                    alert("Можно загружать только jpg/jpeg или pdf файлы!");
                    $fileInput.val("");
                    return;
                }

                let fileSize = getFileSize($fileInput[0]);

                if (fileSize > CLIENT_DRAVING_MAX_TOTAL_FILES_SIZE_IN_BYTES) {
                    alert(`Размер файла не может привышать ${CLIENT_DRAVING_MAX_TOTAL_FILES_SIZE_IN_BYTES / 1000000} Мб`);
                    $fileInput.val("");
                    return;
                }

                if (clientDravingTotalFilesSizeInBytes + fileSize > CLIENT_DRAVING_MAX_TOTAL_FILES_SIZE_IN_BYTES) {
                    alert(`Общий объём приложенных файлов не может привышать ${CLIENT_DRAVING_MAX_TOTAL_FILES_SIZE_IN_BYTES / 1000000} Мб`);
                    $fileInput.val("");
                    return;
                }

                //if replace file
                let currentFileSize = $fileInput.attr("file-size-in-bytes");
                if (currentFileSize === undefined) {
                    currentFileSize = 0;
                }
                clientDravingTotalFilesSizeInBytes = clientDravingTotalFilesSizeInBytes - currentFileSize;
                $fileInput.attr("file-size-in-bytes", 0);

                getBase64String($fileInput).done(function (base64Data) {
                    let inputNumber = $fileInput.attr("input-number");
                    fileName = `${inputNumber}-${fileName}`;

                    $fileInput.attr("base64-file-string", base64Data);
                    $fileInput.attr("file-name", fileName);
                    $fileInput.attr("file-size-in-bytes", fileSize);
                    clientDravingTotalFilesSizeInBytes = clientDravingTotalFilesSizeInBytes + fileSize;

                    $(`#client-drawing-label-${inputNumber}`)
                        .addClass("selected").html(fileName);

                    let emptyInputCount = _.filter($('.client-drawing'),
                        function (input) {
                            return !input.value;
                        }).length;

                    if (clientDravingCount < CLIENT_DRAVING_MAX_COUNT && emptyInputCount === 0) {
                        appendCliendDravingBlock();
                    }
                });
            });

            $(document).on("click", ".file-input-block-remove-btn", function() {
                let inputNumber = $(this).attr("input-number");

                let fileSize = $(`#client-drawing-${inputNumber}`).attr("file-size-in-bytes");
                if (fileSize === undefined) {
                    fileSize = 0;
                }

                $(`#file-input-block-${inputNumber}`).remove();
                clientDravingCount = clientDravingCount - 1;
                clientDravingTotalFilesSizeInBytes = clientDravingTotalFilesSizeInBytes - fileSize;

                let emptyInputCount = _.filter($('.client-drawing'),
                    function(input) {
                        return !input.value;
                    }).length;

                if (emptyInputCount === 0) {  // max 10 files
                    appendCliendDravingBlock();
                }
            });

            $(document).on("click", ".file-input-block-clear-btn", function () {
                let inputNumber = $(this).attr("input-number");

                let fileSize = $(`#client-drawing-${inputNumber}`).attr("file-size-in-bytes");
                if (fileSize === undefined) {
                    fileSize = 0;
                }
                clientDravingTotalFilesSizeInBytes = clientDravingTotalFilesSizeInBytes - fileSize;

                $(`#client-drawing-${inputNumber}`).val("");
                $(`#client-drawing-${inputNumber}`).attr("base64-file-string", "");
                $(`#client-drawing-${inputNumber}`).attr("file-name", "");
                $(`#client-drawing-${inputNumber}`).attr("file-size-in-bytes", 0);
                $(`#client-drawing-label-${inputNumber}`).text("Выбрать файл .jpg .jpeg .pdf");
            });
        },
        removeClientDravingChangeEvents: function () {
            $(document).off("change", ".client-drawing");
            $(document).off("click", ".file-input-block-remove-btn");
        },
        setOrderFormSubmitEvent: function () {
            $("#sendOrderForm").validate({
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
                    $(".tooltipe-form-error").remove();

                    _.each(errorList,
                        function(item) {
                            let errorContainerId = "tooltipe-form-error-container-id-" + item.element.name;
                            let errorLabelId = "tooltipe-form-error-lable-id-" + item.element.name;

                            if ($(`#${errorContainerId}`).length === 0) {
                                let data = {
                                    containerId: errorContainerId,
                                    labelId: errorLabelId,
                                    errorMessage: item.message
                                };
                                let html = templateHelper.getTemplateResult("tooltipe-form-error", data);
                                $(item.element).parent().append(html);
                            } else {
                                $(`#${errorLabelId}`).html(item.message);
                            }
                        });
                }
        }); 
            
            $(document).on('submit', "#sendOrderForm", function (event) {
                event.preventDefault();

                if ($("#sendOrderForm").valid() === true) {
                    sendOrderEmail();
                }

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