var templateHelperModule = (function() {

    let tempalateDictionary = {
        compiledTemplates: [],
        get: function(templateId) {
            let compiledTemplate = _.find(tempalateDictionary.compiledTemplates,
                function(item) {
                    return item.id === templateId;
                });

            if (compiledTemplate === undefined) {
                let html = $(`#${templateId}`).html();
                compiledTemplate = tempalateDictionary.add(templateId, html);
            }

            return compiledTemplate;
        },
        add: function (id, html) {
            let compiledTemplate = _.template(html);
            tempalateDictionary.compiledTemplates.push({ id: id, compiledTemplate: compiledTemplate });

            return compiledTemplate;
        }
    }

    let module = {
        getTemplateResult: function (templateId, data) {
            let result = tempalateDictionary.get(templateId);

            if (data !== undefined) {
                return result(data);
            } 

            return result;
        }
    };

    return module;
}());