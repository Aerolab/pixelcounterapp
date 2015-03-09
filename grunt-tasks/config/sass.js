/**
 * sass
 */

module.exports = function(grunt) {
    grunt.config.set('sass', {
      build: {
        options: {
          // style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          '<%= config.build %>/styles/main.css' : ['<%= config.app %>/styles/main.sass']
        }
      }
    });
};