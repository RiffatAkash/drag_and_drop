let soap = $(".slide_1 .soap")[0];



slide_1_show();
function slide_1_show(){
  $(".slide_1").removeClass("hidden");
  $(".slide_1 .drag").addClass("shake");
}

function third_slide(){  
  $(".slide_2 .message img").addClass("hideZoomOut");
  setTimeout(function() {
    $(".slide_3").removeClass("hidden");
    $(".slide_3 .element_1").removeClass("hidden").addClass("showZoomIn");
    $(".slide_3 .element_2").removeClass("hidden").addClass("showZoomIn");    
    
    $(".slide_1 .draggableElement").removeClass("showZoomIn").addClass("hideZoomOut");
    $(".slide_1 .germ").addClass("hideZoomOut");
    setTimeout(function() {
    	$(".slide_1 .draggableElement").addClass("hidden");
      $(".slide_3 .element_3").removeClass("hidden").addClass("showZoomIn");
      $(".slide_3").css('z-index','999');
    }, 400);

  },300);
  
}

function slide_2_show(){
  
  $(".slide_1 .draggableElement").removeClass("hidden");
  setTimeout(function() {
    $(".slide_2").removeClass("hidden");  
    $(".slide_2 .message").removeClass("hidden").addClass("showZoomIn");
    setTimeout(third_slide,1200);
  }, 500);
  $(".slide_1 .draggableElement").addClass("showZoomIn");
}

if (typeof window.orientation !== 'undefined'){dragElementMobile(soap);}else{dragElement(soap);}

function dragElement(elmnt) {
  var pos1 = 0, pos3 = 0;
  
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    $(".slide_1 .drag").removeClass("shake").addClass("hidden");
    
    
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  }

  function elementDrag(e) {    
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;
    leftSpace = elmnt.offsetLeft - pos1;

    draggedResult(elmnt,leftSpace);    
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function dragElementMobile(elmnt) {
  var pos1 = 0, pos3 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
  } else {
    elmnt.ontouchstart = dragMouseDown;
  }

  function dragMouseDown(e) {
    $(".slide_1 .drag").removeClass("shake").addClass("hidden");
    e.preventDefault();
    
    e = e.touches[0] || window.event;
    pos3 = e.clientX;
    
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e.touches[0] || window.event;
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;
    leftSpace = elmnt.offsetLeft - pos1;

    draggedResult(elmnt,leftSpace);   
  }
  function closeDragElement() {
    document.ontouchend = null;
    document.touchmove = null;
  }
}

function draggedResult(elmnt, leftSpace){
  if(leftSpace>160){
      $(".germ").css('background','');
      $(".slide_1 .germ img").addClass("hideZoomOut");
      $(".slide_1 .germ").addClass("fadeInZoom");
      $(elmnt).addClass("hideZoomOut").addClass("hidden");
      $(".slide_1 .drag_text").addClass("hideZoomOut");
      slide_2_show();
    }
    if (leftSpace<20) {leftSpace=20}
    if (leftSpace>190) {leftSpace=190}

    elmnt.style.top = "108px";
    elmnt.style.bottom = "51px";
    elmnt.style.left = leftSpace + "px";
}
