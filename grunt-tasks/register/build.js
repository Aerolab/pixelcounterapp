/**
 * build
 */
module.exports = function (grunt) {

  grunt.registerTask('build', [
    'clean:build',
    'copy:build',
    'sass',
    'autoprefixer',
    'assemble:build',
    'useminPrepare',
    'concat',
    'uglify',
    'usemin',
    'copy:vendorCss'
  ]);

};