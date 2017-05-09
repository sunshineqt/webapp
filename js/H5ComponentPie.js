/**
 * Created by sxt on 2017/2/25.
 */
/*饼图对象*/
var H5ComponentPie=function(name,cfg) {
    var component = new H5ComponentBase(name, cfg);
    /*  component.text('test');用于测试用的*/
    //绘制网格线;--背景层
    var w = cfg.width;
    var h = cfg.height;
    /*加入一个画布，用于制作网格线背景*/
    var cns = document.createElement('canvas');
    /*在该元素下创建画布*/
    var ctx = cns.getContext('2d');
    /*获取canvas的2d对象*/
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 1);
    component.append(cns);

    //加入一个底图层
    var r = w / 2;
    ctx.beginPath();
    ctx.fillStyle = "#eee";//灰色
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    ctx.arc(r, r, r, 0, 2 * Math.PI);//画圆
    ctx.fill();
    ctx.stroke();

    //绘制一个数据层
    var cns = document.createElement('canvas');
    /*上面定义的画布画好了现在定义的变量将其覆盖也没关系*/
    var ctx = cns.getContext('2d');
    /*获取canvas的2d对象*/
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 2);
    component.append(cns);

    var colors = ['red', 'green', 'blue', 'pink', 'orange'];//饼图颜色备用
    var sAngel = 1.5 * Math.PI;//设置开始的角度在12点位置
    var eAngel = 0;//结束角度
    var aAngel = Math.PI * 2;//100%的圆结束的角度，2pi=360度

    var step = cfg.data.length;//项目个数
    for (var i = 0; i < step; i++) {
        var item = cfg.data[i];
        var color = item[2] || (item[2] = colors.pop());
        eAngel = sAngel + aAngel * item[1];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = .1;
        ctx.moveTo(r, r);//起始位置
        ctx.arc(r, r, r, sAngel, eAngel);//画圆
        ctx.fill();
        ctx.stroke();
        sAngel = eAngel;
 /*   }*/

    /*加入所有项目文本及百分比*/
    var text = $('<div class="text">');
    text.text(cfg.data[i][0]);
    var per = $('<div class="per">');
    per.text(cfg.data[i][1] * 100 + '%' );
    text.append(per);
    var x = r + Math.sin(.5 * Math.PI - sAngel) * r;
    var y = r + Math.cos(.5 * Math.PI - sAngel) * r;
    /*    text.css('left',x/2);
     text.css('top',y/2);*/
    if (x > w / 2) {
        text.css('left', x / 2);
    } else {
        text.css('right', (w - x) / 2);
    }
    if (y > h / 2) {
        text.css('top', y / 2);
    } else {
        text.css('bottom', (h - y) / 2);
    }
    if (cfg.data[i][2]) {
        text.css('color', cfg.data[i][2]);
        text.css('color','#fff');
        text.css('backgroundColor',cfg.data[i][2]);
    }
    text.css('opacity', 0);
    component.append(text);
 }

    /*加入一个蒙板层*/
    var cns=document.createElement('canvas');/*在该元素下创建画布*/
    var ctx=cns.getContext('2d');/*获取canvas的2d对象*/
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    $(cns).css('zIndex',3);
    component.append(cns);




    ctx.fillStyle="#eee";//灰色
    ctx.strokeStyle = "#eee";
    ctx.lineWidth=1;

    //生长动画
    var draw=function(per){
        ctx.clearRect(0,0,w,h);
        ctx.beginPath();
        ctx.moveTo(r,r);
        if(per<=0){
            ctx.arc(r,r,r,0,2*Math.PI);
            component.find('.text').css('opacity',0);
        }else{
            ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);//画圆,true表示逆向画
        }

        ctx.fill();
        ctx.stroke();

        if(per>=1){/*当文本动画完成之后将项目文本显示出来，并先进行重排*/
           component.find('.text').css('transition','all 0s');
            H5ComponentPie.reSort(component.find('.text'));/*里面参数即为项目文本*/
            component.find('.text').css('transition','all 1s');/*重排结束之后再定义动画时间*/
            component.find('.text').css('opacity',1);
            ctx.clearRect(0,0,w,h);
        }
      /*  console.log(per);*/
    }
    draw(0);


    component.on('onLoad',function(){
        //饼图的生长动画
        var s=0;//s表示总步长，即纵轴方向从0到1增长，初始值为0
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10+500);
        }
    });

    component.on('onLeave',function(){
        //饼图的生长动画,折线图的退场动画
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
/*重排项目文本元素*/
H5ComponentPie.reSort=function(list){
 /* console.log(list);/!*测试，看看会传什么*!/*/
    /*1.检测相交*/
    var compare=function(domA,domB){
           /*元素的位置，不用left，因为有时候left为auto*/
           var offsetA=$(domA).offset();
           var offsetB=$(domB).offset();
        /*domA的投影*/
           var shadowA_x=[offsetA.left,$(domA).width()+offsetA.left];
           var shadowA_y=[offsetA.top,$(domA).height()+offsetA.top];
        /*domB的投影*/
           var shadowB_x=[offsetB.left,$(domB).width()+offsetB.left];
           var shadowB_y=[offsetB.top,$(domB).height()+offsetB.top];
        /*是否为x轴上的相交*/
        var intersect_x=(shadowA_x[0]>shadowB_x[0]&&shadowA_x[0]<shadowB_x[1])||
            (shadowA_x[1]>shadowB_x[0]&&shadowA_x[1]<shadowB_x[1]);
        /*检测y轴投影是否相交*/
        var intersect_y=(shadowA_y[0]>shadowB_y[0]&&shadowA_y[0]<shadowB_y[1])||
            (shadowA_y[1]>shadowB_y[0]&&shadowA_y[1]<shadowB_y[1]);
       /*   console.log(intersect_x);*/
         return intersect_x && intersect_y ;
    }

    /*2.检测重排*/
    var reset=function(domA,domB){
       if($(domA).css('top')!='auto'){
        $(domA).css('top',parseInt($(domA).css('top'))+$(domB).height());
    }
        if($(domA).css('bottom')!='auto'){
            $(domA).css('bottom',parseInt($(domA).css('bottom'))+$(domB).height());
        }
    }
    /*定义将要重排的元素*/
    var willReset=[list[0]];
    $.each(list,function(i,domTarget){
       if(compare(willReset[willReset.length-1],domTarget)){
           willReset.push(domTarget);/*不会把自身加入到对比*/
       }

  /*      if(list[i+1]){
            console.log($(domTarget).text(),$(list[i+1]).text(),'相交',compare(domTarget,list[i+1]));

        }*/
    });
    if(willReset.length>1){
        $.each(willReset,function(){
            if(willReset[i+1]){
            reset(domA,willReset[i+1]);
            }
        });
        H5ComponentPie.reSort(willReset);
    }

}