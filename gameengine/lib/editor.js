var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var editor;
(function (editor) {
    editor.GRID_PIXEL_WIDTH = 40;
    editor.GRID_PIXEL_HEIGHT = 40;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            this.isDirty = true;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    editor.WorldMap = WorldMap;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile() {
            _super.call(this);
        }
        Tile.prototype.setWalkable = function (value) {
            if (value != 0) {
                this.walkable = true;
            }
            else {
                this.walkable = false;
            }
        };
        return Tile;
    }(render.Bitmap));
    editor.Tile = Tile;
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        function ControlPanel(mapData, mapEditor) {
            var _this = this;
            _super.call(this);
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
            sucai.text = "网格素材:";
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
            savebutton.source = "save.png";
            savebutton.height = 50;
            savebutton.x = 0;
            savebutton.y = 380;
            this.addChild(savebutton);
            var undobutton = new render.Bitmap();
            undobutton.source = "backout.png";
            undobutton.height = 50;
            undobutton.x = 0;
            undobutton.y = 420;
            this.addChild(undobutton);
            eventCore.register(savebutton, events.displayObjectRectHitTest, Save);
            function Save(save) {
                storage.saveFile();
                alert("保存成功");
            }
            eventCore.register(undobutton, events.displayObjectRectHitTest, Undo);
            function Undo(back) {
                if (invoke.canUndo()) {
                    invoke.undo();
                }
                else {
                    alert("已无可撤销指令");
                }
            }
            this.button.onClick = function () {
                var x = parseInt(_this.xt.text) - 1;
                var y = parseInt(_this.yt.text) - 1;
                if (x >= 0 && y >= 0) {
                    var tile;
                    tile = mapEditor.children[y * mapData[0].length + x];
                    console.log(tile);
                    var cbc = new Cmd.CommandButtonClick(_this.button, _this.TXsource, _this.TXwalkable, _this.TXnum, _this.sucaibutton, tile);
                    cbc.getPara(x, y, textureData[y][x], mapData[y][x], _this.button.background.color, _this.button.text, _this.TXsource[0], _this.TXwalkable[0], _this.TXnum[0], _this.sucaibutton.text, _this.sucaibutton.background.color, tile.source, mapData[y][x]);
                    invoke.setCommand(cbc);
                    if (tile.walkable) {
                        _this.button.background.color = "#FF0000";
                        tile.source = texture[13]; //"TX-water.png";            
                        _this.button.text = "否";
                        textureData[y][x] = 13;
                        mapData[y][x] = 0;
                    }
                    else {
                        _this.button.background.color = "#0000FF";
                        tile.source = texture[14]; //"TX-ground.png";
                        _this.button.text = "是";
                        textureData[y][x] = 14;
                        mapData[y][x] = 1;
                    }
                    tile.setWalkable(mapData[y][x]);
                    _this.TXsource[0] = tile.source;
                    _this.TXwalkable[0] = tile.walkable;
                    _this.TXnum[0] = tile.sourceNum;
                    _this.sucaibutton.text = tile.source.substring(3, tile.source.length - 4);
                    //地图网格可走性变化需对用户所选素材相关信息进行变化
                    if (tile.source == _this.TXsource[0]) {
                        _this.sucaibutton.background.color = "#0000FF";
                    }
                    else {
                        _this.sucaibutton.background.color = "#FF0000";
                    }
                }
                else {
                    alert("未选可编辑地图区域"); //若用户未选中地图网格
                }
            };
            this.sucaibutton.onClick = function () {
                if (_this.TXsource[0]) {
                    var x = parseInt(_this.xt.text) - 1;
                    var y = parseInt(_this.yt.text) - 1;
                    if (x >= 0 && y >= 0) {
                        var tile;
                        tile = mapEditor.children[y * mapData[0].length + x];
                        console.log(tile.length);
                        var csbc = new Cmd.CommandSucaiButtonClick(_this.sucaibutton, tile);
                        csbc.getPara(x, y, textureData[y][x], mapData[y][x], _this.sucaibutton.background.color, tile.source, tile.sourceNum);
                        invoke.setCommand(csbc);
                        tile.source = _this.TXsource[0]; //赋素材
                        tile.sourceNum = _this.TXnum[0];
                        textureData[y][x] = tile.sourceNum;
                        if (tile.source == "TX-key.png") {
                            mapData[y][x] = 9;
                        }
                        else if (tile.source == "TX-box1.3.png" || tile.source == "TX-box2.3.png") {
                            mapData[y][x] = 11;
                        }
                        else if (tile.source == "TX-box1.1.png" || tile.source == "TX-box2.1.png") {
                            mapData[y][x] = 12;
                        }
                        else {
                            if (tile.walkable) {
                                mapData[y][x] = 1;
                            }
                            else {
                                mapData[y][x] = 0;
                            }
                        }
                        // switch (tile.source) {
                        //     case "TX-key.png":
                        //         mapData[y][x] = 9;
                        //         break;
                        //     case "TX-box1.3.png":
                        //         mapData[y][x] = 11;
                        //         break;
                        //     case "TX-box1.1.png":
                        //         mapData[y][x] = 12;
                        //         break;
                        //     default:
                        //         if (tile.walkable) {
                        //             mapData[y][x] = 1;
                        //         } else {
                        //             mapData[y][x] = 0;
                        //         }
                        //         break;
                        // }
                        if (tile.source == _this.TXsource[0]) {
                            _this.sucaibutton.background.color = "#0000FF";
                        }
                        else {
                            _this.sucaibutton.background.color = "#FF0000";
                        }
                    }
                    else {
                        alert("未选可编辑地图区域"); //若用户未选中地图网格
                    }
                }
                else {
                    alert("未选素材"); //若用户未选中素材
                }
            };
        }
        return ControlPanel;
    }(render.DisplayObjectContainer));
    editor.ControlPanel = ControlPanel;
})(editor || (editor = {}));
