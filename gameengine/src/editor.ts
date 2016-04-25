
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


    export class Tile extends render.Rect {


        public ownedRow: number;
        public ownedCol: number;
        public xposition: number;
        public yposition: number;
        public walkable: Boolean;
        public xtext:string;
        public ytext:string;
       
        constructor() {
            super();
            
        }

        public setWalkable(value) {
            this.color = value ? "#0000FF" : "#FF0000";
        }
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {
        xt;
        yt;
        button;
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
            this.button.onClick =()=>{
                var x = parseInt(this.xt.text) - 1;
                var y = parseInt(this.yt.text) - 1;
                var tile = new Tile();
                if (mapData[x][y] == 1) {
                    this.button.background.color = "#FF0000";
                    this.button.text = "否";
                    mapData[x][y] = 0;
                }
                else {
                    this.button.background.color = "#0000FF";
                    this.button.text = "是";
                    mapData[x][y] = 1;
                }
                tile = mapEditor.children[y * mapData[0].length + x];
                tile.setWalkable(mapData[x][y]);
            }
            
            var sucai = new render.TextField;
            sucai.text="网络素材:"
            sucai.x = 0;
            sucai.y = 90;
            this.addChild(sucai);
            
            var sucaibutton = new ui.Button;
            sucaibutton.x=100;
            sucaibutton.y = 100;
            sucaibutton.height = 30;
            sucaibutton.width = 60;

            this.addChild(sucaibutton);
            sucaibutton.onClick = () =>{
                if(sucaibutton.background.color =="#0000FF"){
                //  sucaibutton.text="fou"
                    sucaibutton.background.color = "#FF0000"
                             //sucaibutton.canwalk = false;
                }
                else{
                //   sucaibutton.text = "shi"
                    sucaibutton.background.color = "#0000FF"
                             //sucaibutton.canwalk = true;
                }
                
        }
        
    }
    }
}
