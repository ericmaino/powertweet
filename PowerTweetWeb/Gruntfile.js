/// <binding BeforeBuild='browserify' ProjectOpened='watch' />
module.exports = function (grunt) {

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.initConfig({
        properties: {
            bundle: "./App/Build/bundle.js"
        },

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
        clean: {
            build: ["path/to/dir/one", "path/to/dir/two"],
            release: ["path/to/another/dir/one", "path/to/another/dir/two"]
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