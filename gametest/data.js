//var fs = require("fs");
var data;
(function (data) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.getInstance = function () {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        };
        Storage.prototype.createXMLHttpRequest = function () {
            var xmlHttp;
            xmlHttp = new XMLHttpRequest();
            try {
                //        xmlHttp.onreadystatechange = handleStateChange;
                xmlHttp.open("GET", "Json.txt", true);
                xmlHttp.send(null);
            }
            catch (exception) {
                alert("xmlHttp Fail");
            }
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200 || xmlHttp.status == 0) {
                    var result = xmlHttp.responseText;
                    var json = eval("(" + result + ")");
                    this.mapData = json;
                    alert(json.programmers[0].firstName); //读取json数据
                }
            }
        };
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
