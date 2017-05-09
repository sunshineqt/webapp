/**
 * Created by sxt on 2017/2/25.
 */
/*柱图组件对象*/
var H5ComponentPolyline=function(name,cfg){
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

    //水平网格线，100份，当前设置为10份
    var step=10;//定义画布的总共步长为10，即10个横线
    ctx.beginPath();//声明要开始画画了
    ctx.lineWidth=1;//定义画笔的宽度
    ctx.strokeStyle="#AAAAAA";//定义画笔的颜色
    window.ctx=ctx;
    for(var i=0;i<step+1;i++){ //+1表示网格最底部的一条横线
     /*   ctx.moveTo(0,0);//画笔开始的地方
        ctx.lineTo(100,100);//画笔结尾的地方
        ctx.stroke();//收笔
      */
        //400的高度分成10份，每份为40
        var y=(h/step)*i;//每条横线的纵轴y的值
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);//每条线结尾的横轴为宽度w，纵轴为y
    }
    //垂直网格线
        step=cfg.data.length+1;//垂直网格线有几条主要取决于项目的个数，加1表示数值在横线和竖线交点处，因此需要多画一条
         var text_w=w/step >> 0;   //计算text的宽度,右移两位，不要小数
      for(var i=0;i<step+1;i++){//加1表示竖线的最后一根收尾
          var x=(w/step)*i;
          ctx.moveTo(x,0);
          ctx.lineTo(x,h);//垂直线的x为ctx的宽除以项目个数，再乘以当前第几个项目i
       if(cfg.data[i]){ //最后一次循环没有项目数据，所以当项目有数据时才执行下面操作

           var text=$('<div class="text">');
           text.text(cfg.data[i][0]);//给text添文本信息，为当前第i个项目的第1（下标为0）个数据加
           //设置text的宽度和left
           text.css('width',text_w/2).css('left',x/2-text_w/4+text_w/2);
          /* //这里可以考虑怎么改变让文本从左到右依次动画出现*/
           component.append(text);//将当前dom元素text添加进组件
       }

      }
        ctx.stroke();//划线收尾


   //加入一个画布--数据层为折线数据重新创建对象，因为折线这里的数据是不断变化的，会有一个动画过程
    var cns=document.createElement('canvas');/*在该元素下创建画布*/
    var ctx=cns.getContext('2d');/*获取canvas的2d对象*/
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    component.append(cns);

//将绘线部分做成函数.绘制折线及对应的数据和阴影
    //per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
    var draw=function(per){
        //清空画布,矩形区域，前两个参数为左上角坐标，后两个参数为右下角坐标

        ctx.clearRect(0,0,w,h);
        //绘制折线数据,
        ctx.beginPath();//声明要开始画画了
        ctx.lineWidth=3;//定义画笔的宽度
        ctx.strokeStyle="#ff8878";//定义画笔的颜色

//用canvas画圆的方式将折线上的点标注出来
        var x=0;
        var y=0;
        /* ctx.moveTo(10,10);
         ctx.arc(10,10,5,0,2*Math.PI);
         //第一二参数为圆的圆心坐标，第三个参数为圆的半径，第四五个参数为圆的起始弧度和结尾弧度
         ctx.stroke();*/

        /* step=cfg.data.length+1;*/
        var row_w=w / (cfg.data.length + 1);
        //画点
        for(i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i+row_w;
            //x为当前宽度除以项目个数,加号后面为把交点上的值往后移一个位置，前后两个竖线是为了美观
           /* y = h*(1-item[1]);*///，y值为当前data中对应项目的值乘以画布高度h，用1减是因为从上面数的
            y=h-(item[1]*h*per);
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
        }

        //划线
        //移动画笔到第一个数据的点位置
       /* ctx.moveTo(row_w,h*(1-cfg.data[0][1]));*/
        ctx.moveTo(row_w,h-(cfg.data[0][1]*h*per));
        for(i in cfg.data){
            var item=cfg.data[i];
            x=row_w*i+row_w;
            /*y=h*(1-item[1]);*///这是最终的点y值
            y=h-(item[1]*h*per);//这是其高的一半位置
            ctx.lineTo(x,y);
        }
        ctx.stroke();
        ctx.lineWidth=1;//这两步把阴影下面的线去
        ctx.strokeStyle="rgba(255,255,255,0)";
        //绘制阴影
        ctx.lineTo(x,h);//最后一个数据点的位置，x为数据点的横坐标，y为该纵轴的底部
        ctx.lineTo(row_w,h);//第一个数据点的位置，h表示画布的高度
        ctx.fillStyle=('rgba(255, 136, 120, 0.2)');
        ctx.fill();

        //写数据
        for(i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i+row_w;
            //x为当前宽度除以项目个数,加号后面为把交点上的值往后移一个位置，前后两个竖线是为了美观
           /* y = h*(1-item[1]);*///，y值为当前data中对应项目的值乘以画布高度h，用1减是因为从上面数的
            y=h-(item[1]*h*per);
            ctx.fillStyle=item[2]?item[2]:'#595959';//如果数据点定义了颜色则显示，否则定义一个颜色
            ctx.fillText(((item[1]*100)>>0)+'%',x-10,y-10);//给每个坐标点填充数据
        }


        ctx.stroke();
    }
  /*draw(1);*///通过调整参数per的值可以改变数据点的位置，0到1,1为最终数据点的位置

    component.on('onLoad',function(){
        //折线图的生长动画
        var s=0;//s表示总步长，即纵轴方向从0到1增长，初始值为0
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10);
        }
    });

    component.on('onLeave',function(){
        //折线图的生长动画,折线图的退场动画
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