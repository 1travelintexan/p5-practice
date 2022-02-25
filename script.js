console.log("Script connected! Let's get coding!");

let firstScreen = document.querySelector("#first-screen");
let secondScreen = document.querySelector("#second-screen");
let thirdScreen = document.querySelector("#third-screen");

function setup() {
  bg = loadImage("./images/dc.jpeg");
  let canvas = createCanvas(720, 400);
  canvas.parent("first-screen");
}

function draw() {
  background(bg);
}
