/**
 * createWindowsApp
 */
module.exports = function (grunt) {

  grunt.registerTask('createWindowsApp', 'Create windows distribution.', function () {
    var done = this.async();
    var concat = require('concat-files');
    concat([
      'buildTmp/nw.exe',
      'buildTmp/app.nw'
    ], 'buildTmp/PixelCounter.exe', function () {
      var fs = require('fs');
      fs.unlink('buildTmp/app.nw', function (error, stdout, stderr) {
        if (stdout) {
          grunt.log.write(stdout);
        }
        if (stderr) {
          grunt.log.write(stderr);
        }
        if (error !== null) {
          grunt.log.error(error);
          done(false);
        } else {
          fs.unlink('buildTmp/nw.exe', function (error, stdout, stderr) {
            var result = true;
            if (stdout) {
              grunt.log.write(stdout);
            }
            if (stderr) {
              grunt.log.write(stderr);
            }
            if (error !== null) {
              grunt.log.error(error);
              result = false;
            }
            done(result);
          });
        }
      });
    });
  });

};