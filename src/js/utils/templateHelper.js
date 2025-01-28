import $ from "jquery";
import _ from 'underscore';


export default (function() {

    const templateDictionary = {
        compiledTemplates: [],
        get: function(templateId) {
            const keyPair = _(templateDictionary.compiledTemplates).find(item => {
                return item.id === templateId;
            });

            let compiledTemplate;
            if (keyPair) {
                compiledTemplate = keyPair.compiledTemplate;
            } else {
                const html = $(`#${templateId}`).html();
                compiledTemplate = templateDictionary.add(templateId, html);
            }

            return compiledTemplate;
        },
        add: function(id, html) {
            const compiledTemplate = _.template(html);
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