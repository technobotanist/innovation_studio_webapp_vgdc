var inIframe = false;
var cover = document.getElementById("iframe-cover");
var container = document.getElementById("iframe-container");
var iframe = document.getElementById("my-iframe");

/* cover.addEventListener("click", function() {
  if(!inIframe)
  {
    console.log("lock mouse");
    inIframe = true;
    lockMouse();
    cover.style.display = 'none';
  }
});

document.addEventListener("keydown", function(event)
{
  if(inIframe && event.key == "+")
  {
    console.log("unlock mouse");
    inIframe = false;
    unlockMouse();
    cover.style.display = 'block';
  }
});

// Lock the mouse position
function lockMouse()
{
  var canvas = document.getElementById("my-iframe");
  canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
  canvas.requestPointerLock();
}

// Unlock the mouse position
function unlockMouse()
{
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
  document.exitPointerLock();
} */

function changeSrc(src)
{
  // Set the src attribute to the new URL
  iframe.src = src;
}
