
module editor {


    export const GRID_PIXEL_WIDTH = 40;

    export const GRID_PIXEL_HEIGHT = 40;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;

        public isDirty = true;
        constructor() {

            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;

        }


        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }


    export class Tile extends render.Bitmap {


        public ownedRow: number;
        public ownedCol: number;
        public xposition: number;
        public yposition: number;
        public walkable: Boolean;
        public xtext:string;
        public ytext:string;
        
        private wall:render.Bitmap;
        private bridge:render.Bitmap;
       
        constructor() {
            super();
        }

        public setWalkable(value) {
            //this.source = value ? "TX-birdge.png" : "TX-wall.png";
            this.walkable = value ? true:false;
        }
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {
        xt;
        yt;
        button;
        sucaibutton;
        TXsource:String;
        //texture;
        constructor(mapData,mapEditor){
            super();
            
            
            
            var hang = new render.TextField;
            hang.text = "行数：";
            hang.x=0;
            hang.y =0;
            this.addChild(hang);
            
            var lie = new render.TextField;
            lie.text = "列数：";
            lie.x=0;
            lie.y=30;
            this.addChild(lie);
            
            var shifou = new render.TextField;
            shifou.text ="是否能走：";
            shifou.x = 0;
            shifou.y = 60;
            this.addChild(shifou);
            
            this.xt= new render.TextField;
            this.yt= new render.TextField;
            this.xt.x = 60;
            this.xt.y = 0;
            this.yt.x = 60;
            this.yt.y = 30;
            this.addChild(this.xt);
            this.addChild(this.yt);
            
            this.button = new ui.Button();
            this.button.width = 60;
            this.button.height = 30;
            this.button.x=100;
            this.button.y=60;
            this.addChild(this.button);
           
            var sucai = new render.TextField;
            sucai.text="网络素材:"
            sucai.x = 0;
            sucai.y = 90;
            this.addChild(sucai);
            
            this.sucaibutton = new ui.Button;
            this.sucaibutton.x=100;
            this.sucaibutton.y = 100;
            this.sucaibutton.height = 30;
            this.sucaibutton.width = 60;
            this.addChild(this.sucaibutton);
            
            
            
             
            this.button.onClick =()=>{
                var x = parseInt(this.xt.text) - 1;
                var y = parseInt(this.yt.text) - 1;
                var tile = new Tile();
                tile = mapEditor.children[x * mapData[0].length + y];
                if (tile.walkable) {
                    this.button.background.color = "#FF0000";
                    tile.source = texture[13];//"TX-water.png";
                    this.button.text = "否";
                    
                    mapData[y][x] = 0;
                }
                else {
                    this.button.background.color = "#0000FF";
                    tile.source = texture[14];//"TX-ground.png";
                    this.button.text = "是";
                    mapData[y][x] = 1;
                }
                this.TXsource = tile.source;
                this.sucaibutton.text = tile.source.substring(3,tile.source.length-4);
                
                tile.setWalkable(mapData[y][x]);
                
                if(tile.source == this.TXsource){
                    this.sucaibutton.background.color = "#0000FF";
                }else{
                    this.sucaibutton.background.color = "#FF0000";
                }
            }
            
            
            
            
            this.sucaibutton.onClick = () =>{
                var x = parseInt(this.xt.text) - 1;
                var y = parseInt(this.yt.text) - 1;
                var tile = new Tile();
                tile = mapEditor.children[x * mapData[0].length + y];
                
                tile.source = this.TXsource;
                 if(tile.source == this.TXsource){
                    this.sucaibutton.background.color = "#0000FF";
                }else{
                    this.sucaibutton.background.color = "#FF0000";
                }
                
        }
    
    }
}

}


