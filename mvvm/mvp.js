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
    this.click = function(){
        const presenter = new Presenter();
        presenter.render('MVP');
    }
    this.show = function(type){
        console.log('<p>' + type + '</p>');
    }
}


function Presenter(){
    let view=new View();
    this.render = function(type){
        var model = new Model();
        //...处理业务
        model.setData({type:type});
        const modelType=model.getData().type;
        view.show(modelType)
    }
}
 
const view = new View();
view.click();

// 触发View中的click事件，click通知Presenter操作对应的业务数据，操作完成后Presenter更新Model数据，最后Presenter调用View的show接口渲染页面。