/**
 * connect
 */

module.exports = function(grunt) {
    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
    grunt.config.set('connect', {
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
    });
};
