/**
 * Created by sxt on 2017/2/24.
 */
/*����ͼ���������*/

var H5ComponentBase=function(name,cfg){
    var cfg=cfg||{};
    var id=('h5_c_'+Math.random()).replace('.','_');
    //�ѵ�ǰ���齨�������ӵ���ʽ�н��б��
    var cls=' h5_component_' +cfg.type ;//classname
    var component=$('<div class="h5_component '+cls+' h5_component_name_'+ name+' + " id="'+id+'"></div>');
    cfg.text   && component.text(cfg.text);
    cfg.width  && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.css  &&  component.css(cfg.css);
    cfg.bg  &&  component.css('backgroundImage','url('+cfg.bg+')');
    if(cfg.center===true){//ˮƽ��ֱ����
        component.css({
            marginLeft:(cfg.width/4 * -1) + 'px',
            left:'50%'
        })
    }

    if(typeof cfg.onclick==='function'){
        component.on('click',cfg.onclick);
    }

    component.on('onLoad',function(){//��ǰ���������component
       setTimeout(function(){
           component.addClass(cls+'_load').removeClass(cls+'_leave');
           cfg.animateIn && component.animate(cfg.animateIn);
       },cfg.delay||0)    /*ʹ��setTimeout���������ӳ�ʱ��*/

        return false;
    })
    component.on('onLeave',function(){
       setTimeout(function () {
           component.addClass(cls+'_leave').removeClass(cls+'_load');
           cfg.animateOut && component.animate(cfg.animateOut);
       },cfg.delay||0)

        return false;
    })

    return component;
}