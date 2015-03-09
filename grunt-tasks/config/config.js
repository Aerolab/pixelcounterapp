/**
 * Config
 */

module.exports = function(grunt) {
    grunt.config.set('config', {
        app: 'app',
        build: 'build',
        distMac32: 'dist/MacOS32',
        distMac64: 'dist/MacOS64',
        distLinux32: 'dist/Linux32',
        distLinux64: 'dist/Linux64',
        distWin: 'dist/Win',
        tmp: 'buildTmp',
        resources: 'resources'
    });
};
