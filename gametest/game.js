var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    game.GRID_PIXEL_WIDTH = 50;
    game.GRID_PIXEL_HEIGHT = 50;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        //  public _tile:game.Tile;
        function WorldMap(mapData) {
            _super.call(this);
            this.isDirty = true;
            this.mapData = mapData;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
            var rows = mapData.length;
            var cols = mapData[0].length;
            var grid = new astar.Grid(rows, cols);
            this.grid = grid;
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    var value = mapData[i][j];
                    grid.setWalkable(j, i, value == 0 ? false : true); //0->不可走，0->可走
                }
            }
            //       grid.setWalkable(5, 0, false);
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    game.WorldMap = WorldMap;
    /*
    判断点击用
    */
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(source) {
            _super.call(this, source);
        }
        return Tile;
    }(render.Bitmap));
    game.Tile = Tile;
    var Material = (function (_super) {
        __extends(Material, _super);
        function Material() {
            _super.call(this);
            this.materials = [];
        }
        Material.prototype.addMaterial = function (material) {
            this.materials.push(material);
        };
        Material.prototype.render = function (context) {
            for (var i = 0; i < this.materials.length; i++) {
                var child = this.materials[i];
                child.draw(context); //画的位置怎么确定？？
            }
        };
        return Material;
    }(render.DisplayObject));
    game.Material = Material;
    /**
     *人物外观
     */
    var BoyShape = (function (_super) {
        __extends(BoyShape, _super);
        function BoyShape() {
            _super.call(this);
            var head = new render.Bitmap("head.png");
            head.x = 0;
            head.y = 0;
            this.addChild(head);
        }
        return BoyShape;
    }(render.DisplayObjectContainer));
    game.BoyShape = BoyShape;
    /**
     * 人物行为
     */
    var BoyBehaviour = (function (_super) {
        __extends(BoyBehaviour, _super);
        function BoyBehaviour() {
            _super.apply(this, arguments);
            this.width = game.GRID_PIXEL_WIDTH;
            this.height = game.GRID_PIXEL_HEIGHT;
            this.steps = 1;
            this.startX = 0;
            this.startY = 0;
        }
        BoyBehaviour.prototype.run = function (grid, row, col) {
            if (grid.getWalkable(col, row)) {
                grid.setStartNode(this.startX, this.startY);
                grid.setEndNode(col, row);
                var findpath = new astar.AStar();
                findpath.setHeurisitic(findpath.diagonal);
                var result = findpath.findPath(grid); //A*里面的方法，传入起点和终点
                this.path = findpath._path;
                console.log(this.path);
                if (this.path != null) {
                    this.startX = col; //网格的坐标和数组的坐标相反
                    this.startY = row;
                }
            }
            else {
                console.log(grid.getWalkable(col, row));
                console.log("此处不可走");
            }
            //console.log(result);
            //console.log(this.path.length);
            // grid.setStartNode(0, 0);//????
            // this.x = grid.startNode.x * this.width; //起始坐标
            // this.y = grid.startNode.y * this.height;
            // grid.setEndNode(x, y);
            // var findpath = new astar.AStar();
            // findpath.setHeurisitic(findpath.diagonal);
            // var result = findpath.findPath(grid);
            // this.path = findpath._path;
            // console.log(this.path);
            // console.log(grid.toString());
        };
        BoyBehaviour.prototype.onTicker = function (duringTime) {
            if (this.path != null) {
                // console.log("onTicker");
                //  console.log(this.path);
                // console.log(this.steps);
                // console.log(this.path.length);
                if (this.steps < this.path.length) {
                    var targetNode = this.path[this.steps];
                    var targetx = targetNode.x * this.width;
                    var targety = targetNode.y * this.height;
                    if (this.x < targetx) {
                        this.x = (this.x + this.vx * duringTime > targetx) ? targetx : (this.x + this.vx * duringTime);
                    } //移动
                    if (this.x > targetx) {
                        this.x = (this.x - this.vx * duringTime < targetx) ? targetx : (this.x - this.vx * duringTime);
                    }
                    if (this.y < targety) {
                        this.y = (this.y + this.vy * duringTime > targety) ? targety : (this.y + this.vy * duringTime);
                    }
                    if (this.y > targety) {
                        this.y = (this.y - this.vy * duringTime < targety) ? targety : (this.y - this.vy * duringTime);
                    }
                    if (this.x == targetx && this.y == targety) {
                        if (this.steps == this.path.length - 1) {
                            this.steps = 1;
                            this.path = null;
                        }
                        else {
                            this.steps += 1;
                        }
                    }
                }
            }
        };
        return BoyBehaviour;
    }(Body));
    game.BoyBehaviour = BoyBehaviour;
})(game || (game = {}));
