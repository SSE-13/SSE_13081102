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
        /**
         * 此函数需要一个函数参数callback,并在此函数内部调用它，以达到读取完数据再创建地图的效果
         * 防止json数据没读取完就创建地图，此时参数为空
         */
        Storage.prototype.createXMLHttpRequest = function (callback) {
            var _this = this;
            var xmlHttp;
            xmlHttp = new XMLHttpRequest();
            try {
                xmlHttp.open("GET", "json3.txt", true);
                xmlHttp.send(null);
            }
            catch (exception) {
                alert("xmlHttp Fail");
            }
            xmlHttp.onload = function () {
                if (xmlHttp.status == 200 || xmlHttp.status == 0) {
                    var result = xmlHttp.responseText;
                    //alert(result);   
                    var mapData = JSON.parse(result);
                    _this._mapData = mapData.map;
                    _this._mapTexture = mapData.texture;
                    //   alert(mapData.map);     
                    //   alert(mapData.texture); 
                    callback();
                }
            };
        };
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
