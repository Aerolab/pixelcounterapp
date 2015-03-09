/**
 * jshint
 */

module.exports = function(grunt) {
    grunt.config.set('jshint', {
      dev: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: [
            'app/scripts/**/*.js'
          ]
        }
      }
    });
};