var humanContainer = new render.DisplayObjectContainer();//容器
humanContainer.x= 60;
var human=new render.DisplayObjectContainer();
human.x=-50;
human.y=-65;
var head = new render.Bitmap();
head.x = 10;
head.y = -60;
var trunk = new render.Bitmap();
trunk.x = 18;
trunk.y=15;
var left_leg = new render.Bitmap();
var right_leg = new render.Bitmap();
var left_arm = new render.Bitmap();
var right_arm = new render.Bitmap();
left_leg.x = 3;
left_leg.y = 70;
right_leg.x = 40;
right_leg.y = 69;

left_arm.x = -38;
left_arm.y= 25;
right_arm.x = 55;
right_arm.y= 25;
head.source = "head.png";//图片源
trunk.source = "trunk.png";
left_leg.source = "left_leg.png";
right_leg.source = "right_leg.png";
left_arm.source = "left_arm.png";
right_arm.source = "right_arm.png";

humanContainer.addChild(human);//添加子节点
human.addChild(head)
human.addChild(left_leg)
human.addChild(right_leg)
human.addChild(left_arm)
human.addChild(right_arm)
human.addChild(trunk)

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png"]);
renderCore.start(humanContainer, ["trunk.png"]);
renderCore.start(humanContainer, ["left_arm.png"]);
renderCore.start(humanContainer, ["right_arm.png"]);
renderCore.start(humanContainer, ["left_leg.png"]);
renderCore.start(humanContainer, ["right_leg.png"]);


class HumanBody extends Body {
    
    
    vx:number = 5;
    r = Math.PI;

    onTicker(duringTime: number) {
        
         this.x = this.x + this.vx*duringTime;//向前移动
         this.rotation = this.rotation + this.r * duringTime;//滚动

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 5;
body.y = 200; 
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();
var HeadClicked = false;
var LegClicked = false;

var HitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    console.log(localPoint);
    if(localPoint.x > 0  && localPoint.x <= 78 && localPoint.y > 0 && localPoint.y <= 73){
        HeadClicked =true;
    }   
    if(localPoint.x > 12  && localPoint.x <= 59 && localPoint.y > 132 && localPoint.y <= 189){
        LegClicked =true;
    }   
    return true;
}

var OnClick = () => {
    //alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
    if(HeadClicked)
    {
        body.vx *= -1;
        body.r *= -1;
        HeadClicked = false;
    }
    if(LegClicked)
    {
        body.vx = 0;
        body.r = 0;
        body.rotation = 0;
        LegClicked = false;
    }
}


eventCore.register(head,HitTest,OnClick);










