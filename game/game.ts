module game {


    export const GRID_PIXEL_WIDTH = 40;

    export const GRID_PIXEL_HEIGHT = 40;


    export class WorldMap extends render.DisplayObjectContainer {

        private cache: HTMLCanvasElement;
        public isDirty = true;
        public grid: astar.Grid;
        private _mapData;

        constructor(pmapData) {
            super();
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

                    var value = this._mapData[i][j]
                    grid.setWalkable(j, i, value == 0 ? false : true);//0->不可走，0->可走
                    
                    if (this._mapData[i][j] == 9)//"map"中用9表示网格处是钥匙
                    {
                        grid.getNode(j, i).isKey = true;
                    }
                    if(this._mapData[i][j] == 11)//"map"中用11表示网格处是TX-box1.3.png图片&&TX-box2.3.png
                    {
                        grid.getNode(j,i).isPumpkinClose = true;
                    }
                    if(this._mapData[i][j] == 12)//"map"中用12表示网格处是TX-box1.1.png图片&&TX-box2.1.png
                    {
                        grid.getNode(j,i).pumpkinLevel2 = true;
                    }
                }
            }  
        }

        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }
    /*
    判断点击和添加贴图用
    */
    export class Tile extends render.Bitmap {

        public ownedRow: number;
        public ownedCol: number;

        constructor(source: string) {
            super(source);
        }
    }


    /**
     *人物外观
     */
    export class BoyShape extends render.DisplayObjectContainer {
        role: render.Bitmap;

        constructor() {
            super();
            var role = new render.Bitmap("TX-role.png");
            role.x = 0;
            role.y = 0;
            this.role = role;
            this.addChild(this.role);

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
        private startX = 1;
        private startY = 1;
        //   canClick: Boolean = true;//防止未到达终点时点击其他地方出现按的卡顿现象
        isGetKey: Boolean = false;
        map: game.WorldMap;

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
            // console.log(grid.toString());
        }

        public onTicker(duringTime) {
            if (this.path != null) { 
                // this.canClick = false;　//正在行走过程中不能点击
                if (this.steps < this.path.length) {
                    var targetNode: astar.Node;
                    targetNode = this.path[this.steps];

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
                          //  eventCore.register(newTile, events.displayObjectRectHitTest, onTileClick);
                        }
                        if (targetNode.isPumpkinClose && this.isGetKey) {
                            targetNode.isPumpkinClose = false;
                            astar.Node.isPumpkinOpen = true;
           
                            for (var i = 0; i < 4; i++) {
                                var newTile;
                                switch (i) {
                                    case 0://左上
                                        newTile = new game.Tile("TX-box2.1.png");
                                        newTile.x = targetx;
                                        newTile.y = targety - GRID_PIXEL_HEIGHT;
                                        newTile.ownedCol = newTile.x / this.width;
                                        newTile.ownedRow = newTile.y / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);   
                                        break;
                                    case 1://右上
                                        newTile = new game.Tile("TX-box2.2.png");
                                        newTile.x = targetx + GRID_PIXEL_WIDTH;
                                        newTile.y = targety - GRID_PIXEL_HEIGHT;
                                        newTile.ownedCol = newTile.x / this.width;
                                        newTile.ownedRow = newTile.y / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);
                                        break;
                                    case 2://左下（与targetNode位置一致）
                                        newTile = new game.Tile("TX-box2.3.png");
                                        newTile.x = targetx;
                                        newTile.y = targety;
                                        newTile.ownedCol = targetx / this.width;
                                        newTile.ownedRow = targety / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);
                                        break;
                                    case 3://右下
                                        newTile = new game.Tile("TX-box2.4.png");
                                        newTile.x = targetx + GRID_PIXEL_WIDTH;
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
                                    case 0://左上（与targetNode位置一致）
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
                                    case 1://右上
                                        newTile = new game.Tile("TX-box3.2.png");
                                        newTile.x = targetx + GRID_PIXEL_WIDTH;
                                        newTile.y = targety;
                                        newTile.ownedCol = newTile.x / this.width;
                                        newTile.ownedRow = newTile.y / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);
                                        break;
                                    case 2://左下
                                        newTile = new game.Tile("TX-box3.3.png");
                                        newTile.x = targetx;
                                        newTile.y = targety+GRID_PIXEL_HEIGHT;
                                        newTile.ownedCol = targetx / this.width;
                                        newTile.ownedRow = targety / this.height;
                                        newTile.width = game.GRID_PIXEL_WIDTH;
                                        newTile.height = game.GRID_PIXEL_HEIGHT;
                                        this.map.addChild(newTile);
                                        break;
                                    case 3://右下
                                        newTile = new game.Tile("TX-box3.4.png");
                                        newTile.x = targetx + GRID_PIXEL_WIDTH;
                                        newTile.y = targety+GRID_PIXEL_HEIGHT;
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
                            // this.canClick = true;
                        } else {
                            this.steps += 1;
                        }
                    }
                }
            }
        }
    }
}

