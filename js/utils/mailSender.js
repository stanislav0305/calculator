var mailSenderModule = (function () {
    let templateHelper;

    let getOrderMailBody = function(client, logRows) {
        let data = {
            clientName: client.name,
            clientSurname: client.surname,
            clientPhone: client.phone,
            logRows: logRows
        };
        let html = templateHelper.getTemplateResult("order-mail", data);
        return html;
    };

    let module = {
        createMailDataObj: function (client, logRows) {
            return {};
        },
        send: function (mailObj) {
            /*
            var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            xmlhttp.open('POST', 'https://mandrillapp.com/api/1.0/messages/send.json');
            xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        alert('Mail sended!');
                    }
                    else if (xmlhttp.status == 500) {
                        alert('Check apikey');
                    } else {
                         alert('Request error');
                    }
                }
            }
            xmlhttp.send(JSON.stringify({
                'key': '28d569326a75f91b3456d978f4246bef-us20',
                'message': {
                    'from_email': 'mail_from@write.here',
                    'to': [{
                            'email': '0305stas@inbox.lv',
                            'type': 'to'
                    }],
                    'autotext': 'true',
                    'subject': 'Yeah!',
                    'html': '<h1>Its work!</h1>'
                }
            }));
            */
            /*
            var m = new mandrill.Mandrill('28d569326a75f91b3456d978f4246bef-us20'); // This will be public

            //function sendTheMail() {
                m.messages.send({
                    "message": {
                        "from_email": "stasmainwork@gmail.com",
                        "from_name": "Stas T",
                        "to": [{ "email": "0305stas@inbox.lv", "name": "stas" }], // Array of recipients
                        "subject": "optional_subject_line",
                        "text": "Text to be sent in the body" // Alternatively, use the "html" key to send HTML emails rather than plaintext
                    }
                });
            */
            /*
            $.ajax({
                type: "POST",
                url: "https://mandrillapp.com/api/1.0/messages/send.json",
                data: {
                    'key': '28d569326a75f91b3456d978f4246bef-us20',
                    'message': {
                        'from_email': 'stasmainwork@gmail.com',
                        'to': [
                            {
                                'email': '0305stas@inbox.lv',
                                'name': 'Stas',
                                'type': 'to'
                            }
                        ],
                        'subject': 'title',
                        'html': 'html can be used'
                    }
                }
            });
            */
            
            Email.send({
                SecureToken: '8d5f32b2-df68-46ab-b8f8-22e21e06bbb1',
                To: '0305stas@inbox.lv',
                From: "stasmainwork@gmail.com",
                Subject: "TEST This is the subject",
                Body: "TEST And this is the body"
            }).then(
                message => alert(message)
            );
            
            //Email.send("stasmainwork@gmail.com",
            //    "0305stas@inbox.lv",
            //    "Hello",
            //    "SMTP JS",
            //    "smtp.gmail.com",
            //    "stasmainwork@gmail.com",
            //    "stas+work+28");
        },
        init: function (templateHelperModule) {
            templateHelper = templateHelperModule;
        }
    };
    return module;
}());