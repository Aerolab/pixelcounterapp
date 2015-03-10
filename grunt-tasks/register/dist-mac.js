/**
 * dist-mac
 */
module.exports = function (grunt) {

  grunt.registerTask('dist-mac', [
    'build',
    // 'jshint',
    'clean:distMac64',
    'copy:webkit64',
    'copy:appMacos64',
    'rename:macApp64',
    'chmod64'
  ]);

};