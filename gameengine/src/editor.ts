
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

            var butt= new ui.Button;
            butt.x = 100;
            butt.y = 60;
            butt.height = 30;
            butt.width = 60;
         //   butt.label.text = "是"
          this.addChild(butt);
   
            butt.onClick = () =>{
                if(butt.background.color =="#0000FF"){
                //  butt.text="fou"
                    butt.background.color = "#FF0000"
                             butt.canwalk = false;
                }
                else{
                //   butt.text = "shi"
                    butt.background.color = "#0000FF"
                             butt.canwalk = true;
                }
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
               
                    sucaibutton.background.color = "#FF0000"
                             sucaibutton.canwalk = false;
                }
                else{
           
                    sucaibutton.background.color = "#0000FF"
                             sucaibutton.canwalk = true;
                }
                
        }
        
    }

