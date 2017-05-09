/**
 * Created by sxt on 2017/2/25.
 */
/*��ͼ�������*/
var H5ComponentPolyline=function(name,cfg){
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

    //ˮƽ�����ߣ�100�ݣ���ǰ����Ϊ10��
    var step=10;//���廭�����ܹ�����Ϊ10����10������
    ctx.beginPath();//����Ҫ��ʼ������
    ctx.lineWidth=1;//���廭�ʵĿ��
    ctx.strokeStyle="#AAAAAA";//���廭�ʵ���ɫ
    window.ctx=ctx;
    for(var i=0;i<step+1;i++){ //+1��ʾ������ײ���һ������
     /*   ctx.moveTo(0,0);//���ʿ�ʼ�ĵط�
        ctx.lineTo(100,100);//���ʽ�β�ĵط�
        ctx.stroke();//�ձ�
      */
        //400�ĸ߶ȷֳ�10�ݣ�ÿ��Ϊ40
        var y=(h/step)*i;//ÿ�����ߵ�����y��ֵ
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);//ÿ���߽�β�ĺ���Ϊ���w������Ϊy
    }
    //��ֱ������
        step=cfg.data.length+1;//��ֱ�������м�����Ҫȡ������Ŀ�ĸ�������1��ʾ��ֵ�ں��ߺ����߽��㴦�������Ҫ�໭һ��
         var text_w=w/step >> 0;   //����text�Ŀ��,������λ����ҪС��
      for(var i=0;i<step+1;i++){//��1��ʾ���ߵ����һ����β
          var x=(w/step)*i;
          ctx.moveTo(x,0);
          ctx.lineTo(x,h);//��ֱ�ߵ�xΪctx�Ŀ������Ŀ�������ٳ��Ե�ǰ�ڼ�����Ŀi
       if(cfg.data[i]){ //���һ��ѭ��û����Ŀ���ݣ����Ե���Ŀ������ʱ��ִ���������

           var text=$('<div class="text">');
           text.text(cfg.data[i][0]);//��text���ı���Ϣ��Ϊ��ǰ��i����Ŀ�ĵ�1���±�Ϊ0�������ݼ�
           //����text�Ŀ�Ⱥ�left
           text.css('width',text_w/2).css('left',x/2-text_w/4+text_w/2);
          /* //������Կ�����ô�ı����ı����������ζ�������*/
           component.append(text);//����ǰdomԪ��text��ӽ����
       }

      }
        ctx.stroke();//������β


   //����һ������--���ݲ�Ϊ�����������´���������Ϊ��������������ǲ��ϱ仯�ģ�����һ����������
    var cns=document.createElement('canvas');/*�ڸ�Ԫ���´�������*/
    var ctx=cns.getContext('2d');/*��ȡcanvas��2d����*/
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    component.append(cns);

//�����߲������ɺ���.�������߼���Ӧ�����ݺ���Ӱ
    //per 0��1֮������ݣ���������ֵ�����������ݶ�Ӧ���м�״̬
    var draw=function(per){
        //��ջ���,��������ǰ��������Ϊ���Ͻ����꣬����������Ϊ���½�����

        ctx.clearRect(0,0,w,h);
        //������������,
        ctx.beginPath();//����Ҫ��ʼ������
        ctx.lineWidth=3;//���廭�ʵĿ��
        ctx.strokeStyle="#ff8878";//���廭�ʵ���ɫ

//��canvas��Բ�ķ�ʽ�������ϵĵ��ע����
        var x=0;
        var y=0;
        /* ctx.moveTo(10,10);
         ctx.arc(10,10,5,0,2*Math.PI);
         //��һ������ΪԲ��Բ�����꣬����������ΪԲ�İ뾶�������������ΪԲ����ʼ���Ⱥͽ�β����
         ctx.stroke();*/

        /* step=cfg.data.length+1;*/
        var row_w=w / (cfg.data.length + 1);
        //����
        for(i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i+row_w;
            //xΪ��ǰ��ȳ�����Ŀ����,�Ӻź���Ϊ�ѽ����ϵ�ֵ������һ��λ�ã�ǰ������������Ϊ������
           /* y = h*(1-item[1]);*///��yֵΪ��ǰdata�ж�Ӧ��Ŀ��ֵ���Ի����߶�h����1������Ϊ����������
            y=h-(item[1]*h*per);
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
        }

        //����
        //�ƶ����ʵ���һ�����ݵĵ�λ��
       /* ctx.moveTo(row_w,h*(1-cfg.data[0][1]));*/
        ctx.moveTo(row_w,h-(cfg.data[0][1]*h*per));
        for(i in cfg.data){
            var item=cfg.data[i];
            x=row_w*i+row_w;
            /*y=h*(1-item[1]);*///�������յĵ�yֵ
            y=h-(item[1]*h*per);//������ߵ�һ��λ��
            ctx.lineTo(x,y);
        }
        ctx.stroke();
        ctx.lineWidth=1;//����������Ӱ�������ȥ
        ctx.strokeStyle="rgba(255,255,255,0)";
        //������Ӱ
        ctx.lineTo(x,h);//���һ�����ݵ��λ�ã�xΪ���ݵ�ĺ����꣬yΪ������ĵײ�
        ctx.lineTo(row_w,h);//��һ�����ݵ��λ�ã�h��ʾ�����ĸ߶�
        ctx.fillStyle=('rgba(255, 136, 120, 0.2)');
        ctx.fill();

        //д����
        for(i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i+row_w;
            //xΪ��ǰ��ȳ�����Ŀ����,�Ӻź���Ϊ�ѽ����ϵ�ֵ������һ��λ�ã�ǰ������������Ϊ������
           /* y = h*(1-item[1]);*///��yֵΪ��ǰdata�ж�Ӧ��Ŀ��ֵ���Ի����߶�h����1������Ϊ����������
            y=h-(item[1]*h*per);
            ctx.fillStyle=item[2]?item[2]:'#595959';//������ݵ㶨������ɫ����ʾ��������һ����ɫ
            ctx.fillText(((item[1]*100)>>0)+'%',x-10,y-10);//��ÿ��������������
        }


        ctx.stroke();
    }
  /*draw(1);*///ͨ����������per��ֵ���Ըı����ݵ��λ�ã�0��1,1Ϊ�������ݵ��λ��

    component.on('onLoad',function(){
        //����ͼ����������
        var s=0;//s��ʾ�ܲ����������᷽���0��1��������ʼֵΪ0
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10);
        }
    });

    component.on('onLeave',function(){
        //����ͼ����������,����ͼ���˳�����
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