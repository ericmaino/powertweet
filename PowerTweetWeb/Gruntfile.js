/// <binding BeforeBuild='browserify' ProjectOpened='watch' />
module.exports = function (grunt) {

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    "./App/Build/bundle.js": ["./App/Source/*.js"]
                },
                options: {
                    transform: [
                        ['reactify', {
                            'es6': true
                        }]
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: ["Gruntfile.js", "./App/Source/*.js"],
                tasks: ["browserify"]
            }
        }
    });

    grunt.registerTask("default", ["build", "watch"]);
    grunt.registerTask("build", ["browserify"]);
};