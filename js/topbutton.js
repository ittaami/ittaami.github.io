$(document).ready(function() {
  var button = $('#button-up');
  $(window).scroll (function () {
    if ($(this).scrollTop () > 300) {
      button.fadeIn();
    } else {
      button.fadeOut();
    }
});
button.on('click', function(){
$('body, html').animate({
scrollTop: 0
}, 550);
return false;
});
});
