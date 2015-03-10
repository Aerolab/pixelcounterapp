/**
 * server
 */
module.exports = function (grunt) {

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt live-build` to start a watch and build.');
    grunt.task.run(['live-build']);
  });

};