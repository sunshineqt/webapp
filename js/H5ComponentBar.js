/**
 * Created by sxt on 2017/2/25.
 */
/*��ͼ�������*/
var H5ComponentBar=function(name,cfg){
     var component=new H5ComponentBase(name,cfg);
    $.each(cfg.data,function(idx,item){
       // console.log(item);
        var line=$('<div class="line">');
        var name=$('<div class="name">');
        var rate=$('<div class="rate">');
        var per=$('<div class="per">');

       var width=item[1]*100 + '%';
        var bgStyle='';
        console.log(item[2]);
        if(item[2]){
            bgStyle='style="background-color:'+item[2]+'"';

        }


        rate.html('<div class="bg" '+bgStyle+'></div>');
        rate.css('width',width);
        name.text(item[0]);//item�ĵ�һ��Ԫ����ӵ�name��
        per.text(width);
        line.append( name ).append( rate ).append( per );//name��ӵ�����
        component.append(line);//line��ӵ������
    });
     return component;
}