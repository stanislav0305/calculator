let loggerModule = (function() {

    const module = {
        createLogger: function() {
            return {
                log: [],
                clear: function() {
                    this.log = [];
                },
                getFiltredLog: function() {
                    return _(this.log).filter(row => {
                        return (row.isMainParamsCalcInfo === true ||
                            row.isCalcInfo === true ||
                            row.isInfo === true ||
                            row.isTotalSumInfo === true);
                    });
                },
                pushMessageObj: function(messageObj) {
                    const logRow = {
                        message: messageObj.message,
                        isHeader: messageObj.isHeader,
                        isCalcInfo: messageObj.isCalcInfo,
                        isMainParamsCalcInfo: messageObj.isMainParamsCalcInfo,
                        isLine: messageObj.isLine,
                        isInfo: messageObj.isInfo,
                        isTotalSumInfo: messageObj.isTotalSumInfo
                    };

                    this.log.push(logRow);
                },
                line: function() {
                    this.pushMessageObj({ message: "--------------------", isLine: true });
                },
                header: function(message) {
                    this.pushMessageObj({ message: message, isHeader: true });
                },
                calcInfo: function(message) {
                    this.pushMessageObj({ message: message, isCalcInfo: true });
                },
                mainParamsCalcInfo: function(message) {
                    this.pushMessageObj({ message: message, isMainParamsCalcInfo: true });
                },
                totalSumInfo: function(message) {
                    this.pushMessageObj({ message: message, isTotalSumInfo: true });
                },
                info: function(message) {
                    this.pushMessageObj({ message: message, isInfo: true });
                }
            };
        }
    };

    return module;
}());