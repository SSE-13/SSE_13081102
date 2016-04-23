module game {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    //   const NUM_ROWS = 12;
    //   const NUM_COLS = 12;


    export class WorldMap extends render.DisplayObjectContainer {

        private cache: HTMLCanvasElement;
        public isDirty = true;

        public grid: astar.Grid;
        //  public _tile:game.Tile;
        constructor(mapData) {
            super();
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

        render(context: CanvasRenderingContext2D) {
            context.strokeStyle = '#FF0000';
            context.beginPath();
            var rows = mapData.length;
            var cols = mapData[0].length;
            for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {
                    context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                    if (!this.grid.getNode(i, j).walkable) {
                        context.fillStyle = '#000000';//黑色画笔             
                    } else {
                        context.fillStyle = '#0000FF';//blue画笔    
                    }
                    context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                    context.strokeRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                }
            }
            context.closePath();
        }
    }

    export class Tile extends render.Rect {

        public ownedRow: number;
        public ownedCol: number;

        constructor() {
            super();
        }
    }



    export class BoyShape extends render.DisplayObject {
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#00FFFF';//青色
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }

    export class BoyBody extends Body {
        width = GRID_PIXEL_WIDTH;
        height = GRID_PIXEL_HEIGHT;
        steps = 1;
        path;
        //?????构造函数怎么写！！？？设置移动起点？？
        /*    constructor(){
                super();
                grid.setStartNode(0, 0);
                
            }
        */
        public run(grid, x, y) {
             grid.setStartNode(0, 0);//????
            this.x = grid.startNode.x * this.width; //起始坐标
            this.y = grid.startNode.y * this.height;
            grid.setEndNode(x, y);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            this.path = findpath._path;
            console.log(this.path);
            console.log(grid.toString());
        }

        public onTicker(duringTime) {
            if (this.steps < this.path.length - 1) {
                var targetx = this.path[this.steps].x * this.width;
                var targety = this.path[this.steps].y * this.height;
                if (this.x < targetx) {
                    this.x = (this.x + this.vx * duringTime > targetx) ? targetx : (this.x + this.vx * duringTime);
                }//移动
                if (this.y < targety) {
                    this.y = (this.y + this.vy * duringTime > targety) ? targety : (this.y + this.vy * duringTime);
                }
                if (this.x == targetx && this.y == targety) {
                    this.steps += 1;
                }
            }
        }
    }
}





var boyShape = new game.BoyShape();
var world = new game.WorldMap(mapData);
var body = new game.BoyBody(boyShape);
//body.run(world.grid);


var renderCore = new render.RenderCore();
//renderCore.start([world, boyShape]);

var ticker = new Ticker();
ticker.start([body]);
ticker.onTicker(); 
