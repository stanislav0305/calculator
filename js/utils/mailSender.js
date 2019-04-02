var mailSenderModule = (function () {
    let templateHelper;
    let calculatorConfig;

    let getOrderMailBody = function (client, totalPrice, logRows) {
        let data = {
            clientName: client.name,
            clientSurname: client.surname,
            clientPhone: client.phone,
            totalPrice: totalPrice,
            logRows: logRows
        };
        let html = templateHelper.getTemplateResult("order-mail", data);
        return html;
    };

    let module = {
        createOrderMailDataObj: function (client, totalPrice, logRows) {
            return {
                SecureToken: calculatorConfig.SEND_ORDER_SECURE_TOKEN,
                To: calculatorConfig.SEND_ORDER_TO,
                From: calculatorConfig.SEND_ORDER_FROM,
                Subject: `${calculatorConfig.SEND_ORDER_SUBJECT} ${client.name} ${client.surname}`,
                Body: getOrderMailBody(client, totalPrice, logRows)
            };
        },
        send: function (mailData) {
            let promise = Email.send(mailData);
            return promise;
        },
        init: function (templateHelperModule, calculatorConfigModule) {
            templateHelper = templateHelperModule;
            calculatorConfig = calculatorConfigModule;
        }
    };
    return module;
}());