var metringAndInstallationStepModule = (function() {
    let templateHelper;
    let orderStepsHelper;
    let calcHelper;

    let eventMetringElements = [];
    let eventInstallingElements = [];

    let switsInstalationRadio = function (selectedItem) {
        if (selectedItem.selectItemId !== undefined) {
            $(`#${selectedItem.selectItemId}`).click();
        }

        if (selectedItem.enableElementId !== undefined) {
            let $inputs = $(`input:radio[name^="${selectedItem.enableElementId}"]`);
            $inputs.removeClass("disabled");
            $inputs.removeAttr("disabled");
        }

        if (selectedItem.desableElementId !== undefined) {
            let $inputs = $(`input:radio[name^="${selectedItem.desableElementId}"]`);
            $inputs.addClass("disabled");
            $inputs.attr('disabled', 'disabled');
        }
    }

    let module = {
		renderMetringBlock: function(element, stepId) {
		    let data = {
		        id: element.id,
		        title: element.title,
		        items: element.items,
		        stepId: stepId
		    };

			let html = templateHelper.getTemplateResult("metring-elment-block", data);
			$(`#${stepId}`).append(html);

		    this.setEventMetringElementChange(element.id);
		},
		renderInstalationBlock: function (element, step) {		   
		    let data = {
		        id: element.id,
		        title: element.title,
		        items: element.items,
		        stepId: step.id
		    };

            let html = templateHelper.getTemplateResult("instalation-elment-block", data);
            $(`#${step.id}`).append(html);

		    let selectedMetringItem = _.find(step.stepElements[0].items, function (item) {
		            return item.isSelected;
		    });

		    switsInstalationRadio(selectedMetringItem);

		    this.setEventInstallingElementChange(element.id);
		},
		
		setEventMetringElementChange: function (elementId) {
		    eventMetringElements.push(elementId);
		    $(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
		        let stepId = $(this).attr('step-id');
		        let elementId = $(this).attr('name');
		        let itemId = this.id;

		        let setp = orderStepsHelper.getStepOrNull(stepId);
		        let element = orderStepsHelper.getStepElementOrNull(setp, elementId);

		        orderStepsHelper.unselectElementItems(element.items);
		        let selectedItem = orderStepsHelper.selectElementItem(element.items, itemId);

		        switsInstalationRadio(selectedItem);

		        calcHelper.recalcAll();
		    });
		},
		removeEventMetringElementChange: function () {
		    for (let i = 0; i < eventMetringElements.length; i++) {
		        $(document).off('change', `input:radio[name^="${eventMetringElements[i]}"]`);
		    }

		    eventMetringElements = [];
		},


		setEventInstallingElementChange: function (elementId) {
		    eventInstallingElements.push(elementId);
		    $(document).on('change', `input:radio[name^="${elementId}"]`, function (event) {
		        let stepId = $(this).attr('step-id');
		        let elementId = $(this).attr('name');
		        let itemId = this.id;

		        let setp = orderStepsHelper.getStepOrNull(stepId);
		        let element = orderStepsHelper.getStepElementOrNull(setp, elementId);

		        orderStepsHelper.unselectElementItems(element.items);
		        let selectedItem = orderStepsHelper.selectElementItem(element.items, itemId);

		        calcHelper.recalcAll();
		    });
		},
		removeEventInstallingElementChange: function () {
		    for (let i = 0; i < eventInstallingElements.length; i++) {
		        $(document).off('change', `input:radio[name^="${eventInstallingElements[i]}"]`);
		    }

		    eventInstallingElements = [];
		},
		init: function (orderStepsHelperModule, templateHelperModule, calcHelperModule) {
		    orderStepsHelper = orderStepsHelperModule;
		    templateHelper = templateHelperModule;
		    calcHelper = calcHelperModule;
		}
	};

    return module;
}());