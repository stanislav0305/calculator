export default (function() {
    let templateHelper;
    let calculatorConfig;

    const getOrderMailBody = function(client, totalPrice, fileNames, logRows) {
        const data = {
            clientName: client.name,
            clientSurname: client.surname,
            clientPhone: client.phone,
            totalPrice: totalPrice,
            fileNames: fileNames,
            logRows: logRows
        };
        const html = templateHelper.getTemplateResult("order-mail", data);
        return html;
    };

    const module = {
        createOrderMailDataObj: function(client, totalPrice, fileNames, logRows, attachments) {
            return {
                SecureToken: calculatorConfig.SEND_ORDER_SECURE_TOKEN,
                To: calculatorConfig.SEND_ORDER_TO,
                From: calculatorConfig.SEND_ORDER_FROM,
                Subject: `${calculatorConfig.SEND_ORDER_SUBJECT} ${client.name} ${client.surname}`,
                Body: getOrderMailBody(client, totalPrice, fileNames, logRows),
                Attachments: attachments
            };
        },
        send: function(mailData) {
            const promise = Email.send(mailData);
            return promise;
        },
        init: function(templateHelperModule, calculatorConfigModule) {
            templateHelper = templateHelperModule;
            calculatorConfig = calculatorConfigModule;
        }
    };
    return module;
}());