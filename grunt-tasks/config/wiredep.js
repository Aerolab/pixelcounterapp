/**
 * wiredep
 */

module.exports = function(grunt) {
    grunt.config.set('wiredep', {
      target: {
        src: ['<%= config.app %>/templates/partials/scripts.hbs','<%= config.app %>/templates/layouts/layout.hbs'],
        ignorePath: '../../'
      }
    });
};