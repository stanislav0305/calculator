let metringAndInstallationStepModule = (function() {
    let templateHelper;
    let orderStepsHelper;
    let calcHelper;

    let eventMetringElements = [];
    let eventInstallingElements = [];

    const switsInstalationRadio = function(selectedItem) {
        if (selectedItem.selectItemId !== undefined) {
            $(`#${selectedItem.selectItemId}`).click();
        }

        if (selectedItem.enableElementId !== undefined) {
            const $inputs = $(`input:radio[name^="${selectedItem.enableElementId}"]`);
            $inputs.removeClass("disabled");
            $inputs.removeAttr("disabled");
        }

        if (selectedItem.desableElementId !== undefined) {
            const $inputs = $(`input:radio[name^="${selectedItem.desableElementId}"]`);
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

            const html = templateHelper.getTemplateResult("metring-elment-block", data);
            $(`#${stepId}`).append(html);

            this.setEventMetringElementChange(element.id);
        },
        renderInstalationBlock: function(element, step) {
            const data = {
                id: element.id,
                title: element.title,
                items: element.items,
                stepId: step.id
            };

            const html = templateHelper.getTemplateResult("instalation-elment-block", data);
            $(`#${step.id}`).append(html);

            const selectedMetringItem = _(step.stepElements[0].items).find(item => {
                return item.isSelected;
            });

            switsInstalationRadio(selectedMetringItem);

            this.setEventInstallingElementChange(element.id);
        },

        setEventMetringElementChange: function(inputRadionElementId) {
            eventMetringElements.push(inputRadionElementId);
            $(document).on("change",
                `input:radio[name^="${inputRadionElementId}"]`,
                function() {
                    const stepId = $(this).attr("step-id");
                    const elementId = $(this).attr("name");
                    const itemId = this.id;

                    const setp = orderStepsHelper.getStepOrNull(stepId);
                    const element = orderStepsHelper.getStepElementOrNull(setp, elementId);

                    orderStepsHelper.unselectElementItems(element.items);
                    const selectedItem = orderStepsHelper.selectElementItem(element.items, itemId);

                    switsInstalationRadio(selectedItem);

                    calcHelper.recalcAll();
                });
        },
        removeEventMetringElementChange: function() {
            _(eventMetringElements).each(element => {
                $(document).off("change", `input:radio[name^="${element}"]`);
            });

            eventMetringElements = [];
        },


        setEventInstallingElementChange: function(inputRadioElementId) {
            eventInstallingElements.push(inputRadioElementId);
            $(document).on("change",
                `input:radio[name^="${inputRadioElementId}"]`,
                function() {
                    const stepId = $(this).attr("step-id");
                    const elementId = $(this).attr("name");
                    const itemId = this.id;

                    const setp = orderStepsHelper.getStepOrNull(stepId);
                    const element = orderStepsHelper.getStepElementOrNull(setp, elementId);

                    orderStepsHelper.unselectElementItems(element.items);
                    orderStepsHelper.selectElementItem(element.items, itemId);

                    calcHelper.recalcAll();
                });
        },
        removeEventInstallingElementChange: function() {
            _(eventInstallingElements).each(element => {
                $(document).off("change", `input:radio[name^="${element}"]`);
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