var canvas;
var context;
var previousColorElement;
var previousThicknessElement;
var isDrawing = false;

window.onload = function () {
    canvas = document.getElementById("drawingCanvas");
    context = canvas.getContext("2d");
    
    //Attach events for drawing
    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmouseout = stopDrawing;
    canvas.onmousemove = draw;
    context.strokeStyle = "rgb(212,21,29)";
    context.lineWidth = 1;
    previousColorElement = document.getElementById("redPen");
    previousThicknessElement = document.getElementById("thinPen");
};

function changeColor(color, imgElement) {
    // Change drawing color
    context.strokeStyle = color;
    
    // Restyle selected img element
    imgElement.className = "Selected";
    
    // Return the previously clicked img element to its normal state
    if (previousColorElement != null) {
        previousColorElement.className = "";
    }
    previousColorElement = imgElement;
}

function changeThickness(thickness, imgElement) {
    // Change drawing thickness
    context.lineWidth = thickness;
    
    // Restyle selected img element
    imgElement.className = "Selected";
    
    // Return the previously clicked img element to its normal state
    if(previousThicknessElement != null) {
        previousThicknessElement.className = "";
    }
    previousThicknessElement = imgElement;
}

function startDrawing(e) {
    // Start drawing
    isDrawing = true;
    
    // Create a new path with the current stroke color and thickness
    context.beginPath();
    
    // Put the pen down where the mouse is positioned
    // e is the onmousedown event, it's pageX and pageY coordinates are relative to the whole page origin
    // we must calculate relative to the canvas origin
    context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}

function draw(e) {
    if (isDrawing == true) {
        // Find the new mouse cursor position
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;
        
        // Draw a line to the new position
        context.lineTo(x,y);
        context.stroke();
    }
}

function stopDrawing() {
    isDrawing = false;
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    // Find the associated img element
    var imageCopy = document.getElementById("savedImageCopy");
    
    // Show the canvas data in the img
    imageCopy.src = canvas.toDataURL();
    
    // Unhide the div that holds the img, now that it has an image
    var imageContainer = document.getElementById("savedCopyContainer");
    imageContainer.style.display = "block";
}