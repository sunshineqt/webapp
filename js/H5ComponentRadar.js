/**
 * Created by sxt on 2017/2/25.
 */
/*雷达组件对象*/
var H5ComponentRadar=function(name,cfg){
     var component=new H5ComponentBase(name,cfg);
    /*  component.text('test');用于测试用的*/
    //绘制网格线;--背景层
    var w=cfg.width;
    var h=cfg.height;
    /*加入一个画布，用于制作网格线背景*/
    var cns=document.createElement('canvas');/*在该元素下创建画布*/
    var ctx=cns.getContext('2d');/*获取canvas的2d对象*/
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    component.append(cns);

    var step=cfg.data.length;//项目个数，也是下面的多边形顶点数
    //画圆
    var r=w/2;
 /*   ctx.beginPath();
    ctx.arc(r,r,5,0,2*Math.PI);//因为在正方形内画圆，所以其半径和x、y坐标值都一样r，这是最里面圆心，半径设为5
    ctx.stroke();//把线关闭掉

    var r=w/2;
    ctx.beginPath();
    ctx.arc(r,r,r,0,2*Math.PI);//因为在正方形内中点画圆，所以其半径和x、y坐标值都一样rz，这是大圆
    ctx.stroke();//把线关闭掉*/

    //计算一个圆周上的坐标（计算多边形的顶点坐标）
    //已知：圆心坐标（a，b），半径r，角度deg，rad弧度
    //rad=(2*Math.PI/360)*(360/step)*i
    //x=a+Math.sin(rad)*r;
    //y=b+Math.cos(rad)*r;

    //绘制网格背景（分成10份，分面绘制）
    var isBlue=false;
    for(var s=10;s>0;s--){
        ctx.beginPath();
        for(var i=0;i<step;i++){
            var rad=(2*Math.PI/360)*(360/step)*i;
            var x=r+Math.sin(rad)*r*(s/10);//后面乘以(s/10)比例是为了每层面之间都有点间隔，不是完全重合
            var y=r+Math.cos(rad)*r*(s/10);
            ctx.fillStyle=(isBlue=!isBlue)?'#99c0ff':'#f1f9ff';//分面绘制，共10面相互交叉覆盖，需要设置相邻面的颜色不同
            var r=w/2;

            /*
             ctx.beginPath();
             ctx.arc(x,y,5,0,2*Math.PI)
             ctx.stroke();
             //因为在正方形内的圆周上画圆，所以其半径和x、y坐标值都一样r，*/;

            ctx.lineTo(x,y);//每一个点用线连起来


            /*      ctx.beginPath();
             ctx.moveTo(r,r);
             ctx.lineTo(x,y);//网骨线
             ctx.stroke();//把线关闭掉*/
        }
        ctx.closePath();
        ctx.fill();//将中间填充//
     /*   ctx.stroke();//把线关闭掉*/

        /*   ctx.beginPath();
         for(var i=0;i<step;i++){
         var rad=(2*Math.PI/360)*(360/step)*i;
         var x=r+Math.sin(rad)*r*.5;
         var y=r+Math.cos(rad)*r*.5;
         var r=w/2;
         ctx.lineTo(x,y);//每一个点用线连起来

         }
         ctx.fillStyle="#F00";
         ctx.closePath();
         ctx.fill();//将中间填充
         ctx.stroke();//把线关闭掉
         //中间的部分
         */
    }
//基于数据长度绘制伞骨
    for(var i=0;i<step;i++){
        var rad=(2*Math.PI/360)*(360/step)*i;
        var x=r+Math.sin(rad)*r;
        var y=r+Math.cos(rad)*r;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);//网骨线

        //输出项目文字
        var text=$('<div class="text">');
        text.text(cfg.data[i][0]);

     //定义项目文字按顺序出现
        text.css('transition','all .5s '+i*.1+'s');//第一个延迟0.1秒，后面的延迟时间乘以i

     /*   text.css("left",x/2);//调整项目名称的位置
        text.css("top",y/2);*/
       if(x>w/2){
           text.css("left",x/2);
       }else{
           text.css("right",(w-x)/2);
       }
        if(y>h/2){
            text.css("top",y/2);
        }else{
            text.css("bottom",(h-y)/2);
        }
        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2]);
        }
        text.css('opacity',0);
        component.append(text);
    }
    ctx.strokeStyle="#e0e0e0";
    ctx.stroke();//把线关闭掉
//数据层的开发
    /*加入一个画布，用于制作数据层*/
    var cns=document.createElement('canvas');/*在该元素下创建画布*/
    var ctx=cns.getContext('2d');/*获取canvas的2d对象*/
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    component.append(cns);

   ctx.strokeStyle="#f00";
    var draw=function(per){
        if(per<=1){
            component.find('.text').css('opacity',0);
        }
        if(per>=1){
            component.find('.text').css('opacity',1);
        }
     ctx.clearRect(0,0,w,h);//清空画布，防止颜色混乱
        //输出数据的折线
     for(var i=0;i<step;i++){
         var rad=(2*Math.PI/360)*(360/step)*i;
         var rate=cfg.data[i][1]*per;
         var x=r+Math.sin(rad)*r*rate;
         var y=r+Math.cos(rad)*r*rate;
         ctx.lineTo(x,y);
         //ctx.arc(x,y,5,0,2*Math.PI);
     }
        ctx.closePath();
        ctx.stroke();
        //输出数据的点
        ctx.fillStyle="#ff7676";
        for(var i=0;i<step;i++){
            var rad=(2*Math.PI/360)*(360/step)*i;
            var rate=cfg.data[i][1]*per;
            var x=r+Math.sin(rad)*r*rate;
            var y=r+Math.cos(rad)*r*rate;
            ctx.beginPath();
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }
   /* draw(1);*/
  /*draw(1);*///通过调整参数per的值可以改变数据点的位置，0到1,1为最终数据点的位置

    component.on('onLoad',function(){
        //雷达图的生长动画
        var s=0;//s表示总步长，即纵轴方向从0到1增长，初始值为0
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10);
        }
    });

    component.on('onLeave',function(){
        //雷达图的生长动画,折线图的退场动画
        var s=1;//s表示总步长，即纵轴方向从0到1增长，初始值为0
        for(i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s);

            },i*10+500);//后面的500ms表示时间延迟，为了让画布先下来再执行生长动画

        }

    });

     return component;
}