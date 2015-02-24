// App
var pixelcounter = require('pixelcounter');
var availableFormats = ['bmp', 'gif', 'jpg', 'jpeg', 'png', 'psd', 'tiff', 'webp', 'svg'];

// Drag and Drop
var dropArea = document.getElementById('dropArea');
var titleFolder = $('.onFolderin .title, .finish .folder .name');
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
  // Press Start
  $('.start').click(function(event) {
    event.preventDefault();
    // if droparea has folder in.
    if ($('#dropArea').hasClass('folderin')) {
      initCount(pathsFolders);
    };
  });

};


// Odometer and counter
  var countReduced = $('.count .reduced .number')[0];
  var countFull = $('.count .full .number');
  odometer = new Odometer({
    el: countReduced,
    value: 0,
    format: 'd',
    duration: 1500,
    theme:'default'
  });
  odometer.render();

// OnCount

// Init Count
var initCount = function (pathsFolders) {
  // Show View On Count
  $('.oncount').addClass('show');
  // Start pixel counter
  for (dir in pathsFolders) {
    console.log('arranco con la carpeta: '+pathsFolders[dir]);
    pixelcounter.start(pathsFolders[dir], availableFormats, onCount, onEnd);
  }
}
var interval;
// Show Progress
var pixelsProgress;
var onCount = function (path, filePixelsArea, pixels) {
  pixelsProgress = pixels;
  // Update full
  $('.count .full .number').text(pixelsProgress);
}
interval = setInterval(function () {
  if (pixelsProgress) {
    console.log('pixels contados: '+pixelsProgress);
    updateOdometer(pixelsProgress);
  };
}
,3000);
// Update Count
var updateOdometer = function (pixelsProgress) {
  var reduced = abbrNum(pixelsProgress);
  var number = reduced.n;
  var letter = reduced.l;
  // Update odometer
  odometer.update(number);
  $('.count .reduced .unit').text(letter);

}
// Update Finish
var updateFinish = function (pixelsFinish) {
  var reduced = abbrNum(pixelsFinish);
  var number = reduced.n;
  var letter = reduced.l;
  // Update odometer
  $('.result .reduced .number').text(number);
  $('.result .reduced .unit').text(letter);
  $('.result .full .number').text(pixelsFinish);

}
// Abbreviations Number
function abbrNum(number) {
    // result Object
    var result = new Object;
    // Enumerate number abbreviations
    var abbrev = [ "k", "m", "b", "t" ];
    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);
        // If the number is bigger or equal do the abbreviation
        if(size+'0' <= number) {
             result.n = parseInt(number/size);
             // Add the letter for the abbreviation
             result.l = abbrev[i];
             break;
        }else{
          result.n = number;
          result.l = "";
        }
    }
    return result;
}

// Show Finish
// OnEnd
var onEnd = function (p) {
  console.log(p);
  console.log('termine');
  clearInterval(interval);
  pixelsProgress=null;
  // Update Finish
  updateFinish(p);
  // Show Finish
  $('.oncount').removeClass('show');
  $('.finish').addClass('show');
}
// Start Over
var resetFirstep = function () {
  dropArea.className = 'dragfold';

};

$('.start-over').click(function(event) {
  event.preventDefault();
  $('.finish').removeClass('show');
  dropArea.className = 'dragfold';
  // $('.finish').addClass('show');
});
