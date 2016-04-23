var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var eventCore = events.EventCore.getInstance();
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            var _this = this;
            _super.call(this);
            this._text = " ";
            this.background = new render.Rect();
            this.background.width = this.width;
            this.background.height = this.height;
            this.label = new render.TextField();
            this.label.width = this.width;
            this.label.height = this.height;
            this.label.x = -20;
            this.label.y = 0;
            this.label.textAlign = "center";
            this.label.text = this.text;
            this.addChild(this.background);
            this.addChild(this.label);
            // var i =0;
            eventCore.register(this, events.displayObjectRectHitTest, function () {
                if (_this.onClick()) {
                    _this.onClick();
                    //     i++;
                    //     if (i/2==0) {
                    //         this.background.color = "#FF0000"
                    //     }
                    //      else{
                    //     this.background.color = "#0000FF"
                    // }
                    //     console.log(i);
                    var tile = new editor.Tile();
                    var button = new ui.Button;
                    var walkable = mapData[tile.ownedRow][tile.ownedCol];
                    if (walkable == 1) {
                        button.background.color = "#FF0000";
                        console.log("d");
                    }
                    else {
                        button.background.color = "#0000FF";
                    }
                    mapData[tile.ownedRow][tile.ownedCol] = walkable;
                    tile.setWalkable(walkable);
                    tile.walkable = mapData[tile.ownedRow][tile.ownedCol];
                }
            });
        }
        Object.defineProperty(Button.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                this._text = value;
                this.label.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                this.background.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                this.background.height = value;
            },
            enumerable: true,
            configurable: true
        });
        return Button;
    }(render.DisplayObjectContainer));
    ui.Button = Button;
})(ui || (ui = {}));
