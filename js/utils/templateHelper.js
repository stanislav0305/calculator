let templateHelperModule = (function() {

    const tempalateDictionary = {
        compiledTemplates: [],
        get: function(templateId) {
            const keyPair = _(tempalateDictionary.compiledTemplates).find(item => {
                return item.id === templateId;
            });

            let compiledTemplate;
            if (keyPair) {
                compiledTemplate = keyPair.compiledTemplate;
            } else {
                const html = $(`#${templateId}`).html();
                compiledTemplate = tempalateDictionary.add(templateId, html);
            }

            return compiledTemplate;
        },
        add: function(id, html) {
            const compiledTemplate = _.template(html);
            tempalateDictionary.compiledTemplates.push({ id: id, compiledTemplate: compiledTemplate });

            return compiledTemplate;
        }
    };

    const module = {
        getTemplateResult: function(templateId, data) {
            const result = tempalateDictionary.get(templateId);

            if (data !== undefined) {
                return result(data);
            }

            return result;
        }
    };

    return module;
}());