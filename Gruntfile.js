module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    "jshint": {
        "js": {
            "src": ["public/js/*.js"]
        },
        "test": {
            "src": ["tests/*.js"]
        }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint:js']);
  grunt.registerTask('linttest', ['jshint:test']);

};