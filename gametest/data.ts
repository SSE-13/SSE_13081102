//var fs = require("fs");

module data {
    export class Storage {

        public _mapData;
        public _mapTexture;
        private static _instance: Storage;

        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }
/**
 * 此函数需要一个函数参数callback,并在此函数内部调用它，以达到读取完数据再创建地图的效果
 * 防止json数据没读取完就创建地图，此时参数为空
 */
        public createXMLHttpRequest(callback) {
            var xmlHttp;
            xmlHttp = new XMLHttpRequest();
            try {
                xmlHttp.open("GET", "json2.txt", true);
                xmlHttp.send(null);
            }
            catch (exception) {
                alert("xmlHttp Fail");
            }

            xmlHttp.onload = () => {
                if (xmlHttp.status == 200 || xmlHttp.status == 0) {
                    var result = xmlHttp.responseText;
                    //alert(result);   
                    var mapData = JSON.parse(result);
                    this._mapData = mapData.map;
                    this._mapTexture = mapData.texture; 
                    //   alert(mapData.map);     
                    //   alert(mapData.texture); 
                    callback();

                }

            }
        }
    }
}