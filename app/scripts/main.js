$(document).ready(function() {
  var gui = require('nw.gui');
  // var win = gui.Window.get();
  $('#debug').click(function(event) {
    event.preventDefault();
    gui.Window.get().showDevTools();
  });

});
