module.exports = function (grunt) {

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    "./App/Build/bundle.js": ["./App/**/*.es6.js"]
                },
                options: {
                    transform: [
                       ["babelify", {
                           loose: "all"
                       }]
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: ["Gruntfile.js", "./App/**/*.es6.js"],
                tasks: ["browserify"]
            }
        }
    });

    grunt.registerTask("default", ["build", "watch"]);
    grunt.registerTask("build", ["browserify"]);
};