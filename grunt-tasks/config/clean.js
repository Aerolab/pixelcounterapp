/**
 * clean
 */

module.exports = function(grunt) {
    grunt.config.set('clean', {
       build: {
        files: [{
          dot: true,
          src: [
            '<%= config.build %>/*',
            '<%= config.tmp %>/*',
            '!<%= config.build %>/.git*'
          ]
        }]
      },
      distMac32: {
        files: [{
          dot: true,
          src: [
            '<%= config.distMac32 %>/*',
            '<%= config.tmp %>/*'
          ]
        }]
      },
      distMac64: {
        files: [{
          dot: true,
          src: [
            '<%= config.distMac64 %>/*',
            '<%= config.tmp %>/*'
          ]
        }]
      },
      distLinux64: {
        files: [{
          dot: true,
          src: [
            '<%= config.distLinux64 %>/*',
            '<%= config.tmp %>/*'
          ]
        }]
      },
      distLinux32: {
        files: [{
          dot: true,
          src: [
            '<%= config.distLinux32 %>/*',
            '<%= config.tmp %>/*'
          ]
        }]
      },
      distWin: {
        files: [{
          dot: true,
          src: [
            '<%= config.distWin %>/*',
            '<%= config.tmp %>/*'
          ]
        }]
      }
    });
};