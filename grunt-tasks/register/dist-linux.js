/**
 * dist-linux
 */
module.exports = function (grunt) {

  grunt.registerTask('dist-linux', [
    'build',
    // 'jshint',
    'clean:distLinux64',
    'copy:appLinux',
    'createLinuxApp:Linux64'
  ]);

};