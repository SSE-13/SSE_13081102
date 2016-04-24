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
            this.color = value ? "#0000FF" : "#FF0000";
        };
        return Tile;
    }(render.Rect));
    editor.Tile = Tile;
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        function ControlPanel() {
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
            // var button = new ui.Button;
            // button.x=100;
            // button.y = 60;
            // button.width = 60;
            // button.height= 30;
            // button.onClick = () =>{
            // }
            // this.addChild(button);
            var sucai = new render.TextField;
            sucai.text = "网络素材:";
            sucai.x = 0;
            sucai.y = 90;
            this.addChild(sucai);
            var sucaibutton = new ui.Button;
            sucaibutton.x = 100;
            sucaibutton.y = 100;
            sucaibutton.height = 30;
            sucaibutton.width = 60;
            this.addChild(sucaibutton);
            sucaibutton.onClick = function () {
                if (sucaibutton.background.color == "#0000FF") {
                    //  sucaibutton.text="fou"
                    sucaibutton.background.color = "#FF0000";
                    sucaibutton.canwalk = false;
                }
                else {
                    //   sucaibutton.text = "shi"
                    sucaibutton.background.color = "#0000FF";
                    sucaibutton.canwalk = true;
                }
            };
        }
        return ControlPanel;
    }(render.DisplayObjectContainer));
    editor.ControlPanel = ControlPanel;
})(editor || (editor = {}));
