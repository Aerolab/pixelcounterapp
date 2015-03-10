/**
 * live-build
 */
module.exports = function (grunt) {

  grunt.registerTask('live-build', function () {
    grunt.task.run([
      'clean:build',
      'copy:build',
      'sass',
      'autoprefixer',
      'assemble:build',
      'useminPrepare',
      'concat',
      'uglify',
      'usemin',
      'copy:vendorCss',
      'connect:livereload',
      'runnw',
      'watch'
    ]);
  });

};