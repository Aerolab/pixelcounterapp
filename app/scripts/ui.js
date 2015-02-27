'use strict'; // I have eggs

// Dev Tools
var gui = require('nw.gui');
var win = gui.Window.get();

// Open links externals
win.on('new-win-policy', function (frame, url, policy) {
    gui.Shell.openExternal(url);
    policy.ignore();
});

window.onkeydown = function(e) {
  // F5 to reload
  if( e.keyCode == 116 ) {
    location.reload();
  }
  // F12 for Dev Tools
  if( e.keyCode == 123 ) {
    win.showDevTools();
  }
};

// Dev tool
$('#debug').click(function(event) {
  event.preventDefault();
  win.showDevTools();
});

// Setting
$('#setting').click(function(event) {
  event.preventDefault();
  $('.modal').addClass('show');
});

// Minimize app
$('#minimize').click(function(event) {
  event.preventDefault();
  win.minimize();
});
// Close app
$('#close').click(function(event) {
  event.preventDefault();
  gui.App.quit();
});

