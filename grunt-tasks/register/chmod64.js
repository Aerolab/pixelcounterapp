/**
 * chmod64
 */
module.exports = function (grunt) {

  grunt.registerTask('chmod64', 'Add lost Permissions.', function () {
    var fs = require('fs'),
        config = grunt.config.get(['config']),
        path = config.distMac64 + '/PixelCounter.app/Contents/';
        fs.chmodSync(path + 'Frameworks/node-webkit Helper EH.app/Contents/MacOS/node-webkit Helper EH', '555');
        fs.chmodSync(path + 'Frameworks/node-webkit Helper NP.app/Contents/MacOS/node-webkit Helper NP', '555');
        fs.chmodSync(path + 'Frameworks/node-webkit Helper.app/Contents/MacOS/node-webkit Helper', '555');
        fs.chmodSync(path + 'MacOS/node-webkit', '555');
  });

};
