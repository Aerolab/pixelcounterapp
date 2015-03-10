/**
 * Runnw
 * Run the node-webkit app
 */
module.exports = function (grunt) {

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

};