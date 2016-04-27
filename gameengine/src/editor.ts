
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
        public xtext: string;
        public ytext: string;


        constructor() {
            super();
        }

        public setWalkable(value) {
            if(value!=0){
                this.walkable = true;
            }else{
                this.walkable = false;
            }
        }
    }


    export class ControlPanel extends render.DisplayObjectContainer {
        xt;
        yt;
        button;
        sucaibutton;
        undoButton;
        TXsource: String[];//当前用户所选素材的名字
        TXnum:Number[];
        TXwalkable: Boolean[];//当前用户所选素材的可走性

        constructor(mapData, mapEditor) {
            super();
            this.TXsource = [];
            this.TXwalkable = [];
            this.TXnum = [];
            
            var hang = new render.TextField;
            hang.text = "行数：";
            hang.x = 0;
            hang.y = 0;
            this.addChild(hang);

            var lie = new render.TextField;
            lie.text = "列数：";
            lie.x = 0;
            lie.y = 30;
            this.addChild(lie);

            var shifou = new render.TextField;
            shifou.text = "是否能走：";
            shifou.x = 0;
            shifou.y = 60;
            this.addChild(shifou);

            this.xt = new render.TextField;
            this.yt = new render.TextField;
            this.xt.x = 60;
            this.xt.y = 30;
            this.yt.x = 60;
            this.yt.y = 0;
            this.addChild(this.xt);
            this.addChild(this.yt);

            this.button = new ui.Button();
            this.button.width = 60;
            this.button.height = 30;
            this.button.x = 100;
            this.button.y = 60;
            this.addChild(this.button);

            var sucai = new render.TextField;
            sucai.text = "网格素材:"
            sucai.x = 0;
            sucai.y = 90;
            this.addChild(sucai);

            this.sucaibutton = new ui.Button;
            this.sucaibutton.x = 100;
            this.sucaibutton.y = 100;
            this.sucaibutton.height = 30;
            this.sucaibutton.width = 60;
            this.addChild(this.sucaibutton);            
            
            var savebutton = new render.Bitmap();
            savebutton.source = "save.png"
            savebutton.height = 50;
            savebutton.x = 0;
            savebutton.y = 380;
            this.addChild(savebutton);
            
            var undobutton = new render.Bitmap();
            undobutton.source = "backout.png"
            undobutton.height = 50;
            undobutton.x = 0;
            undobutton.y = 420;
            this.addChild(undobutton);
            
            eventCore.register(savebutton, events.displayObjectRectHitTest, Save);
            
            
            function Save(save:ui.Button) {
                storage.saveFile();
                alert("保存成功");
            }
            
            eventCore.register(undobutton, events.displayObjectRectHitTest, Undo);
            
            
            function Undo(back:ui.Button) {
               if (invoke.canUndo()) {
                    invoke.undo();
                } else {
                    alert("已无可撤销指令");
                }
            }



            this.button.onClick = () => {//设置是否可走响应
                var x = parseInt(this.xt.text) - 1;
                var y = parseInt(this.yt.text) - 1;
                if (x >= 0 && y >= 0) {//若用户已选中地图网格

                    var tile;
                    tile = mapEditor.children[y * mapData[0].length + x];
                    console.log(tile);
                    var cbc = new Cmd.CommandButtonClick(this.button,this.TXsource,this.TXwalkable,this.TXnum,this.sucaibutton,tile);
                    cbc.getPara(x,y,textureData[y][x],mapData[y][x],this.button.background.color,this.button.text,this.TXsource[0],this.TXwalkable[0],this.TXnum[0],this.sucaibutton.text,this.sucaibutton.background.color,tile.source,mapData[y][x]);
                    invoke.setCommand(cbc);
                    
                    if (tile.walkable) {//网格可走->网格不可走
                        this.button.background.color = "#FF0000";
                        tile.source = texture[13];//"TX-water.png";            
                        this.button.text = "否";
                        
                        textureData[y][x] = 13;
                        mapData[y][x] = 0;
                    }
                    else {//网格不可走->网格可走
                        this.button.background.color = "#0000FF";
                        tile.source = texture[14];//"TX-ground.png";
                        this.button.text = "是";
                        
                        textureData[y][x] = 14;
                        mapData[y][x] = 1;
                    }
                    
                    tile.setWalkable(mapData[y][x]);
                    
                    this.TXsource[0] = tile.source;
                    this.TXwalkable[0] = tile.walkable;
                    this.TXnum[0] = tile.sourceNum;
                    
                    this.sucaibutton.text = tile.source.substring(3, tile.source.length - 4);
                    //地图网格可走性变化需对用户所选素材相关信息进行变化
                    

                    if (tile.source == this.TXsource[0]) {//赋素材按钮变化
                        this.sucaibutton.background.color = "#0000FF";
                    } else {
                        this.sucaibutton.background.color = "#FF0000";
                    }
                }else{
                    alert("未选可编辑地图区域");//若用户未选中地图网格
                }
            }




            this.sucaibutton.onClick = () => {//赋素材响应
                if (this.TXsource[0]) {//若用户已选中素材
                    var x = parseInt(this.xt.text) - 1;
                    var y = parseInt(this.yt.text) - 1;
                    if (x >= 0 && y >= 0) {//若用户已选中地图网格
                        var tile;
                        tile = mapEditor.children[y * mapData[0].length + x];
                        console.log(tile.length);
                        
                        var csbc = new Cmd.CommandSucaiButtonClick(this.sucaibutton, tile);
                        csbc.getPara(x,y,textureData[y][x],mapData[y][x],this.sucaibutton.background.color, tile.source,tile.sourceNum);
                        invoke.setCommand(csbc);
                        
                        tile.source = this.TXsource[0];//赋素材
                        tile.sourceNum = this.TXnum[0];
                        textureData[y][x] = tile.sourceNum;
                        
                        
                        switch (tile.source) {
                            case "TX-key.png":
                                mapData[y][x] = 9;
                                break;
                            case "TX-box1.3.png":
                                mapData[y][x] = 11;
                                break;
                            case "TX-box2.3.png":
                                mapData[y][x] = 12;
                                break;
                            default:
                                if (tile.walkable) {
                                    mapData[y][x] = 1;
                                } else {
                                    mapData[y][x] = 0;
                                }
                                break;
                        }

                        if (tile.source == this.TXsource[0]) {//赋素材按钮变化
                            this.sucaibutton.background.color = "#0000FF";
                        } else {
                            this.sucaibutton.background.color = "#FF0000";
                        }
                    } else {
                        alert("未选可编辑地图区域");//若用户未选中地图网格
                    }
                } else {
                    alert("未选素材");//若用户未选中素材
                }

            }

        }
    }

}


