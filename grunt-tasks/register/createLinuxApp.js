/**
 * createLinuxApp
 */
module.exports = function (grunt) {

  grunt.registerTask('createLinuxApp', 'Create linux distribution.', function (version) {
    var done = this.async();
    var childProcess = require('child_process');
    var exec = childProcess.exec;
    var config = grunt.config.get(['config']);
    var path = './' + (version === 'Linux64' ? config.distLinux64 : config.distLinux32);
    exec('mkdir -p ' + path + '; cp resources/node-webkit/' + version + '/nw.pak ' + path + ' && cp resources/node-webkit/' + version + '/nw ' + path + '/node-webkit && cp resources/node-webkit/' + version + '/icudtl.dat ' + path + '/icudtl.dat', function (error, stdout, stderr) {
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
  });

};
