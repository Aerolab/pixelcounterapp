// App
var pixelcounter = require('pixelcounter');
var availableFormats = ['bmp', 'gif', 'jpg', 'jpeg', 'png', 'psd', 'tiff', 'webp', 'svg'];

// Drag and Drop
var dropArea = document.getElementById('dropArea');
var titleFolder = $('.onFolderin .title');
var quantityFolder = $('.onFolderin .quantity');
var quantityNumberFolder = $('.onFolderin .quantity .number');
var dragged;

/* events fired on the draggable target */
dropArea.ondrag = function(event) {

};

dropArea.ondragstart = function(event) {
  dropArea.className = 'drophover';
  console.log('dropstart');
};

dropArea.ondragend = function(event) {
  dropArea.className = 'dragfold';
  console.log('dragend');
};

/* events fired on the drop targets */
dropArea.ondragover = function(event) {
  event.preventDefault();
  console.log('dragover');
};

dropArea.ondragenter = function(event) {
  dropArea.className = 'drophover';
  console.log('dropstart');

};

dropArea.ondragleave = function(event) {
  // dropArea.className = 'dragfold';
  console.log('dragleave');

};

dropArea.ondrop = function(event) {
  event.preventDefault();

  dropArea.className = 'folderin';
  console.log('folderin');

  var namesFolders = new Array();
  var pathsFolders = new Array();

  for( var i = 0; i < event.dataTransfer.files.length; i++ ) {

    var item = event.dataTransfer.files[i];
    // Add names folder
    namesFolders.push(item.name);
    // Add paths folder
    pathsFolders.push(item.path);
  }

  // Mostrar el nombre de las carpetas
  if (namesFolders.length > 2) {
    titleFolder.text(namesFolders[0]+', etc..');
  }else{
    titleFolder.text( namesFolders.join(', ') );
  }

};


$(document).ready(function() {

  // Odometer and counter
  var countReduced = $('.count .reduced .number')[0];
  var countFull = $('.count .full .number');
  odometer = new Odometer({
    el: countReduced,
    value: 0,
    format: '.ddd',
    theme:'default'
  });
  odometer.render();
  // setTimeout(odometer.update(1564),5000);

  // Pixel Counter Module
  // pixelCounter.start(directory, scanFormats, onCount, onEnd);

});
