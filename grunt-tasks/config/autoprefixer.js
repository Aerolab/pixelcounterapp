/**
 * autoprefixer
 */

module.exports = function(grunt) {
    grunt.config.set('autoprefixer', {
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
    });
};