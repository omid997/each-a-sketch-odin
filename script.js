let newColor;
let myFactor = 0.1; // add 10% black
let size = 16;
let boxs = document.querySelectorAll(".c");
let clearButton = document.getElementById("clear");
let rangeElement = document.getElementById("myfactor");
rangeElement.addEventListener("change" , function(){
    myFactor = rangeElement.value;
    console.log(myFactor)
});
boxs.forEach( (box) => {
    box.addEventListener("mouseover" , function(){
        if (box.hasAttribute("style")) {
            newColor = changedColor(box , myFactor);
        } else {
            newColor = randomColor();
        }
        giveColor(box , newColor);
    });
});
clearButton.addEventListener("click" , function(){
    boxs.forEach( (box) => {
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

    console.log(`rgb(${newRed}, ${newGreen}, ${newBlue})`);
    return `rgb(${newRed}, ${newGreen}, ${newBlue})`;
}