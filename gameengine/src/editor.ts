
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

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
        
        constructor(){
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
            
var tile = new editor.Tile();
            var button= new ui.Button;
            button.x = 100;
            button.y = 60;
            button.height = 30;
            button.width = 60;
            button.text = " "
            console.log("kkk");
            var i=false;
            button.onClick = () =>{

            }
          
            this.addChild(button);
            
            
//             var tile = new editor.Tile;
//         //    tile.xtext = tile.xposition.toString();
//         //    tile.ytext = tile.yposition.toString();
//             var xt= new render.TextField;
// var yt= new render.TextField;

//  yt.text= tile.xtext;
//     xt.text= tile.ytext;
//     xt.x = 60;
// xt.y = 0;
// yt.x = 60;
// yt.y = 30;
// this.addChild(xt);
// this.addChild(yt);

    //         this.addChild(button);
    //          var walkable = mapData[tile.ownedRow][tile.ownedCol];
    // // if(walkable == 1){
    // //     bt.color="#FF0000";
    // //     console.log("d");
        
    // // }
    // // else {
    // //     bt.color="#0000FF";
    // // }
    // mapData[tile.ownedRow][tile.ownedCol]=walkable;
    // tile.setWalkable(walkable);
    // tile.walkable = mapData[tile.ownedRow][tile.ownedCol];
    // yt.text= tile.xtext;
    // xt.text= tile.ytext;      
            
}
        }
        
    }

