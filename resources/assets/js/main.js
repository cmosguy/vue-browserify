import $ from 'jquery';
window.Vue = require('vue');

var vue_app = require('./app');

window.app = new Vue(vue_app.default());



