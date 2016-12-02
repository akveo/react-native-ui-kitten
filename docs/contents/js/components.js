document.addEventListener( "DOMContentLoaded", function(){
  var phone = document.getElementById('phoneImg');
  var phoneOffset = document.getElementById('phone').offsetTop;
  var components = document.getElementsByClassName('component');
  var currentImageComponent = 0;
  function selectImageComponent(scrolled) {
    scrolled = scrolled + phoneOffset;
    for(var i = 0; i < components.length; i++){
      var condition = scrolled > components[i].offsetTop;
      if(components[i+1]) condition = condition && components[i+1].offsetTop > scrolled;
      if(condition){
        if(currentImageComponent === i) return;
        currentImageComponent = i;
        phone.src = '/images/components/' + components[i].getAttribute('image');
        return;
      }
    }
  }

  selectImageComponent(window.pageYOffset || document.documentElement.scrollTop);

  window.onscroll = function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    selectImageComponent(scrolled);
  };

}, false );
