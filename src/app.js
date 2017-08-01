import fetch from 'isomorphic-fetch'
import './style/base.css'
import Layer from './components/layer/layer.js'
import './components/layer/layer.less'

var dom = document.getElementById("app");
var layer = new Layer();
var message = {};

// var li = document.querySelectorAll('li')
// console.log(typeof li)
// li.forEach(function(v,i){
//     console.log(v,i)
//     v.onclick = function(){
//         console.log(i)
//     }
// })

// var ul = document.querySelector('#main')
// for(var i = 0; i < ul.children.length; i++){
//     (function(i){
//         ul.children[i].onclick = function(){
//             console.log(i)
//         }
//     })(i)
// }

// const name = '天天'
//     name = '苦苦'
// console.log(name)

// const arr = [],
//       arr1 = arr
//       arr1.push('x')
// console.log(arr)

// function add(x,y = 6){
//     return x + y
// }
// console.log(add(2,7))

// const fruit = ['applle', 'orange'],
//       foods = [...fruit, 'rice']
// console.log(foods,fruit)
//  let fruit = ['applle', 'orange'],
//      foods = ['rice']

// foods = foods.concat(fruit)
// console.log(foods)

// function breakfirst(dessert, drink, ...foods){
//     console.log(dessert, drink, ...foods)
// }
// breakfirst('cake', 'tea' ,'apple', 'origin')

// function breakfirst(dessert, drink, { location, restaurant }){
//     console.log(dessert, drink, location, restaurant)
// }
// const obj = { location: '八维',restaurant: '食堂'}
// breakfirst('cake','tea', obj)

// const breakfirst = function superBreakfirst(arg){
// }
// console.log(breakfirst.name)

// const add = (arg) => { }

// const breakfirst = {
//     name: 'xiao',
//     age: '13',
//     getFullName(){

//     }
// }

// const obj = {},
//       drink = 'hot tea'
// obj[drink] = 'jjj'
// console.log(obj)

// +0 == -0
// true
// +0 === -0
// true
// '0' == 0
// true
// '0' === 0
// false

// const obj = { name: 'xll' }
// Object.assign(obj, { age: '13' },{ name: '甜甜', like: "吃"})
// console.log(obj)

// const breakfirst = {
//     getDrink(){
//         return 'beer'
//     }
// }

// const dinner = {
//     getDrink(){
//         return 'tea'
//     }
// }

// const today = Object.create(breakfirst)
// console.log(Object.getPrototypeOf(today) === breakfirst)

// Object.setPrototypeOf(today,dinner)
// console.log(today.getDrink())

//===super=======
// const breakfirst = {
//     getDrink(){
//         return 'beer'
//     }
// }

// const dinner = {
//     getDrink(){
//         return 'tea'
//     }
// }

// const today = {
//     __proto__: breakfirst,
//     getDrink(){
//         return super.getDrink() + 'milk'
//     }
// }

// console.log(today.getDrink())

// //先找自己的，自己的找不到，再往上找，如何调用父级的getDrink？

//class================
// class Person {
//     constructor(name){
//         this.name = name
//         this.like = []
//     }
//     get menu (){
//         return this.like
//     }

//     set menu (like){
//         return this.like.push(like)
//     }
//     getName(){
//         console.log(this.name)
//     }
// }
//  const me = new Person('天天')
// //me.getName()

// console.log(me.menu = 'dog')
//  me.menu = 'cat'
//  me.menu = 'pig'
//  me.menu = 'pig1'
//  console.log(me.menu)

//static静态方法====================
// class Person {
//     constructor(name){
//         this.name = name
//         this.like = []
//     }
//     get menu (){
//         return this.like
//     }

//     set menu (like){
//         return this.like.push(like)
//     }

//     getName(name){
//         console.log(name)
//     }
// }

// Person.getName('啦啦啦')
//继承====================
// class Person {
//     constructor(name, age){
//         this.name = name
//         this.age = age
//     }
//     intro(){
//         return `${this.name},${this.age}`
//     }
// }

// class Cafe extends Person { 
//     constructor(name, age){
//         super(name, age)
//     }
// }

// const me = new Cafe('赵阔田',13)

// console.log(me.intro(),'=====')

//set====================
// let dessert = new Set( ['apple', 'tea', 'milk', 'tea'] )
//let dessert = new Set( 'apple' )
// dessert.size
// dessert.has('apple')
// dessert.delete('milk')
//console.log( dessert )
// dessert.forEach(dessert => {
//     console.log( dessert )
// })

//map====================
//  let food = new Map(),
//      fruit = {}, cook = () => {}, dessert = '甜点'

// food.set(fruit,'apple')
// food.set(cook,'cake')
// food.set(dessert,'egg')
    
// console.log(food)

// console.log(food.get(cook))

// console.log(food.get('甜点'))
//模块开发====================
//import { fruit } from './script/test.js'
//  import add from './script/test.js'
//  console.log(add('好吃'))
// for (let index in ['a', 'b']) {
//   console.log(index);
// }


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
