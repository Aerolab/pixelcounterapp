window._is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

$(function() {

  if ($('#flow').length == 1) {

    if( _is_mobile ) {
      $('#flow').addClass('is_mobile');
    } else {
      var s = skrollr.init({forceHeight: false});
    }
  }

  $('.all').click(function(event) {
    event.preventDefault();
    $.scrollTo($('section.download'),2000);
  });

});