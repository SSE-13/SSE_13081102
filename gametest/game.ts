module game {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;


    export class WorldMap extends render.DisplayObjectContainer {

        private cache: HTMLCanvasElement;
        public isDirty = true;

        public grid: astar.Grid;
        private mapData;
        //  public _tile:game.Tile;
        constructor(mapData) {
            super();
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
                    var value = mapData[i][j]
                    grid.setWalkable(j, i, value == 0 ? false : true);//0->不可走，0->可走

                }
            }
            //       grid.setWalkable(5, 0, false);
        }

        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }
    /*
    判断点击用
    */
    export class Tile extends render.Bitmap {

        public ownedRow: number;
        public ownedCol: number;

        constructor(source: string) {
            super(source);
        }
    }

    export class Material extends render.DisplayObject {
        materials: Array<render.Bitmap>;
        constructor() {
            super();
            this.materials = [];
        }
        public addMaterial(material: render.Bitmap) {
            this.materials.push(material);
        }
        render(context) {
            for (var i = 0; i < this.materials.length; i++) {
                var child = this.materials[i];
                child.draw(context);//画的位置怎么确定？？
            }
        }




    }

    /**
     *人物外观
     */
    export class BoyShape extends render.DisplayObjectContainer {

        constructor() {
            super();
            var head = new render.Bitmap("head.png");
            head.x = 0;
            head.y = 0;
            this.addChild(head);
        }

    }
    /**
     * 人物行为
     */
    export class BoyBehaviour extends Body {
        width = game.GRID_PIXEL_WIDTH;
        height = game.GRID_PIXEL_HEIGHT;
        steps = 1;
        path;
        private startX = 0;
        private startY = 0;

        

        public run(grid: astar.Grid, row, col) {
            if (grid.getWalkable(col, row)) {
                grid.setStartNode(this.startX, this.startY);
                grid.setEndNode(col, row);
                var findpath = new astar.AStar();
                findpath.setHeurisitic(findpath.diagonal);
                var result = findpath.findPath(grid);//A*里面的方法，传入起点和终点
                this.path = findpath._path;
                console.log(this.path)
                if (this.path != null) {
                    this.startX = col;//网格的坐标和数组的坐标相反
                    this.startY = row;
                }

            } else {
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
        }

        public onTicker(duringTime) {


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
                    }//移动
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
                        if (this.steps == this.path.length-1) {
                            this.steps = 1;
                            this.path = null;
                        } else {
                            this.steps += 1;
                        }
                    }
                }
            }

        }
    }
}

