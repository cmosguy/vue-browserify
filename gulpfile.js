var gulp = require('gulp');
var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');


elixir(function (mix) {

    mix.browserify([
        'main.js'
    ]).browserSync({
        //files: './public/js/bundle.js',
        proxy: 'localhost:8888',
        //middleware: function (req, res, next) {
        //    console.log(req.url);
        //    next();
        //}
    });

});

