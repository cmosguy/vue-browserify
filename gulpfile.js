var gulp = require('gulp');
var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');


var paths = {
    'jquery': '../../../node_modules/jquery/dist',
    'geocomplete': '../../../node_modules/geocomplete'
};

elixir(function (mix) {

    mix.browserify([
        '../../../public/index.html',
        'main.js'
    ]).browserSync({
        //files: './public/js/bundle.js',
        proxy: 'localhost:8888'
        //middleware: function (req, res, next) {
        //    console.log(req.url);
        //    next();
        //}
    });

});

