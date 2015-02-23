var walk    = require('walk');
var files   = [];

String.prototype.endsWith = function(suffix) {
 return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

// Walker options
var walker  = walk.walk("D:/Dropbox (Aerolab)/Booom - Dribbble Suite", { followLinks: false });

walker.on('file', function(root, stat, next) {
 // Add this file to the list of files
 if( stat.name.endsWith('.png') || stat.name.endsWith('.jpg') || stat.name.endsWith('.gif') || stat.name.endsWith('.jpeg') || stat.name.endsWith('.psd') ) {
   files.push(root + '/' + stat.name);
 }
 next();
});

walker.on('end', function() {
 console.log(files.length + ' files');
});
