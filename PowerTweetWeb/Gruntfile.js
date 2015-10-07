/// <binding BeforeBuild='build' ProjectOpened='watch' />
module.exports = function (grunt) {

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.initConfig({
        properties: {
            bundled: "./App/Build/bundle.js",
            source: "./App/Source/*.js"
        },

        browserify: {
            dist: {
                files: {
                    "<%= properties.bundled %>": ["<%= properties.source %>"]
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
        clean: ['<%= properties.bundled %>'],
        watch: {
            scripts: {
                files: ["Gruntfile.js", "<%= properties.source %>"],
                tasks: ["browserify"]
            }
        }
    });

    grunt.registerTask("default", ["build", "watch"]);
    grunt.registerTask("build", ["clean", "browserify"]);
};