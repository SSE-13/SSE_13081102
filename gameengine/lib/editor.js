var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var editor;
(function (editor) {
    editor.GRID_PIXEL_WIDTH = 50;
    editor.GRID_PIXEL_HEIGHT = 50;
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
            var tile = new editor.Tile();
            var button = new ui.Button;
            button.x = 100;
            button.y = 60;
            button.height = 30;
            button.width = 60;
            button.text = " ";
            console.log("kkk");
            var i = false;
            button.onClick = function () {
            };
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
        return ControlPanel;
    }(render.DisplayObjectContainer));
    editor.ControlPanel = ControlPanel;
})(editor || (editor = {}));
