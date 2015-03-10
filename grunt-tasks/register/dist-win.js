/**
 * dist-win
 */
module.exports = function (grunt) {

  grunt.registerTask('dist-win', [
    'build',
    // 'jshint',
    'clean:distWin',
    'copy:copyWinToTmp',
    'compress:appToTmp',
    'rename:zipToApp',
    'createWindowsApp',
    'compress:finalWindowsApp'
  ]);

};