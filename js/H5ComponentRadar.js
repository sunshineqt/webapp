/**
 * Created by sxt on 2017/2/25.
 */
/*�״��������*/
var H5ComponentRadar=function(name,cfg){
     var component=new H5ComponentBase(name,cfg);
    /*  component.text('test');���ڲ����õ�*/
    //����������;--������
    var w=cfg.width;
    var h=cfg.height;
    /*����һ���������������������߱���*/
    var cns=document.createElement('canvas');/*�ڸ�Ԫ���´�������*/
    var ctx=cns.getContext('2d');/*��ȡcanvas��2d����*/
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    component.append(cns);

    var step=cfg.data.length;//��Ŀ������Ҳ������Ķ���ζ�����
    //��Բ
    var r=w/2;
 /*   ctx.beginPath();
    ctx.arc(r,r,5,0,2*Math.PI);//��Ϊ���������ڻ�Բ��������뾶��x��y����ֵ��һ��r������������Բ�ģ��뾶��Ϊ5
    ctx.stroke();//���߹رյ�

    var r=w/2;
    ctx.beginPath();
    ctx.arc(r,r,r,0,2*Math.PI);//��Ϊ�����������е㻭Բ��������뾶��x��y����ֵ��һ��rz�����Ǵ�Բ
    ctx.stroke();//���߹رյ�*/

    //����һ��Բ���ϵ����꣨�������εĶ������꣩
    //��֪��Բ�����꣨a��b�����뾶r���Ƕ�deg��rad����
    //rad=(2*Math.PI/360)*(360/step)*i
    //x=a+Math.sin(rad)*r;
    //y=b+Math.cos(rad)*r;

    //�������񱳾����ֳ�10�ݣ�������ƣ�
    var isBlue=false;
    for(var s=10;s>0;s--){
        ctx.beginPath();
        for(var i=0;i<step;i++){
            var rad=(2*Math.PI/360)*(360/step)*i;
            var x=r+Math.sin(rad)*r*(s/10);//�������(s/10)������Ϊ��ÿ����֮�䶼�е�����������ȫ�غ�
            var y=r+Math.cos(rad)*r*(s/10);
            ctx.fillStyle=(isBlue=!isBlue)?'#99c0ff':'#f1f9ff';//������ƣ���10���໥���渲�ǣ���Ҫ�������������ɫ��ͬ
            var r=w/2;

            /*
             ctx.beginPath();
             ctx.arc(x,y,5,0,2*Math.PI)
             ctx.stroke();
             //��Ϊ���������ڵ�Բ���ϻ�Բ��������뾶��x��y����ֵ��һ��r��*/;

            ctx.lineTo(x,y);//ÿһ��������������


            /*      ctx.beginPath();
             ctx.moveTo(r,r);
             ctx.lineTo(x,y);//������
             ctx.stroke();//���߹رյ�*/
        }
        ctx.closePath();
        ctx.fill();//���м����//
     /*   ctx.stroke();//���߹رյ�*/

        /*   ctx.beginPath();
         for(var i=0;i<step;i++){
         var rad=(2*Math.PI/360)*(360/step)*i;
         var x=r+Math.sin(rad)*r*.5;
         var y=r+Math.cos(rad)*r*.5;
         var r=w/2;
         ctx.lineTo(x,y);//ÿһ��������������

         }
         ctx.fillStyle="#F00";
         ctx.closePath();
         ctx.fill();//���м����
         ctx.stroke();//���߹رյ�
         //�м�Ĳ���
         */
    }
//�������ݳ��Ȼ���ɡ��
    for(var i=0;i<step;i++){
        var rad=(2*Math.PI/360)*(360/step)*i;
        var x=r+Math.sin(rad)*r;
        var y=r+Math.cos(rad)*r;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);//������

        //�����Ŀ����
        var text=$('<div class="text">');
        text.text(cfg.data[i][0]);

     //������Ŀ���ְ�˳�����
        text.css('transition','all .5s '+i*.1+'s');//��һ���ӳ�0.1�룬������ӳ�ʱ�����i

     /*   text.css("left",x/2);//������Ŀ���Ƶ�λ��
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
    ctx.stroke();//���߹رյ�
//���ݲ�Ŀ���
    /*����һ�������������������ݲ�*/
    var cns=document.createElement('canvas');/*�ڸ�Ԫ���´�������*/
    var ctx=cns.getContext('2d');/*��ȡcanvas��2d����*/
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
     ctx.clearRect(0,0,w,h);//��ջ�������ֹ��ɫ����
        //������ݵ�����
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
        //������ݵĵ�
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
  /*draw(1);*///ͨ����������per��ֵ���Ըı����ݵ��λ�ã�0��1,1Ϊ�������ݵ��λ��

    component.on('onLoad',function(){
        //�״�ͼ����������
        var s=0;//s��ʾ�ܲ����������᷽���0��1��������ʼֵΪ0
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10);
        }
    });

    component.on('onLeave',function(){
        //�״�ͼ����������,����ͼ���˳�����
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