/**
 * assemble
 */

module.exports = function(grunt) {
    grunt.config.set('assemble', {
      options: {
        flatten: true,
        layout: 'layout.hbs',
        layoutdir: '<%= config.app %>/templates/layouts',
        assets: 'build/images',
        partials: ['<%= config.app %>/templates/partials/*.hbs'],
        helpers: ['handlebars-helpers', 'handlebars-helper-*']
      },
      build: {
        files: {
          '<%= config.build %>/': ['<%= config.app %>/templates/pages/*.hbs']
        }
      }
    });
};