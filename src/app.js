import './style/base.css'
import Layer from './components/layer/layer.js'
import './components/layer/layer.less'

const App = function(){
	var dom = document.getElementById("app");
	var layer = new Layer();
	dom.innerHTML = layer.tpl({
		name: '赵阔田'
	});
}

new App