var fs = require("fs");

module data {

    export class Storage {

        private static _instance: Storage;

        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }



        
        public readFile() {
            var map_path = __dirname + "/map.json"
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj[0].map;
            this.textureData = obj[1].texture;
            //console.log(this.textureData[1][0]);
        }
        
        public saveFile(){
            
        }
        
        public mapData;
        public textureData;

    }



}