'use strict';

module.exports = function (grunt) {
     var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        sprite: 'grunt-spritesmith'
        // configureProxies: 'grunt-connect-proxy'
    });

    grunt.initConfig({
        // configurable paths
        yeoman: {
            app: 'app',
            dist: 'dist'
        },
        watch: {
            sass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}', '<%= yeoman.app %>/bower_components/{,*/}*.{scss,sass}'],
                tasks: ['sass:server', 'autoprefixer']
            },
            assemble: {
                files: ['<%= yeoman.app %>/templates/layouts/{,*/}*.hbs',
                       '<%= yeoman.app %>/templates/pages/{,*/}*.hbs',
                       '<%= yeoman.app %>/templates/partials/{,*/}*.hbs',
                       '<%= yeoman.app %>/data/{,*/}*.json'],
                tasks: ['assemble:server']
            },
            scripts: {
                files: ['<%= yeoman.app %>/scripts/**/*.js'],
                tasks: ['jshint', 'jscs']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '{.tmp,<%= yeoman.app %>}/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },
        assemble: {
            options: {
                flatten: true,
                layout: 'layout.hbs',
                layoutdir: '<%= yeoman.app %>/templates/layouts',
                assets: 'dist/images',
                data: ['<%= yeoman.app %>/data/*.{json,yml}'],
                partials: ['<%= yeoman.app %>/templates/partials/*.hbs'],
                helpers: ['handlebars-helpers', 'handlebars-helper-*']
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/': ['<%= yeoman.app %>/templates/pages/*.hbs']
                }
            },
            server: {
                files: {
                    '.tmp/': ['<%= yeoman.app %>/templates/pages/*.hbs']
                }
            }
        },
        connect: {
            options: {
                port: 8000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                // hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
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
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>',
                    livereload: false
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        sass: {
            dist: {
                options: {
                    // style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    '<%= yeoman.dist %>/styles/main.css' : ['<%= yeoman.app %>/styles/main.sass']
                }
            },
            server: {
                options: {
                    debugInfo: true
                },
                files: {
                    '.tmp/styles/main.css' : ['<%= yeoman.app %>/styles/main.sass']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/templates/partials/scripts.hbs',
                ignorePath: '<%= yeoman.app %>/',
                exclude: ['<%= yeoman.app %>/bower_components/modernizr/modernizr.js']
            }
        },
        wiredep: {
            target: {
                src: ['<%= yeoman.app %>/templates/partials/scripts.hbs','<%= yeoman.app %>/templates/layouts/layout.hbs'],
                ignorePath: '<%= yeoman.app %>/'
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: '<%= yeoman.dist %>/index.html'
        },
        usemin: {
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
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
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.*',
                        'fonts/{,*/}*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        modernizr: {
            dist: {
                devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
                outputFile: '<%= yeoman.dist %>/scripts/vendor/modernizr.js',
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '!<%= yeoman.dist %>/scripts/vendor/*'
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

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'sass',
            'copy:styles',
            // 'jscs',
            'assemble:server',
            'autoprefixer',
            // 'configureProxies:livereload',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
      grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
      grunt.task.run(['serve']);
    });


    grunt.registerTask('build', [
        'clean:dist',
        'sass',
        'copy',
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

    grunt.registerTask('default', [
        'build'
    ]);
};
