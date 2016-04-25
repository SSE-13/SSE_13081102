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
        Storage.prototype.createXMLHttpRequest = function (callback) {
            var _this = this;
            var xmlHttp;
            xmlHttp = new XMLHttpRequest();
            try {
                xmlHttp.open("GET", "json.txt", true);
                xmlHttp.send(null);
            }
            catch (exception) {
                alert("xmlHttp Fail");
            }
            xmlHttp.onload = function () {
                if (xmlHttp.status == 200 || xmlHttp.status == 0) {
                    var result = xmlHttp.responseText;
                    //  alert(result);   
                    var mapData = JSON.parse(result);
                    _this.mapData = mapData.map;
                    //  alert(mapData.map);      
                    callback();
                }
            };
        };
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
