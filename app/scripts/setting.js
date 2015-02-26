$(function() {

// Dismiss - drop
// $('#dismiss').click(function(event) {
//   event.preventDefault();

// });
// Save
$('#save').click(function(event) {
  event.preventDefault();
  $('.modal').removeClass('show');
});
// Check All
$('#all').on('change', function () {
  if (this.checked) {
    $('#none').prop('checked', false);
    checkall();
  }else{
    $('#all').prop('checked', true);
  }
});
// Check None
$('#none').on('change', function () {
  if (this.checked) {
    $('#all').prop('checked', false);
    uncheckall();
  }else{
    $('#none').prop('checked', true);
  }
});

// Checked anydo
$('.extensions').on('change', function() {
  var filters = $('.extensions').length;
  var checked = $('.extensions:checked').length;
  if (filters == checked) {
    $('#all').prop('checked', true);
  }else if(checked == 0){
    $('#none').prop('checked', true);
  }else{
    $('#all,#none').prop('checked', false);
  }
});
// Function checked
var checkall = function () {
  $('.extensions').prop('checked', true);
}
var uncheckall = function () {
  $('.extensions').prop('checked', false);
}

});
