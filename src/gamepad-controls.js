var inIframe = false;
var body = document.getElementById("main");
var nameHeader = document.getElementById("name");
var creatorHeader = document.getElementById("creator");
var coverText = document.getElementById("cover-text");

var cover = document.getElementById("iframe-cover");
var container = document.getElementById("iframe-container");
var iframe = document.getElementById("my-iframe");

var gameToPlayURL = "";

cover.addEventListener("click", function() {
  if(!inIframe)
  {
    console.log("lock mouse");
    changeSrc(gameToPlayURL, true);
    inIframe = true;
    lockMouse();
    //cover.style.display = 'none';
    cover.style.zIndex = -1;
  }
});

function applyCover()
{
  console.log("unlock mouse");
  inIframe = false;
  unlockMouse();
  //cover.style.display = 'block';
  cover.style.zIndex = 100;
}

document.addEventListener("keydown", function(event)
{
  if(inIframe && event.key == "+")
  {
    applyCover();
  }
});

document.addEventListener("mousemove", (event) => {
  if(main.classList.contains("locked"))
  {
    console.log("constrain mouse");
    mouseX = event.clientX;
    mouseY = event.clientY;
    const rect = iframe.getBoundingClientRect();
    const left = rect.left + window.scrollX;
    const top = rect.top + window.scrollY;
    const right = rect.right + window.scrollX;
    const bottom = rect.bottom + window.scrollY;
    if (event.clientX < left) {
      event.clientX = left;
    }
    if (event.clientX > right) {
      event.clientX = right;
    }
    if (event.clientY < top) {
      event.clientY = top;
    }
    if (event.clientY > bottom) {
      event.clientY = bottom;
    }
  }
  
});

// Lock the mouse position
function lockMouse()
{
  main.classList.add("locked");
}

// Unlock the mouse position
function unlockMouse()
{
  main.classList.remove("locked");
}

function changeSrc(src, fromPlayClick = false, jsonURL = "")
{
  // Set the src attribute to the new URL
  if(fromPlayClick)
  {
    iframe.src = src;
  }
  else
  {
    iframe.src = "";
    gameToPlayURL = src;

    var request = new XMLHttpRequest();

    request.open('GET', jsonURL);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        nameHeader.innerHTML = data.name;
        creatorHeader.innerHTML = data.creator;
        coverText.innerHTML = "Click Here to Play";
        console.log(data);
      } else {
        // We reached our target server, but it returned an error
        console.error('Error loading JSON file');
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.error('Error connecting to server');
    };
    
    request.send();

    applyCover();
  }
}
