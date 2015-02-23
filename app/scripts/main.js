$(document).ready(function() {
  var gui = require('nw.gui');
  var win = gui.Window.get();
  $('#debug').click(function(event) {
    event.preventDefault();
    win.showDevTools();
  });
  $('#minimize').click(function(event) {
    event.preventDefault();
    win.minimize();
  });
  $('#close').click(function(event) {
    event.preventDefault();
    win.close();
  });

});
