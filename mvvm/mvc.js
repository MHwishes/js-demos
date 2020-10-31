function Model(){
    this.data ={};
    this.getData = function(){
        return this.data;
    }
    this.setData = function(obj){
        this.data = obj;
    }
}

function View(){
    let model;
    this.click = function(){
        const controller = new Controller();
        model = controller.render('MVC');
        var type = model.getData().type;
        console.log('<p>' + type + ' </p>');
    }
}


function Controller(){
    this.render = function(type){
        var model = new Model();
        //...处理业务
        model.setData({type:type});
        return model;
    }
}
 
const view = new View();
view.click();

// 整体流程是通过触发View中的click事件，click通知Controller操作对应的业务数据，
// 操作完成后更新Model数据。然后Controller将最新的Model返回到View中，View调用getData获取数据渲染页面。