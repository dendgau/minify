/**
 * For uglify
 * http://adilapapaya.com/docs/grunt-contrib-uglify
 * https://github.com/gruntjs/grunt-contrib-uglify/blob/master/docs/uglify-examples.md
 * https://github.com/gruntjs/grunt-contrib-sass
 * https://gruntjs.com/configuring-tasks
 */

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            dev: {
                options: {
                    mangle: false, // To prevent changes to your variable and function names
                    beautify: true, // To beautify your code for debugging
                },
                files: [{
                    expand: true,
                    cwd: 'input/js',
                    src: '**/*.js',
                    dest: 'output/js'
                }]
            },
            dist: {
                options: {
                    mangle: true,
                    beautify: false,
                },
                files: [{
                    expand: true,
                    cwd: 'input/js',
                    src: '**/*.js',
                    dest: 'dist/js'
                }]
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded',
                },
                files: [{
                    expand: true,
                    cwd: 'input/scss',
                    src: '**/*.scss',
                    dest: 'output/css',
                    ext: ".css",
                }]
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'input/scss',
                    src: '**/*.scss',
                    dest: 'dist/css',
                    ext: ".css",
                }]
            }
        },

        watch: {
            css: {
                files: ["input/**/*.scss"],
                tasks: ["sass:dev"],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            js: {
                files: ["input/**/*.js"],
                tasks: ["uglify:dev"],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
    });

    // Loading tasks
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // Register tasks for dev
    grunt.registerTask("dev", [
        "uglify:dev",
        "sass:dev",
        "watch"
    ]);

    // Register tasks for real
    grunt.registerTask("build", [
        "uglify:dist",
        "sass:dist",
        "watch"
    ]);
};
