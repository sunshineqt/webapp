/* Created by sxt on 2017/2/25.*/
/*���ݹ������*/
var H5=function(){
    this.id=('h5_'+Math.random()).replace('.','_');
    this.el=$('<div class="h5" id="'+this.id+'">').hide();
    this.page=[];
    $('body').append(this.el);
    /*����һ��ҳ
    * @param {string} name ��������ƣ�����뵽ClassName��
    * @param{string} text ҳ�ڵ�Ĭ���ı�
    * @return {H5}H5���󣬿����ظ�ʹ��H5����֧�ֵķ���
    * */
    this.addPage=function(name,text){
        var page=$('<div class="h5_page section">');
        if(name != undefined){
            page.addClass('h5_page_'+name);
        }
        if(text != undefined){
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);
        if(typeof this.whenAddPage==='function'){
            this.whenAddPage();
        }
        return this;
    }

    /*����һ�����*/
    this.addComponent=function(name,cfg){
        var cfg=cfg||{};
        cfg= $.extend({    //���Ĭ��cfg����û��type���ԵĻ��������Ϊbase
            type:'base'
        },cfg);
        var component;//����һ���������洢���Ԫ��
        var page=this.page.slice(-1)[0];
        switch(cfg.type) {
            case 'base':
                component = new H5ComponentBase(name, cfg);
                break;
            case 'polyline':
                component = new H5ComponentPolyline(name, cfg);
                break;
            case 'bar':
                component = new H5ComponentBar(name, cfg);
                break;
            case 'pie':
                component = new H5ComponentPie(name, cfg);
                break;
            case 'radar':
                component = new H5ComponentRadar(name, cfg);
                break;
            case 'point':
                component = new H5ComponentPoint(name, cfg);
                break;
            case 'ring':
                component = new H5ComponentRing(name, cfg);
                component = new H5ComponentRing(name, cfg);
                break;
            default:
        }
        page.append(component);
        return this;
    }

/*H5�����ʼ������*/
    this.loader=function(){
        this.el.fullpage({
            onLeave:function(index,nextIndex,direction){
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function(anchorLink,index){
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find(".h5_component").trigger('onLoad');
        this.el.show();
    }

    return this;//����һ��h5����֮�󣬰ѱ���������󷵻ػ�ȥ
}
