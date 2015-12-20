import $ from 'jquery';
window.Vue = require('vue');
global.jQuery = require("jquery");

var vue_app = require('./app');

window.app = new Vue(vue_app.default());



