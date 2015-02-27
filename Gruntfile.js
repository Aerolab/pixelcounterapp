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
    dist: 'dist',
    distMac32: 'dist-nw/MacOS32',
    distMac64: 'dist-nw/MacOS64',
    distLinux32: 'dist-nw/Linux32',
    distLinux64: 'dist-nw/Linux64',
    distWin: 'dist-nw/Win',
    tmp: 'buildTmp',
    resources: 'resources'
  };

  grunt.initConfig({
    config: config,
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '<%= config.tmp %>/*',
            '!<%= config.dist %>/.git*'
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
      },
      server: '.tmp'
    },
    copy: {
      appLinux: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          dest: '<%= config.distLinux64 %>/app.nw',
          src: '**'
        }]
      },
      appLinux32: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          dest: '<%= config.distLinux32 %>/app.nw',
          src: '**'
        }]
      },
      appMacos32: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
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
          cwd: '<%= config.dist %>/../node_modules/',
          dest: '<%= config.distMac32 %>/node-webkit.app/Contents/Resources/app.nw/node_modules/',
          src: '**'
        }]
      },
      appMacos64: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
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
          cwd: '<%= config.dist %>/../node_modules/',
          dest: '<%= config.distMac64 %>/node-webkit.app/Contents/Resources/app.nw/node_modules/',
          src: '**'
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
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '**',
            '!**/bower_components/**',
            '!**/templates/**',
            '!**/styles/**'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      vendor: {
        expand: true,
        dot: true,
        cwd: '.tmp/concat/styles/',
        dest: '<%= config.dist %>/styles/',
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
          cwd: '<%= config.dist %>',
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
        tasks: ['sass', 'autoprefixer:dist','copy:dist' , 'copy:vendor']
      },
      assemble: {
        files: ['<%= config.app %>/templates/layouts/{,*/}*.hbs',
             '<%= config.app %>/templates/pages/{,*/}*.hbs',
             '<%= config.app %>/templates/partials/{,*/}*.hbs',
             '<%= config.app %>/data/{,*/}*.json'],
        tasks: ['assemble:dist', 'useminPrepare', 'concat:generated', 'uglify:generated', 'usemin']
      },
      scripts: {
        files: ['<%= config.app %>/scripts/**/*.js'],
        tasks: ['copy:dist' ,'jshint', 'jscs', 'assemble:dist', 'useminPrepare', 'concat:generated', 'uglify:generated', 'usemin']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '{.tmp,<%= config.dist %>,<%= config.app %>}/*.html',
          '{.tmp,<%= config.dist %>}/styles/{,*/}*.css',
          '{.tmp,<%= config.dist %>,<%= config.app %>}/scripts/{,*/}*.js',
          '{<%= config.dist %>,<%= config.app %>}/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    },
    assemble: {
      options: {
        flatten: true,
        layout: 'layout.hbs',
        layoutdir: '<%= config.app %>/templates/layouts',
        assets: 'dist/images',
        data: ['<%= config.app %>/data/*.{json,yml}'],
        partials: ['<%= config.app %>/templates/partials/*.hbs'],
        helpers: ['handlebars-helpers', 'handlebars-helper-*']
      },
      dist: {
        files: {
          '<%= config.dist %>/': ['<%= config.app %>/templates/pages/*.hbs']
        }
      },
      server: {
        files: {
          '.tmp/': ['<%= config.app %>/templates/pages/*.hbs']
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
            '.tmp',
            '<%= config.dist %>',
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
        },
        // proxies: [
        //     {
        //         context: '/',
        //         host: '0.0.0.0:8000',
        //         changeOrigin: true
        //     }
        // ]
      },
      test: {
        options: {
          base: [
            '.tmp',
            'test',
            '<%= config.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },
    sass: {
      dist: {
        options: {
          // style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          '<%= config.dist %>/styles/main.css' : ['<%= config.app %>/styles/main.sass']
        }
      },
      server: {
        options: {
          debugInfo: true
        },
        files: {
          '.tmp/styles/main.css' : ['<%= config.app %>/styles/main.sass']
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      tmp: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/styles/',
          src: '{,*/}*.css',
          dest: 'dist/styles/'
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
        dest: '<%= config.dist %>'
      },
      html: '<%= config.dist %>/index.html'
    },
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },
    htmlmin: {
      dist: {
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
          dest: '<%= config.dist %>'
        }]
      }
    },
    modernizr: {
      dist: {
        devFile: '<%= config.app %>/bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'
          ]
        },
        uglify: true
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
    // Todo: detect OS and run specific binary
    exec('resources/node-webkit/MacOS64/node-webkit.app/Contents/MacOS/node-webkit dist/');
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
    'jshint',
    'clean:distLinux64',
    'copy:appLinux',
    'createLinuxApp:Linux64'
  ]);

  grunt.registerTask('dist-linux32', [
    'build',
    'jshint',
    'clean:distLinux32',
    'copy:appLinux32',
    'createLinuxApp:Linux32'
  ]);

  grunt.registerTask('dist-win', [
    'build',
    'jshint',
    'clean:distWin',
    'copy:copyWinToTmp',
    'compress:appToTmp',
    'rename:zipToApp',
    'createWindowsApp',
    'compress:finalWindowsApp'
  ]);

  grunt.registerTask('dist-mac', [
    'build',
    'jshint',
    'clean:distMac64',
    'copy:webkit64',
    'copy:appMacos64',
    'rename:macApp64',
    'chmod64'
  ]);

  grunt.registerTask('dist-mac32', [
    'build',
    'jshint',
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
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'sass',
      'copy:styles',
      'assemble:server',
      'connect:livereload',
      'watch'
    ]);
  });


  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('watch-build', function () {

    grunt.task.run([
      'clean:dist',
      'sass',
      'htmlmin',
      'assemble:dist',
      'useminPrepare',
      'autoprefixer',
      'concat:generated',
      'uglify:generated',
      'copy:dist',
      'modernizr',
      'usemin',
      'copy:vendor',
      'connect:livereload',
      'runnw',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'sass',
    'htmlmin',
    'assemble:dist',
    'useminPrepare',
    'autoprefixer',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'copy:dist',
    'modernizr',
    'usemin'
  ]);



};
