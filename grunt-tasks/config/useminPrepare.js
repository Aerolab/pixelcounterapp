/**
 * useminPrepare
 */

module.exports = function(grunt) {
    grunt.config.set('useminPrepare', {
      options: {
        root: '<%= config.app %>',
        dest: '<%= config.build %>',
      },
      html: '<%= config.build %>/index.html'
    });
};