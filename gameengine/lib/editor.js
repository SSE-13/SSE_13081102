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
            //this.source = value ? "TX-birdge.png" : "TX-wall.png";
            this.walkable = value ? true : false;
        };
        return Tile;
    }(render.Bitmap));
    editor.Tile = Tile;
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        //texture;
        function ControlPanel(mapData, mapEditor) {
            var _this = this;
            _super.call(this);
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
            this.xt.y = 0;
            this.yt.x = 60;
            this.yt.y = 30;
            this.addChild(this.xt);
            this.addChild(this.yt);
            this.button = new ui.Button();
            this.button.width = 60;
            this.button.height = 30;
            this.button.x = 100;
            this.button.y = 60;
            this.addChild(this.button);
            var sucai = new render.TextField;
            sucai.text = "网络素材:";
            sucai.x = 0;
            sucai.y = 90;
            this.addChild(sucai);
            this.sucaibutton = new ui.Button;
            this.sucaibutton.x = 100;
            this.sucaibutton.y = 100;
            this.sucaibutton.height = 30;
            this.sucaibutton.width = 60;
            this.addChild(this.sucaibutton);
            this.button.onClick = function () {
                var x = parseInt(_this.xt.text) - 1;
                var y = parseInt(_this.yt.text) - 1;
                var tile = new Tile();
                tile = mapEditor.children[x * mapData[0].length + y];
                if (tile.walkable) {
                    _this.button.background.color = "#FF0000";
                    tile.source = texture[13]; //"TX-water.png";
                    _this.button.text = "否";
                    mapData[y][x] = 0;
                }
                else {
                    _this.button.background.color = "#0000FF";
                    tile.source = texture[15]; //"TX-ground.png";
                    _this.button.text = "是";
                    mapData[y][x] = 1;
                }
                _this.TXsource = tile.source;
                _this.sucaibutton.text = tile.source.substring(3, tile.source.length - 4);
                tile.setWalkable(mapData[y][x]);
                if (tile.source == _this.TXsource) {
                    _this.sucaibutton.background.color = "#0000FF";
                }
                else {
                    _this.sucaibutton.background.color = "#FF0000";
                }
            };
            this.sucaibutton.onClick = function () {
                var x = parseInt(_this.xt.text) - 1;
                var y = parseInt(_this.yt.text) - 1;
                var tile = new Tile();
                tile = mapEditor.children[x * mapData[0].length + y];
                tile.source = _this.TXsource;
                if (tile.source == _this.TXsource) {
                    _this.sucaibutton.background.color = "#0000FF";
                }
                else {
                    _this.sucaibutton.background.color = "#FF0000";
                }
            };
        }
        return ControlPanel;
    }(render.DisplayObjectContainer));
    editor.ControlPanel = ControlPanel;
})(editor || (editor = {}));
