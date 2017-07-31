import fetch from 'isomorphic-fetch'
import './style/base.css'
import Layer from './components/layer/layer.js'
import './components/layer/layer.less'

var dom = document.getElementById("app");
var layer = new Layer();
var message = {};

fetch('http://localhost:3000/nav')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        message.data = stories;
    });
fetch('http://localhost:3000/list')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        message.imglist = stories;
    });

fetch('http://localhost:3000/gamelist')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        message.list = stories;
        dom.innerHTML = layer.tpl(message);
    });