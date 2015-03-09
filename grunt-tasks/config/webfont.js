/**
 * webfont
 */

module.exports = function(grunt) {
    grunt.config.set('webfont', {
      icons: {
        src: 'app/images/src/icons/*.svg',
        dest: 'app/fonts',
        destCss: 'app/styles/modules',
        options: {
          font: 'icons'
        }
      }
    });
};