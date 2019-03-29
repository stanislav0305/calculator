var loggerModule = (function() {

    let module = {
        createLogger: function () {
            return {
                log: [],
                clear: function () {
                   this.log = [];
                },
                line: function () {
                    this.log.push("--------------------");
                },
                info: function (message) {
                    this.log.push(message);
                }
            };
        }
    };

    return module;
}());