let miscHelperModule = (function() {

    const module = {
        isPositiveInteger: function(s) {
            return !!s.match(/^[0-9]+$/);
        },
        getFormData: function(formSelector) {
            let out = {};

            const serializedArr = $(formSelector).serializeArray();
            _(serializedArr).each(record => {
                out[record.name] = record.value;
            });

            return out;
        }
    };

    return module;
}());