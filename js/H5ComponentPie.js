/**
 * Created by sxt on 2017/2/25.
 */
/*��ͼ����*/
var H5ComponentPie=function(name,cfg) {
    var component = new H5ComponentBase(name, cfg);
    /*  component.text('test');���ڲ����õ�*/
    //����������;--������
    var w = cfg.width;
    var h = cfg.height;
    /*����һ���������������������߱���*/
    var cns = document.createElement('canvas');
    /*�ڸ�Ԫ���´�������*/
    var ctx = cns.getContext('2d');
    /*��ȡcanvas��2d����*/
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 1);
    component.append(cns);

    //����һ����ͼ��
    var r = w / 2;
    ctx.beginPath();
    ctx.fillStyle = "#eee";//��ɫ
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    ctx.arc(r, r, r, 0, 2 * Math.PI);//��Բ
    ctx.fill();
    ctx.stroke();

    //����һ�����ݲ�
    var cns = document.createElement('canvas');
    /*���涨��Ļ������������ڶ���ı������串��Ҳû��ϵ*/
    var ctx = cns.getContext('2d');
    /*��ȡcanvas��2d����*/
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 2);
    component.append(cns);

    var colors = ['red', 'green', 'blue', 'pink', 'orange'];//��ͼ��ɫ����
    var sAngel = 1.5 * Math.PI;//���ÿ�ʼ�ĽǶ���12��λ��
    var eAngel = 0;//�����Ƕ�
    var aAngel = Math.PI * 2;//100%��Բ�����ĽǶȣ�2pi=360��

    var step = cfg.data.length;//��Ŀ����
    for (var i = 0; i < step; i++) {
        var item = cfg.data[i];
        var color = item[2] || (item[2] = colors.pop());
        eAngel = sAngel + aAngel * item[1];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = .1;
        ctx.moveTo(r, r);//��ʼλ��
        ctx.arc(r, r, r, sAngel, eAngel);//��Բ
        ctx.fill();
        ctx.stroke();
        sAngel = eAngel;
 /*   }*/

    /*����������Ŀ�ı����ٷֱ�*/
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

    /*����һ���ɰ��*/
    var cns=document.createElement('canvas');/*�ڸ�Ԫ���´�������*/
    var ctx=cns.getContext('2d');/*��ȡcanvas��2d����*/
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    $(cns).css('zIndex',3);
    component.append(cns);




    ctx.fillStyle="#eee";//��ɫ
    ctx.strokeStyle = "#eee";
    ctx.lineWidth=1;

    //��������
    var draw=function(per){
        ctx.clearRect(0,0,w,h);
        ctx.beginPath();
        ctx.moveTo(r,r);
        if(per<=0){
            ctx.arc(r,r,r,0,2*Math.PI);
            component.find('.text').css('opacity',0);
        }else{
            ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);//��Բ,true��ʾ����
        }

        ctx.fill();
        ctx.stroke();

        if(per>=1){/*���ı��������֮����Ŀ�ı���ʾ���������Ƚ�������*/
           component.find('.text').css('transition','all 0s');
            H5ComponentPie.reSort(component.find('.text'));/*���������Ϊ��Ŀ�ı�*/
            component.find('.text').css('transition','all 1s');/*���Ž���֮���ٶ��嶯��ʱ��*/
            component.find('.text').css('opacity',1);
            ctx.clearRect(0,0,w,h);
        }
      /*  console.log(per);*/
    }
    draw(0);


    component.on('onLoad',function(){
        //��ͼ����������
        var s=0;//s��ʾ�ܲ����������᷽���0��1��������ʼֵΪ0
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10+500);
        }
    });

    component.on('onLeave',function(){
        //��ͼ����������,����ͼ���˳�����
        var s=1;//s��ʾ�ܲ����������᷽���0��1��������ʼֵΪ0
        for(i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s);

            },i*10+500);//�����500ms��ʾʱ���ӳ٣�Ϊ���û�����������ִ����������

        }

    });

     return component;
}
/*������Ŀ�ı�Ԫ��*/
H5ComponentPie.reSort=function(list){
 /* console.log(list);/!*���ԣ������ᴫʲô*!/*/
    /*1.����ཻ*/
    var compare=function(domA,domB){
           /*Ԫ�ص�λ�ã�����left����Ϊ��ʱ��leftΪauto*/
           var offsetA=$(domA).offset();
           var offsetB=$(domB).offset();
        /*domA��ͶӰ*/
           var shadowA_x=[offsetA.left,$(domA).width()+offsetA.left];
           var shadowA_y=[offsetA.top,$(domA).height()+offsetA.top];
        /*domB��ͶӰ*/
           var shadowB_x=[offsetB.left,$(domB).width()+offsetB.left];
           var shadowB_y=[offsetB.top,$(domB).height()+offsetB.top];
        /*�Ƿ�Ϊx���ϵ��ཻ*/
        var intersect_x=(shadowA_x[0]>shadowB_x[0]&&shadowA_x[0]<shadowB_x[1])||
            (shadowA_x[1]>shadowB_x[0]&&shadowA_x[1]<shadowB_x[1]);
        /*���y��ͶӰ�Ƿ��ཻ*/
        var intersect_y=(shadowA_y[0]>shadowB_y[0]&&shadowA_y[0]<shadowB_y[1])||
            (shadowA_y[1]>shadowB_y[0]&&shadowA_y[1]<shadowB_y[1]);
       /*   console.log(intersect_x);*/
         return intersect_x && intersect_y ;
    }

    /*2.�������*/
    var reset=function(domA,domB){
       if($(domA).css('top')!='auto'){
        $(domA).css('top',parseInt($(domA).css('top'))+$(domB).height());
    }
        if($(domA).css('bottom')!='auto'){
            $(domA).css('bottom',parseInt($(domA).css('bottom'))+$(domB).height());
        }
    }
    /*���彫Ҫ���ŵ�Ԫ��*/
    var willReset=[list[0]];
    $.each(list,function(i,domTarget){
       if(compare(willReset[willReset.length-1],domTarget)){
           willReset.push(domTarget);/*�����������뵽�Ա�*/
       }

  /*      if(list[i+1]){
            console.log($(domTarget).text(),$(list[i+1]).text(),'�ཻ',compare(domTarget,list[i+1]));

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