var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    game.GRID_PIXEL_WIDTH = 50;
    game.GRID_PIXEL_HEIGHT = 50;
    //   const NUM_ROWS = 12;
    //   const NUM_COLS = 12;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        //  public _tile:game.Tile;
        function WorldMap(mapData) {
            _super.call(this);
            this.isDirty = true;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
            var rows = mapData.length;
            var cols = mapData[0].length;
            var grid = new astar.Grid(rows, cols);
            this.grid = grid;
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    grid.setWalkable(i, j, mapData[i][j]);
                }
            }
            //       grid.setWalkable(5, 0, false);
        }
        WorldMap.prototype.render = function (context) {
            context.strokeStyle = '#FF0000';
            context.beginPath();
            var rows = mapData.length;
            var cols = mapData[0].length;
            for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {
                    context.rect(i * game.GRID_PIXEL_WIDTH, j * game.GRID_PIXEL_HEIGHT, game.GRID_PIXEL_WIDTH, game.GRID_PIXEL_HEIGHT);
                    if (!this.grid.getNode(i, j).walkable) {
                        context.fillStyle = '#000000'; //黑色画笔             
                    }
                    else {
                        context.fillStyle = '#0000FF'; //blue画笔    
                    }
                    context.fillRect(i * game.GRID_PIXEL_WIDTH, j * game.GRID_PIXEL_HEIGHT, game.GRID_PIXEL_WIDTH, game.GRID_PIXEL_HEIGHT);
                    context.strokeRect(i * game.GRID_PIXEL_WIDTH, j * game.GRID_PIXEL_HEIGHT, game.GRID_PIXEL_WIDTH, game.GRID_PIXEL_HEIGHT);
                }
            }
            context.closePath();
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    game.WorldMap = WorldMap;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile() {
            _super.call(this);
        }
        return Tile;
    }(render.Rect));
    game.Tile = Tile;
    var BoyShape = (function (_super) {
        __extends(BoyShape, _super);
        function BoyShape() {
            _super.apply(this, arguments);
        }
        BoyShape.prototype.render = function (context) {
            context.beginPath();
            context.fillStyle = '#00FFFF'; //青色
            context.arc(game.GRID_PIXEL_WIDTH / 2, game.GRID_PIXEL_HEIGHT / 2, Math.min(game.GRID_PIXEL_WIDTH, game.GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        };
        return BoyShape;
    }(render.DisplayObject));
    game.BoyShape = BoyShape;
    var BoyBody = (function (_super) {
        __extends(BoyBody, _super);
        function BoyBody() {
            _super.apply(this, arguments);
            this.width = game.GRID_PIXEL_WIDTH;
            this.height = game.GRID_PIXEL_HEIGHT;
            this.steps = 1;
        }
        //?????构造函数怎么写！！？？设置移动起点？？
        /*    constructor(){
                super();
                grid.setStartNode(0, 0);
                
            }
        */
        BoyBody.prototype.run = function (grid, x, y) {
            grid.setStartNode(0, 0); //????
            this.x = grid.startNode.x * this.width; //起始坐标
            this.y = grid.startNode.y * this.height;
            grid.setEndNode(x, y);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            this.path = findpath._path;
            console.log(this.path);
            console.log(grid.toString());
        };
        BoyBody.prototype.onTicker = function (duringTime) {
            if (this.steps < this.path.length - 1) {
                var targetx = this.path[this.steps].x * this.width;
                var targety = this.path[this.steps].y * this.height;
                if (this.x < targetx) {
                    this.x = (this.x + this.vx * duringTime > targetx) ? targetx : (this.x + this.vx * duringTime);
                } //移动
                if (this.y < targety) {
                    this.y = (this.y + this.vy * duringTime > targety) ? targety : (this.y + this.vy * duringTime);
                }
                if (this.x == targetx && this.y == targety) {
                    this.steps += 1;
                }
            }
        };
        return BoyBody;
    }(Body));
    game.BoyBody = BoyBody;
})(game || (game = {}));
var boyShape = new game.BoyShape();
var world = new game.WorldMap(mapData);
var body = new game.BoyBody(boyShape);
//body.run(world.grid);
var renderCore = new render.RenderCore();
//renderCore.start([world, boyShape]);
var ticker = new Ticker();
ticker.start([body]);
ticker.onTicker();
