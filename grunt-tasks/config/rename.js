/**
 * rename
 */

module.exports = function(grunt) {
    grunt.config.set('rename', {
      macApp32: {
        files: [{
          src: '<%= config.distMac32 %>/node-webkit.app',
          dest: '<%= config.distMac32 %>/PixelCounter.app'
        }]
      },
      macApp64: {
        files: [{
          src: '<%= config.distMac64 %>/node-webkit.app',
          dest: '<%= config.distMac64 %>/PixelCounter.app'
        }]
      },
      zipToApp: {
        files: [{
          src: '<%= config.tmp %>/app.zip',
          dest: '<%= config.tmp %>/app.nw'
        }]
      }
    });
};