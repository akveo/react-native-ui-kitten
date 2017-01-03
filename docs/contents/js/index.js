function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 2;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    scrollTo(element, to, duration - 2);
  }, 10);
}

document.addEventListener( "DOMContentLoaded", function(){
  document.getElementById('next').addEventListener("click", function(){
      scrollTo(document.body, document.getElementById('free').offsetTop, 100);
  });
});

