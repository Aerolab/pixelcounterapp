/**
 * usemin
 */

module.exports = function(grunt) {
    grunt.config.set('usemin', {
      options: {
        assetsDirs: ['<%= config.build %>']
      },
      js: ['<%= config.build %>/scripts/{,*/}*.js'],
      html: ['<%= config.build %>/{,*/}*.html'],
      css: ['<%= config.build %>/styles/{,*/}*.css']
    });
};