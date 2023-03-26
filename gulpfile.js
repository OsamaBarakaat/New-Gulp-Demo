const { src, dest, parallel, series ,watch} = require("gulp");
const htmlmin =require("gulp-htmlmin")
const concat = require("gulp-concat")
const cleanCSS = require("gulp-clean-css")
const treser = require("gulp-terser")
const imagemin = require("gulp-imagemin");

const globel ={
    html:"project/*.html",
    css:"project/css/**/*.css",
    js:"project/js/**/*.js",
    img:"project/pics/*"

}
//HTML 
function htmlGulp(){
    return src(globel.html).pipe(htmlmin({collapseWhitespace :true ,removeComments :true , collapseInlineTagWhitespace: true })).pipe(dest("BuildDist"))
}
exports.html = htmlGulp 
//css
function cssGulp(){
    return src(globel.css).pipe(concat("style.min.css")).pipe(cleanCSS()).pipe(dest("BuildDist/assets"))
}
exports.css = cssGulp 

//JS
function jsGulp (){
    return src(globel.js).pipe(concat("script.min.js")).pipe(treser()).pipe(dest("BuildDist/assets"))
}
exports.js = jsGulp 

function ImgGulp (){
    return src(globel.img).pipe(imagemin()).pipe(dest("BuildDist/assets/images"))
}
exports.img = ImgGulp 

function watchPro(){
    watch(globel.html,htmlGulp),
    watch(globel.css,cssGulp),
    watch(globel.js,jsGulp),
    watch(globel.img,ImgGulp)
}

exports.default = series ( parallel(htmlGulp,cssGulp,jsGulp,ImgGulp) ,watchPro )