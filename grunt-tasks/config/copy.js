/**
 * copy
 */

module.exports = function(grunt) {
    grunt.config.set('copy', {
      appLinux: {
        files: [{
          expand: true,
          cwd: '<%= config.build %>',
          dest: '<%= config.distLinux64 %>/app.nw',
          src: '**'
        }]
      },
      appLinux32: {
        files: [{
          expand: true,
          cwd: '<%= config.build %>',
          dest: '<%= config.distLinux32 %>/app.nw',
          src: '**'
        }]
      },
      appMacos32: {
        files: [{
          expand: true,
          cwd: '<%= config.build %>',
          dest: '<%= config.distMac32 %>/node-webkit.app/Contents/Resources/app.nw',
          src: '**'
        }, {
          expand: true,
          cwd: '<%= config.resources %>/mac/',
          dest: '<%= config.distMac32 %>/node-webkit.app/Contents/',
          filter: 'isFile',
          src: '*.plist'
        }, {
          expand: true,
          cwd: '<%= config.resources %>/mac/',
          dest: '<%= config.distMac32 %>/node-webkit.app/Contents/Resources/',
          filter: 'isFile',
          src: '*.icns'
        }, {
          expand: true,
          cwd: '<%= config.build %>/../node_modules/',
          dest: '<%= config.distMac32 %>/node-webkit.app/Contents/Resources/app.nw/node_modules/',
          src: '**/pixelcounter/**'
        }]
      },
      appMacos64: {
        files: [{
          expand: true,
          cwd: '<%= config.build %>',
          dest: '<%= config.distMac64 %>/node-webkit.app/Contents/Resources/app.nw',
          src: '**'
        }, {
          expand: true,
          cwd: '<%= config.resources %>/mac/',
          dest: '<%= config.distMac64 %>/node-webkit.app/Contents/',
          filter: 'isFile',
          src: '*.plist'
        }, {
          expand: true,
          cwd: '<%= config.resources %>/mac/',
          dest: '<%= config.distMac64 %>/node-webkit.app/Contents/Resources/',
          filter: 'isFile',
          src: '*.icns'
        }, {
          expand: true,
          cwd: '<%= config.build %>/../node_modules/',
          dest: '<%= config.distMac64 %>/node-webkit.app/Contents/Resources/app.nw/node_modules/',
          src: '**/pixelcounter/**'
        }]
      },
      webkit32: {
        files: [{
          expand: true,
          cwd: '<%=config.resources %>/node-webkit/MacOS32',
          dest: '<%= config.distMac32 %>/',
          src: '**'
        }]
      },
      webkit64: {
        files: [{
          expand: true,
          cwd: '<%=config.resources %>/node-webkit/MacOS64',
          dest: '<%= config.distMac64 %>/',
          src: '**'
        }]
      },
      copyWinToTmp: {
        files: [{
          expand: true,
          cwd: '<%= config.build %>/../node_modules/',
          dest: '<%= config.build %>/node_modules/',
          src: 'pixelcounter/**'
        }, {
          expand: true,
          cwd: '<%= config.resources %>/node-webkit/Windows/',
          dest: '<%= config.tmp %>/',
          src: '**'
        }]
      },
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.build %>',
          src: [
            '**',
            '!**/bower_components/**',
            '!**/templates/**',
            '!**/styles/**',
            '!**/scripts/**',
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '<%= config.build %>/styles/',
        src: '{,*/}*.css'
      },
      vendorCss: {
        // This copy is created for Fixed in Usemin
        expand: true,
        dot: true,
        cwd: '.tmp/concat/styles/',
        dest: '<%= config.build %>/styles/',
        src: 'vendor.css'
      }
    });
};