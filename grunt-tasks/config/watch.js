/**
 * watch
 */

module.exports = function(grunt) {
    grunt.config.set('watch', {
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}', '<%= config.app %>/bower_components/{,*/}*.{scss,sass}'],
        tasks: ['copy:build','sass', 'autoprefixer:build']
      },
      assemble: {
        files: ['<%= config.app %>/templates/layouts/{,*/}*.hbs',
             '<%= config.app %>/templates/pages/{,*/}*.hbs',
             '<%= config.app %>/templates/partials/{,*/}*.hbs'],
        tasks: ['assemble:build', 'useminPrepare', 'usemin']
      },
      scripts: {
        files: ['<%= config.app %>/scripts/**/*.js'],
        tasks: ['copy:build' ,'jshint', 'jscs', 'assemble:build', 'useminPrepare', 'usemin']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '{<%= config.build %>,<%= config.app %>}/*.html',
          '{<%= config.build %>}/styles/{,*/}*.css',
          '{<%= config.build %>,<%= config.app %>}/scripts/{,*/}*.js',
          '{<%= config.build %>,<%= config.app %>}/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    });
};