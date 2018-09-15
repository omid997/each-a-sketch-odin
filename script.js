let newColor;
let myFactor = 0.1; // add 10% black every mouseover
let mySize = 16;
let container = document.getElementById("container");

createboxes(mySize);

let boxes = document.querySelectorAll(".box");
boxes.forEach( (box) => {
    box.addEventListener("mouseover" , function(){
        if (box.classList.contains("colored")) {
            newColor = changedColor(box , myFactor);
        } else {
            newColor = randomColor();
        }
        giveColor(box , newColor);
    });
});

let rangeElement = document.getElementById("myfactor");
let rangePercentage = document.getElementById("rangePercentage");
rangeElement.addEventListener("change" , function(){
    myFactor = rangeElement.value;
    rangePercentage.innerHTML = Math.round(myFactor * 100);
    console.log(myFactor)
});

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click" , function(){
    boxes.forEach( (box) => {
        box.removeAttribute("style");
    });
})

function randomColor() {
    function randomNumber() {
        return Math.floor(Math.random() * (255 + 1));
    }
    return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
}
function giveColor(box , color) {
    box.style.backgroundColor = color;
    box.classList.add("colored");
}
function changedColor(box , factor) {
    let oldColor = box.style.backgroundColor;
    let regex = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    let match = regex.exec(oldColor);
    let newRed = match[1] * ( 1 - factor );
    if (newRed > 255) 
        newRed = 255;
    if (newRed < 0) 
        newRed = 0;
    let newGreen = match[2] * ( 1 - factor );
    if (newGreen > 255) 
        newGreen = 255;
    if (newGreen < 0) 
        newGreen = 0;
    let newBlue = match[3] * ( 1 - factor );
    if (newBlue > 255) 
        newBlue = 255;
    if (newBlue < 0) 
        newBlue = 0;
    return `rgb(${newRed}, ${newGreen}, ${newBlue})`;
}

function createboxes(num) {
    // first, delete old boxes
    while( container.firstChild ) {
        container.removeChild(container.firstChild);
    }

    let count = Math.pow(num , 2);
    let boxSize = (600/num) - 2;
    for(let i = 1; i <= count; i++) {
        let boxElement = document.createElement("div");
        boxElement.className = `box box-${i}`;
        boxElement.style = `height: ${boxSize}px; width: ${boxSize}px;`;
        container.appendChild(boxElement);
    }
}