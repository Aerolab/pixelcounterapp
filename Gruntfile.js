/*jshint camelcase: false*/

module.exports = function (grunt) {
  'use strict';

  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  // load all grunt tasks
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    sprite: 'grunt-spritesmith',
    configureProxies: 'grunt-connect-proxy'
  });

  // configurable paths
  var config = {
    app: 'app',
    build: 'build',
    distMac32: 'dist/MacOS32',
    distMac64: 'dist/MacOS64',
    distLinux32: 'dist/Linux32',
    distLinux64: 'dist/Linux64',
    distWin: 'dist/Win',
    tmp: 'buildTmp',
    resources: 'resources'
  };

  grunt.initConfig({
    config: config,
    clean: {
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
    },
    copy: {
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
    },
    compress: {
      appToTmp: {
        options: {
          archive: '<%= config.tmp %>/app.zip'
        },
        files: [{
          expand: true,
          cwd: '<%= config.build %>',
          src: ['**']
        }]
      },
      finalWindowsApp: {
        options: {
          archive: '<%= config.distWin %>/PixelCounter.zip'
        },
        files: [{
          expand: true,
          cwd: '<%= config.tmp %>',
          src: ['**']
        }]
      }
    },
    rename: {
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
    },
    // Dev steps
    watch: {
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}', '<%= config.app %>/bower_components/{,*/}*.{scss,sass}'],
        tasks: ['copy:build','sass', 'autoprefixer:build']
      },
      assemble: {
        files: ['<%= config.app %>/templates/layouts/{,*/}*.hbs',
             '<%= config.app %>/templates/pages/{,*/}*.hbs',
             '<%= config.app %>/templates/partials/{,*/}*.hbs'],
        tasks: ['assemble:build', 'useminPrepare', 'usemin']
      },
      scripts: {
        files: ['<%= config.app %>/scripts/**/*.js'],
        tasks: ['copy:build' ,'jshint', 'jscs', 'assemble:build', 'useminPrepare', 'usemin']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '{<%= config.build %>,<%= config.app %>}/*.html',
          '{<%= config.build %>}/styles/{,*/}*.css',
          '{<%= config.build %>,<%= config.app %>}/scripts/{,*/}*.js',
          '{<%= config.build %>,<%= config.app %>}/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    },
    assemble: {
      options: {
        flatten: true,
        layout: 'layout.hbs',
        layoutdir: '<%= config.app %>/templates/layouts',
        assets: 'build/images',
        partials: ['<%= config.app %>/templates/partials/*.hbs'],
        helpers: ['handlebars-helpers', 'handlebars-helper-*']
      },
      build: {
        files: {
          '<%= config.build %>/': ['<%= config.app %>/templates/pages/*.hbs']
        }
      }
    },
    connect: {
      options: {
        port: 8000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: false,
          base: [
            '<%= config.build %>',
            '<%= config.app %>'
          ] ,
          middleware: function(connect, options) {
            // Same as in grunt-contrib-connect
            var middlewares = [];
            var directory = options.directory ||
            options.base[options.base.length - 1];
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            // Same as in grunt-contrib-connect
            options.base.forEach(function(base) {
              middlewares.push(connect.static(base));
            });

            middlewares.push(proxySnippet);

            middlewares.push(connect.directory(directory));
            return middlewares;
          }
        }
      },
      test: {
        options: {
          base: [
            'test',
            '<%= config.app %>'
          ]
        }
      },
      build: {
        options: {
          open: true,
          base: '<%= config.build %>',
          livereload: false
        }
      }
    },
    sass: {
      build: {
        options: {
          // style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          '<%= config.build %>/styles/main.css' : ['<%= config.app %>/styles/main.sass']
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      build: {
        files: [{
          expand: true,
          cwd: 'build/styles/',
          src: '{,*/}*.css',
          dest: 'build/styles/'
        }]
      }
    },
    wiredep: {
      target: {
        src: ['<%= config.app %>/templates/partials/scripts.hbs','<%= config.app %>/templates/layouts/layout.hbs'],
        ignorePath: '../../'
      }
    },
    useminPrepare: {
      options: {
        root: '<%= config.app %>',
        dest: '<%= config.build %>',
      },
      html: '<%= config.build %>/index.html'
    },
    usemin: {
      options: {
        assetsDirs: ['<%= config.build %>']
      },
      js: ['<%= config.build %>/scripts/{,*/}*.js'],
      html: ['<%= config.build %>/{,*/}*.html'],
      css: ['<%= config.build %>/styles/{,*/}*.css']
    },
    htmlmin: {
      build: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/config/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: '*.html',
          dest: '<%= config.build %>'
        }]
      }
    },
    jshint: {
      dev: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: [
            'app/scripts/**/*.js'
          ]
        }
      }
    },
    jscs: {
      dev: {
        options: {
          config: '.jscsrc'
        },
        files: {
          src: [
            'app/scripts/**/*.js'
          ]
        }
      }
    },
    webfont: {
      icons: {
        src: 'app/images/src/icons/*.svg',
        dest: 'app/fonts',
        destCss: 'app/styles/modules',
        options: {
          font: 'icons'
        }
      }
    },
    sprite: {
      all: {
        src: 'app/images/src/icons/*.png',
        dest: 'app/images/icons.png',
        destCss: 'app/styles/modules/_icons.css'
      }
    }
  });

  grunt.registerTask('runnw', 'Run node-webkit app.', function () {
    var childProcess = require('child_process');
    var exec = childProcess.exec;
    var ext;
    // Detect OS and run specific binary 'darwin', 'linux' or 'win32'
    if (process.platform == "darwin") {
        ext = 'resources/node-webkit/MacOS64/node-webkit.app/Contents/MacOS/node-webkit build/';
    }
    else if (process.platform == "linux") {
        ext = 'resources/node-webkit/Linux64/nw build/';
    } else if (process.platform == "win32") {
        ext = 'resources/node-webkit/Windows/nw.exe build/';
    }
    else {
        ext = 'none';
    }
    if (ext!='none') {
      exec(ext);
    }else{
      console.log('Not running node-webkit, check task runnw and ejecute node-webkit manually');
    }
  });

  grunt.registerTask('chmod32', 'Add lost Permissions.', function () {
    var fs = require('fs'),
      path = config.distMac32 + '/PixelCounter.app/Contents/';
    fs.chmodSync(path + 'Frameworks/node-webkit Helper EH.app/Contents/MacOS/node-webkit Helper EH', '555');
    fs.chmodSync(path + 'Frameworks/node-webkit Helper NP.app/Contents/MacOS/node-webkit Helper NP', '555');
    fs.chmodSync(path + 'Frameworks/node-webkit Helper.app/Contents/MacOS/node-webkit Helper', '555');
    fs.chmodSync(path + 'MacOS/node-webkit', '555');
  });

  grunt.registerTask('chmod64', 'Add lost Permissions.', function () {
    var fs = require('fs'),
      path = config.distMac64 + '/PixelCounter.app/Contents/';
    fs.chmodSync(path + 'Frameworks/node-webkit Helper EH.app/Contents/MacOS/node-webkit Helper EH', '555');
    fs.chmodSync(path + 'Frameworks/node-webkit Helper NP.app/Contents/MacOS/node-webkit Helper NP', '555');
    fs.chmodSync(path + 'Frameworks/node-webkit Helper.app/Contents/MacOS/node-webkit Helper', '555');
    fs.chmodSync(path + 'MacOS/node-webkit', '555');
  });

  grunt.registerTask('createLinuxApp', 'Create linux distribution.', function (version) {
    var done = this.async();
    var childProcess = require('child_process');
    var exec = childProcess.exec;
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

  grunt.registerTask('setVersion', 'Set version to all needed files', function (version) {
    var config = grunt.config.get(['config']);
    var appPath = config.app;
    var resourcesPath = config.resources;
    var mainPackageJSON = grunt.file.readJSON('package.json');
    var appPackageJSON = grunt.file.readJSON(appPath + '/package.json');
    var infoPlistTmp = grunt.file.read(resourcesPath + '/mac/Info.plist.tmp', {
      encoding: 'UTF8'
    });
    var infoPlist = grunt.template.process(infoPlistTmp, {
      data: {
        version: version
      }
    });
    mainPackageJSON.version = version;
    appPackageJSON.version = version;
    grunt.file.write('package.json', JSON.stringify(mainPackageJSON, null, 2), {
      encoding: 'UTF8'
    });
    grunt.file.write(appPath + '/package.json', JSON.stringify(appPackageJSON, null, 2), {
      encoding: 'UTF8'
    });
    grunt.file.write(resourcesPath + '/mac/Info.plist', infoPlist, {
      encoding: 'UTF8'
    });
  });

  grunt.registerTask('dist-linux', [
    'build',
    // 'jshint',
    'clean:distLinux64',
    'copy:appLinux',
    'createLinuxApp:Linux64'
  ]);

  grunt.registerTask('dist-linux32', [
    'build',
    // 'jshint',
    'clean:distLinux32',
    'copy:appLinux32',
    'createLinuxApp:Linux32'
  ]);

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

  grunt.registerTask('dist-mac', [
    'build',
    // 'jshint',
    'clean:distMac64',
    'copy:webkit64',
    'copy:appMacos64',
    'rename:macApp64',
    'chmod64'
  ]);

  grunt.registerTask('dist-mac32', [
    'build',
    // 'jshint',
    'clean:distMac32',
    'copy:webkit32',
    'copy:appMacos32',
    'rename:macApp32',
    'chmod32'
  ]);

  grunt.registerTask('check', [
    'jshint'
  ]);

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

  // Developer Instance

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt live-build` to start a watch and build.');
    grunt.task.run(['live-build']);
  });

  grunt.registerTask('live-build', function () {
    grunt.task.run([
      'clean:build',
      'copy:build',
      'sass',
      'autoprefixer',
      'assemble:build',
      'useminPrepare',
      'concat',
      'uglify',
      'usemin',
      'copy:vendorCss',
      'connect:livereload',
      'runnw',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:build',
    'copy:build',
    'sass',
    'autoprefixer',
    'assemble:build',
    'useminPrepare',
    'concat',
    'uglify',
    'usemin',
    'copy:vendorCss'
  ]);



};
