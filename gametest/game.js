var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    game.GRID_PIXEL_WIDTH = 40;
    game.GRID_PIXEL_HEIGHT = 40;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap(pmapData) {
            _super.call(this);
            this.isDirty = true;
            this._mapData = pmapData;
            this.cache = document.createElement("canvas");
            this.cache.width = 480;
            this.cache.height = 480;
            var rows = this._mapData.length;
            var cols = this._mapData[0].length;
            var grid = new astar.Grid(rows, cols);
            this.grid = grid;
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    var value = this._mapData[i][j];
                    grid.setWalkable(j, i, value == 0 ? false : true); //0->不可走，0->可走
                    if (this._mapData[i][j] == 9) {
                        grid.getNode(j, i).isKey = true;
                    }
                    if (this._mapData[i][j] == 11) {
                        grid.getNode(j, i).isPumpkinClose = true;
                    }
                    if (this._mapData[i][j] == 12) {
                        grid.getNode(j, i).pumpkinLevel2 = true;
                    }
                }
            }
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    game.WorldMap = WorldMap;
    /*
    判断点击和添加贴图用
    */
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(source) {
            _super.call(this, source);
        }
        return Tile;
    }(render.Bitmap));
    game.Tile = Tile;
    /**
     *人物外观
     */
    var BoyShape = (function (_super) {
        __extends(BoyShape, _super);
        function BoyShape() {
            _super.call(this);
            var role = new render.Bitmap("TX-role.png");
            role.x = 0;
            role.y = 0;
            this.role = role;
            this.addChild(this.role);
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
            this.startX = 1;
            this.startY = 1;
            //   canClick: Boolean = true;//防止未到达终点时点击其他地方出现按的卡顿现象
            this.isGetKey = false;
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
            // console.log(grid.toString());
        };
        BoyBehaviour.prototype.onTicker = function (duringTime) {
            if (this.path != null) {
                // this.canClick = false;　//正在行走过程中不能点击
                if (this.steps < this.path.length) {
                    var targetNode;
                    targetNode = this.path[this.steps];
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
                        if (targetNode.isKey) {
                            targetNode.isKey = false;
                            this.isGetKey = true;
                            console.log("getKey");
                            /**
                             * 新建替换贴图
                             */
                            var newTile;
                            newTile = new game.Tile("TX-ground.png");
                            newTile.x = targetx;
                            newTile.y = targety;
                            newTile.ownedCol = targetx / this.width;
                            newTile.ownedRow = targety / this.height;
                            newTile.width = game.GRID_PIXEL_WIDTH;
                            newTile.height = game.GRID_PIXEL_HEIGHT;
                            this.map.addChild(newTile);
                        }
                        if (targetNode.isPumpkinClose && this.isGetKey) {
                            targetNode.isPumpkinClose = false;
                            astar.Node.isPumpkinOpen = true;
                            for (var i = 0; i < 4; i++) {
                                var newTile;
                                switch (i) {
                                    case 0:
                                        newTile = new game.Tile("TX-box2.1.png");
                                        newTile.x = targetx;
                                        newTile.y = targety - game.GRID_PIXEL_HEIGHT;
                                        newTile.ownedCol = newTile.x / this.width;
                                        newTile.ownedRow = newTile.y / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);
                                        break;
                                    case 1:
                                        newTile = new game.Tile("TX-box2.2.png");
                                        newTile.x = targetx + game.GRID_PIXEL_WIDTH;
                                        newTile.y = targety - game.GRID_PIXEL_HEIGHT;
                                        newTile.ownedCol = newTile.x / this.width;
                                        newTile.ownedRow = newTile.y / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);
                                        break;
                                    case 2:
                                        newTile = new game.Tile("TX-box2.3.png");
                                        newTile.x = targetx;
                                        newTile.y = targety;
                                        newTile.ownedCol = targetx / this.width;
                                        newTile.ownedRow = targety / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);
                                        break;
                                    case 3:
                                        newTile = new game.Tile("TX-box2.4.png");
                                        newTile.x = targetx + game.GRID_PIXEL_WIDTH;
                                        newTile.y = targety;
                                        newTile.ownedCol = newTile.x / this.width;
                                        newTile.ownedRow = newTile.y / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        if (astar.Node.isPumpkinOpen && targetNode.pumpkinLevel2) {
                            astar.Node.isPumpkinOpen = false;
                            for (var i = 0; i < 4; i++) {
                                var newTile;
                                switch (i) {
                                    case 0:
                                        newTile = new game.Tile("TX-box3.1.png");
                                        newTile.x = targetx;
                                        newTile.y = targety;
                                        newTile.ownedCol = newTile.x / this.width;
                                        newTile.ownedRow = newTile.y / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);
                                        //  console.log("0");
                                        break;
                                    case 1:
                                        newTile = new game.Tile("TX-box3.2.png");
                                        newTile.x = targetx + game.GRID_PIXEL_WIDTH;
                                        newTile.y = targety;
                                        newTile.ownedCol = newTile.x / this.width;
                                        newTile.ownedRow = newTile.y / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);
                                        break;
                                    case 2:
                                        newTile = new game.Tile("TX-box3.3.png");
                                        newTile.x = targetx;
                                        newTile.y = targety + game.GRID_PIXEL_HEIGHT;
                                        newTile.ownedCol = targetx / this.width;
                                        newTile.ownedRow = targety / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);
                                        break;
                                    case 3:
                                        newTile = new game.Tile("TX-box3.4.png");
                                        newTile.x = targetx + game.GRID_PIXEL_WIDTH;
                                        newTile.y = targety + game.GRID_PIXEL_HEIGHT;
                                        newTile.ownedCol = newTile.x / this.width;
                                        newTile.ownedRow = newTile.y / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
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
