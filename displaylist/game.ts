module game {


}

var humanContainer = new render.DisplayObjectContainer();//容器
var head = new render.Bitmap();
var trunk = new render.Bitmap();
var left_leg = new render.Bitmap();
var right_leg = new render.Bitmap();
var left_arm = new render.Bitmap();
var right_arm = new render.Bitmap();

head.source = "head.png";//图片源
trunk.source = "trunk.png";
left_leg.source = "left_leg.png";
right_leg.source = "right_leg.png";
left_arm.source = "left_arm.png";
right_arm.source = "right_arm.png";

humanContainer.addChild(head)//添加子节点
humanContainer.addChild(trunk)
humanContainer.addChild(left_leg)
humanContainer.addChild(right_leg)
humanContainer.addChild(left_arm)
humanContainer.addChild(right_arm)

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png"]);
renderCore.start(humanContainer, ["trunk.png"]);
renderCore.start(humanContainer, ["left_arm.png"]);
renderCore.start(humanContainer, ["right_arm.png"]);
renderCore.start(humanContainer, ["left_leg.png"]);
renderCore.start(humanContainer, ["right_leg.png"]);



class HumanBody extends Body {


    onTicker(duringTime: number) {

         this.x = this.x + this.vx*duringTime;//向前移动
         this.rotation = this.rotation+Math.PI;//滚动180度？
    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 5;
body.y = 300; 
ticker.start([body]);











