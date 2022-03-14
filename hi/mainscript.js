window.onmousemove = function() {barFunction()};

function barFunction() {
  if (event.clientY < 60) {
    document.getElementById("topbar").style.top = "0px";
    document.getElementById("arrow").style.top = "40px";
  } else {
    document.getElementById("topbar").style.top = "-60px";
    document.getElementById("arrow").style.top = "0px";
  }
}