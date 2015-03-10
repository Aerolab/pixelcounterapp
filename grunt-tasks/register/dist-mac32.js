/**
 * dist-mac32
 */
module.exports = function (grunt) {

  grunt.registerTask('dist-mac32', [
    'build',
    // 'jshint',
    'clean:distMac32',
    'copy:webkit32',
    'copy:appMacos32',
    'rename:macApp32',
    'chmod32'
  ]);

};