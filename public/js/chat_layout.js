function setHeight(vh){
  var chatHeight = vh - 81;
  var chatintrovh = vh - 61;
  $('.chat-msgs').css('height',chatHeight,'px');
  $('.chat-list').css('height',chatintrovh,'px');
}

$(window).resize(function() {
  var viewportHeight = $(window).height();
  setHeight(viewportHeight);
});

$(window).load(function(){
  var viewportHeight = $(window).height();
  setHeight(viewportHeight);
});

$(document).ready(function(){
    //$('.chat-msgs').scrollbar();
 

    //Add hover effect on chat-intro

});
