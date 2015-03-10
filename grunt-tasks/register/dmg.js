/**
 * dmg
 */
module.exports = function (grunt) {

  grunt.registerTask('dmg', 'Create dmg from previously created app folder in dist.', function () {
    var done = this.async();
    var createDmgCommand = 'resources/mac/package.sh "PixelCounter"';
    require('child_process').exec(createDmgCommand, function (error, stdout, stderr) {
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