
function changeprofile1(){
   document.getElementById("background").src ="./Images/alienbackground.png";
   document.getElementById("alien").src ="./Images/alienbody.png";
   document.getElementById("alien").style.padding = "1px";
   document.getElementById("background").style.minWidth = "12%";
}

function changeprofile2(){
  document.getElementById("background").src ="./Images/alienbackground2.png";
  document.getElementById("alien").src ="./Images/alienbody2.png";
  document.getElementById("alien").style.padding = "3px";
  document.getElementById("background").style.minWidth = "5%";
} 

function changeprofile3(){
   document.getElementById("background").src ="./Images/alienbackground3.png";
   document.getElementById("alien").src ="./Images/alienbody3.png";
   document.getElementById("alien").style.padding = "2px";
   document.getElementById("background").style.minWidth = "5%";
}

function bluebg(){
   document.getElementById("background").style.filter = "hue-rotate(0deg)";
}

function pinkbg(){
   document.getElementById("background").style.filter = "hue-rotate(90deg)";
}

function purplebg(){
   document.getElementById("background").style.filter = "hue-rotate(60deg)";
}

function orangebg(){
   document.getElementById("background").style.filter = "hue-rotate(200deg)";
}

function greenbg(){
   document.getElementById("background").style.filter = "hue-rotate(280deg)";
}

function pinka(){
   document.getElementById("alien").style.filter = "hue-rotate(280deg)";
}

function yellowa(){
   document.getElementById("alien").style.filter = "hue-rotate(0deg)";
}

function bluea(){
   document.getElementById("alien").style.filter = "hue-rotate(100deg)";
}

function greena(){
   document.getElementById("alien").style.filter = "hue-rotate(50deg)";
}

function orangea(){
   document.getElementById("alien").style.filter = "hue-rotate(300deg)";
}