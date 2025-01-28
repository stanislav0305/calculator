import $ from "jquery";
import _ from 'underscore';

export default (function() {
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
        const deferred = $.Deferred();
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
        const filteredInputs = _($fileInputs).filter(fileInput => {
            const $fileInput = $(fileInput);
            return $fileInput.attr("file-name") != undefined && $fileInput.attr("file-name") !== "";
        });

        _(filteredInputs).each(fileInput => {
            const $fileInput = $(fileInput);
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
        $("#file-input-block-container").append(html);
    };

    const hideSendForm = function() {
        $("#orderBtn").removeClass("invisible").addClass("visible");
        $("#sendOrderForm").removeClass("visible").addClass("invisible");
    };

    const sendOrderEmail = function() {
        const client = miscHelper.getFormData("#sendOrderForm");
        const totalPrice = $("#totalPrice").text();
        const log = calcHelper.getLogger().getFilteredLog();
        const attachments = getAttachments($(".client-drawing"));

       const mappedFilenames = _($(".client-drawing")).map(fileInput => {
                const fileName = $(fileInput).attr("file-name");
                return fileName;
            });

       const fileNames = _(mappedFilenames).filter(function(fileName) {
                return (fileName != undefined && fileName !== "");
            });

       const mailData = mailSender.createOrderMailDataObj(client, totalPrice, fileNames, log, attachments);

        $("#sendProgressNotification").fadeIn(2000,
            function() {
                const promise = mailSender.send(mailData);
                promise.then(
                    message => {
                        $("#sendProgressNotification").fadeOut(500);
                        if (message === "OK") {
                            $("#sendFinishNotification")
                                .fadeIn(500,
                                    function() {
                                        hideSendForm();
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
                $(`#${stepId}`).append(html);

                module.setOrderBtnEvent();
                module.setOrderFormSubmitEvent();

                drawingManager.drawingCount = 1;
                drawingManager.currentNumber = 0;
                module.setClientDrawingChangeEvent();
            }
        },
        setTotalPrice: function(totalPrice) {
            $("#totalPrice").text(totalPrice.toFixed(2));
        },
        setOrderBtnEvent: function() {
            $(document).on("click",
                "#orderBtn",
                function() {
                    const stepId = $(this).attr("step-id");
                    const elementId = $(this).attr("element-id");

                    const step = orderStepsHelper.getStepOrNull(stepId);
                    const element = orderStepsHelper.getStepElementOrNull(step, elementId);

                    element.totalPriceBlock.orderSendBlock.showSendForm = true;

                    module.showSendForm();
                });
        },
        removeOrderBtnEvent: function() {
            $(document).off("click", "#orderBtn");
        },
        showSendForm: function() {
            $("#orderBtn")
                .removeClass("visible")
                .addClass("invisible");

            $("#sendOrderForm")
                .removeClass("invisible")
                .addClass("visible");
        },
        setClientDrawingChangeEvent: function() {

            $(document).on("change",
                ".client-drawing",
                function() {
                    const $fileInput = $(this);
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

                        $(`#client-drawing-label-${inputNumber}`)
                            .addClass("selected")
                            .html(fileName);

                        const emptyInputCount = _($(".client-drawing")).filter(input => {
                            return !input.value;
                        }).length;

                        if (drawingManager.drawingCount < calculatorConfig.CLIENT_DRAWING_FILES_MAX_COUNT &&
                            emptyInputCount === 0) {
                            appendClientDrawingBlock();
                        }
                    });
                });

            $(document).on("click",
                ".file-input-block-remove-btn",
                function() {
                    const inputNumber = $(this).attr("input-number");

                    let fileSize = $(`#client-drawing-${inputNumber}`).attr("file-size-in-bytes");
                    if (fileSize === undefined) {
                        fileSize = 0;
                    }

                    $(`#file-input-block-${inputNumber}`).remove();
                    drawingManager.drawingCount = drawingManager.drawingCount - 1;
                    drawingManager.totalFilesSizeInBytes = drawingManager.totalFilesSizeInBytes - fileSize;

                    const emptyInputCount = _($(".client-drawing")).filter(input => {
                            return !input.value;
                        }).length;

                    if (emptyInputCount === 0) {
                        appendClientDrawingBlock();
                    }
                });

            $(document).on("click",
                ".file-input-block-clear-btn",
                function() {
                    const inputNumber = $(this).attr("input-number");

                    let fileSize = $(`#client-drawing-${inputNumber}`).attr("file-size-in-bytes");

                    if (fileSize === undefined) {
                        fileSize = 0;
                    }
                    drawingManager.totalFilesSizeInBytes = drawingManager.totalFilesSizeInBytes - fileSize;

                    $(`#client-drawing-${inputNumber}`)
                        .val("")
                        .attr("base64-file-string", "")
                        .attr("file-name", "")
                        .attr("file-size-in-bytes", 0);

                    $(`#client-drawing-label-${inputNumber}`)
                        .text("Выбрать файл .jpg .jpeg .pdf");
                });
        },
        removeClientDrawingChangeEvents: function() {
            $(document).off("change", ".client-drawing");
            $(document).off("click", ".file-input-block-remove-btn");
        },
        setOrderFormSubmitEvent: function() {
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
                    $(".tooltip-form-error").remove();

                    _(errorList).each(item => {
                        const errorContainerId = `tooltip-form-error-container-id-${item.element.name}`;
                        const errorLabelId = `tooltip-form-error-label-id-${item.element.name}`;

                        if ($(`#${errorContainerId}`).length === 0) {
                            const data = {
                                containerId: errorContainerId,
                                labelId: errorLabelId,
                                errorMessage: item.message
                            };
                            const html = templateHelper.getTemplateResult("tooltip-form-error", data);
                            $(item.element).parent().append(html);
                        } else {
                            $(`#${errorLabelId}`).html(item.message);
                        }
                    });
                }
            });

            $(document).on("submit",
                "#sendOrderForm",
                function(event) {
                    event.preventDefault();
                    sendOrderEmail();
                    return false;
                });
        },
        removeOrderFormSubmitEvent: function() {
            $(document).off("submit", "#sendOrderForm");
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