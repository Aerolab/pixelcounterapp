/**
 * jscs
 */

module.exports = function(grunt) {
    grunt.config.set('jscs', {
      dev: {
        options: {
          config: '.jscsrc'
        },
        files: {
          src: [
            'app/scripts/**/*.js'
          ]
        }
      }
    });
};