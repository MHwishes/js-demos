
function Model(viewModel){
    this.viewModel=viewModel
    this.viewModel.bindModel(this);
    this.data={};
    this.getData = function(){
        return this.data;
    }
    this.setData = function(obj){
        this.data = obj;
        this.viewModel.onModelChange(this);
    }
}

function View(viewModel){
    this.viewModel=viewModel;
    this.viewModel.bindView(this);
    this.desc = 'MVC';
    this.show = function(desc){
        this.desc = desc || this.desc;
        console.log('<p>' + this.desc + '</p>');
    }
    this.editDesc = function(){
        this.desc = 'MVVM';
        this.viewModel.onViewChange(this);
    }
}

function ViewModel(){
    let selfModel;
    let selfView;
    let self=this;
    function binder(){
        self.bindModel=function(model){
            selfModel= model;
        }
        self.bindView=function(view){
            selfView=view;
        }
        self.onViewChange=function(view){
          selfModel.setData({desc: view.desc})
        }
        self.onModelChange=function(model){
           selfView.show(model.getData().desc)
        }
    }
    binder();
}

const viewModel = new ViewModel();
const model = new Model(viewModel);
const view = new View(viewModel);

view.show();
view.editDesc();
model.setData({desc:'hi,ma hong'})

// 页面发生change事件，触发editDesc事件，editDesc根据change元素的标记，触发viewModel对应的onChange事件。
// 反之当model发生变化时，会触发viewModel中对应的onChange事件，viewModel动态的修改view的内容。