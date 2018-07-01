var gulp = require("gulp");
var typescript = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var merge2 = require("merge2");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

var tsConfig = {
    noExternalResolve: true,
    target: 'ES5',
    module: 'none',
    declarationFiles: true,
    typescript: require('typescript'),
    experimentalDecorators: true,
    isolatedModules: false,
    removeComments: false
};
var tsProject = typescript.createProject(tsConfig);

var files = [
    "./libs/playcanvas-1.4.3.js",
    "./libs/playcanvas-engine.js",
    "./libs/playcanvas-draco.js",
    "./libs/playcanvas-anim.js",
    "./libs/playcanvas-gltf.js",
    "./libs/playcanvas-stats.js",
    "./libs/playcanvas-stick.js",
    "./temp/playcanvas-tools.js"
]

gulp.task("compile", function () {
    var tsResult = gulp.src("./src/**/*.ts")      
            .pipe(sourcemaps.init())
            .pipe(typescript(tsProject));

    return merge2([
        tsResult.dts
            .pipe(concat("playcanvas.toolkit.d.ts"))
            .pipe(gulp.dest("./dist")),
        tsResult.js
            .pipe(sourcemaps.write("./", {
                    includeContent:false, 
                    sourceRoot: (filePath) => {
                        return ''; 
                    }
                }))
            .pipe(gulp.dest("./temp/"))
    ])            
});

gulp.task("default", ["compile"], function () {
    return merge2(gulp.src(files))
        .pipe(concat("playcanvas.toolkit.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));
});