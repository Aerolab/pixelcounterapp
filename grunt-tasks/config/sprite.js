/**
 * sprite
 */

module.exports = function(grunt) {
    grunt.config.set('sprite', {
      all: {
        src: 'app/images/src/icons/*.png',
        dest: 'app/images/icons.png',
        destCss: 'app/styles/modules/_icons.css'
      }
    });
};