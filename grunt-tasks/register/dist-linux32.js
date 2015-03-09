/**
 * dist-linux32
 */
module.exports = function (grunt) {

  grunt.registerTask('dist-linux32', [
    'build',
    // 'jshint',
    'clean:distLinux32',
    'copy:appLinux32',
    'createLinuxApp:Linux32'
  ]);

};