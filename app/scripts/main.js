// App
var pixelcounter = require('pixelcounter');
// Drag and Drop
var dropArea = document.getElementById('dropArea');
var inputFile = document.getElementById('inputfile');
var titleFolder = $('.onFolderin .title, .finish .folder .name');
var namesFolders = [];
var pathsFolders = [];
var pixelsProgress;


// Reset's
var resetVars = function () {
  pixelsProgress = null;
  while (namesFolders.length > 0) {namesFolders.shift();}
  while (pathsFolders.length > 0) {pathsFolders.shift();}
};

// window stop drag
window.addEventListener('dragover',function(event){
  event.preventDefault();
},false);
window.addEventListener('drop',function(event){
  event.preventDefault();
},false);

// Events handler of DropArea
dropArea.ondragstart = function(event) {
  event.preventDefault();
  event.stopPropagation();
  dropArea.className = 'drophover';
};

dropArea.ondragend = function(event) {
  event.preventDefault();
  event.stopPropagation();
  dropArea.className = 'dragfold';
};

dropArea.ondragenter = function(event) {
  event.preventDefault();
  event.stopPropagation();
  dropArea.className = 'drophover';
};
// On drop file's
dropArea.ondrop = function(event) {
  event.preventDefault();
  event.stopPropagation();
  resetVars();
  dropArea.className = 'folderin';
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


// Odometer and counter
var countReduced = $('.count .reduced .number')[0];
var countFull = $('.count .full .number');
var odometer = new Odometer({
  el: countReduced,
  value: 0,
  format: '.ddd',
  duration: 1500,
  theme:'minimal'
});
odometer.render();

// OnCount
var onCount = function (path, filePixelsArea, pixels) {
  pixelsProgress = pixels;
  // Update full
  var number = numPoint(pixelsProgress);
  countFull.text(number);
};
// Update Finish
var updateFinish = function (pixelsFinish) {
  var reduced = abbrNum(pixelsFinish);
  var number = reduced.n;
  var letter = reduced.l;
  // Format number
  number = numPoint(number);
  pixelsFinish = numPoint(pixelsFinish);
  // Update odometer
  $('.result .reduced .number').text(number);
  $('.result .reduced .unit').text(letter);
  $('.result .full .number').text(pixelsFinish);
  // Update Shared link
  var link = encodeURIComponent('http://aerolab.github.io/pixelcounterapp');
  var content = encodeURIComponent('I just count '+number+letter.toUpperCase()+' ('+pixelsFinish+') pixels in Pixel Counter by @aerolab');
  var title = encodeURIComponent('Pixel Counter App | Power by Aerolab');
  var image = encodeURIComponent('');
  var twitterHref = 'http://twitter.com/share?url='+link+'&text='+content+'&hashtags=pixelcounter,aerolab';
  var facebookHref = 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]='+link+'&p[images][0]='+image+'&p[title]='+title+'&p[summary]='+content;
  $('.shared-twitter').attr('href', twitterHref);
  $('.shared-facebook').attr('href', facebookHref);

};

// OnEndå
var onEnd = function (finishCount) {
  // Update Finish
  updateFinish(finishCount);
  //
  // Show Finish
  $('.oncount').removeClass('show');
  $('.finish').addClass('show');
};

// Init Count
var initCount = function (pathsFolders) {
  // Show View On Count
  $('.oncount').addClass('show');
  // Hide setting
  $('#setting').hide('100');

  // Filter extensions
  var formats = $('.filter .extensions:checked').map(function(){
      return $(this).val();
    }).get();

  // Start pixel counter
  pixelcounter.start(pathsFolders, formats, onCount, onEnd);

  // Start Interval
  startUpdate();

};

// Press Start
$('.start').click(function(event) {
  event.preventDefault();
  // if droparea has folder in.
  if ($('#dropArea').hasClass('folderin')) {
    initCount(pathsFolders);
  }
});
// Abbreviations Number
var abbrNum = function (number) {
    // result Object
    var result = {};
    // Enumerate number abbreviations
    var abbrev = [ 'k', 'm', 'b', 't' ];
    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);
        // If the number is bigger or equal do the abbreviation, ej. "10.000 K" -> "10 M"
        if(size+'0' <= number) {
             result.n = parseInt(number/size);
             // Add the letter for the abbreviation
             result.l = abbrev[i];
             break;
        }else{
          result.n = number;
          result.l = '';
        }
    }
    return result;
};
// Formated Number
var numPoint = function (num) {
  return num.toFixed(0).replace(/./g, function(c, i, a) {
                return i && c !== ',' && ((a.length - i) % 3 === 0) ? '.' + c : c;
            });
};

// Update Count
var updateOdometer = function (pixelsProgress) {
  var reduced = abbrNum(pixelsProgress);
  var number = reduced.n;
  var letter = reduced.l;
  // Update odometer
  odometer.update(number);
  $('.count .reduced .unit').text(letter);

};

// Interval's
var interval;

// Start Interval
function startUpdate () {
  interval = window.setInterval(function () {
                if (pixelsProgress) {
                  updateOdometer(pixelsProgress);
                }
              },2000);
}
// Stop Interval
function stopUpdate() {
  clearInterval(interval);
}

// Reset OnCount
var resetOnCount = function () {
  odometer.update(0);
  $('.count .reduced .unit').text('');
  $('.count .full .number').text('');
};

// Start Over
var resetFirstep = function () {
  // Resets
  resetOnCount();
  resetVars();
  // Show setting
  $('#setting').show('100');

  dropArea.className = 'dragfold';
};

$('.start-over').click(function(event) {
  event.preventDefault();
  $('.finish').removeClass('show');
  resetFirstep();
});
