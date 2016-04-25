//var fs = require("fs");

module data {
    export class Storage {

        public mapData;
        private static _instance: Storage;

        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }

        public createXMLHttpRequest(callback) {
            var xmlHttp;
            xmlHttp = new XMLHttpRequest();
            try {
                xmlHttp.open("GET", "json.txt", true);
                xmlHttp.send(null);
            }
            catch (exception) {
                alert("xmlHttp Fail");
            }
            
            xmlHttp.onload = ()=> {
                   if (xmlHttp.status == 200 || xmlHttp.status == 0) {
                    var result = xmlHttp.responseText;
                  //  alert(result);   
                    var mapData = JSON.parse(result);
                    this.mapData = mapData.map; 
                  //  alert(mapData.map);      
                    callback();

                }
                
            }
        }
        /*    public readFile() {
           var map_path = __dirname + "/map.json"
           var content = fs.readFileSync(map_path, "utf-8");
           var obj = JSON.parse(content);
           this.mapData = obj.map;
       }
   }
   */
    }
   

    /*
      创建xml请求
      
      export class createXMLHttpRequest {
          public xmlHttp: XMLHttpRequest;
          constructor() {
              this.xmlHttp = new XMLHttpRequest();
              try {
                  this.xmlHttp.onreadystatechange = handleStateChange;
                  this.xmlHttp.open("GET", "Json.txt", true);
                  this.xmlHttp.send(null);
              }
              catch (exception) {
                  alert("xmlHttp Fail");
              }
          }
          handleStateChange() {
              if (this.xmlHttp.readyState == 4) {
                  if (this.xmlHttp.status == 200 || this.xmlHttp.status == 0) {
                      var result = this.xmlHttp.responseText;
                      var json = eval("(" + result + ")");
                      alert(json.programmers[0].firstName);//读取json数据
                      //alert(json.sex);
                  }
              }
          }
      }
      */

}