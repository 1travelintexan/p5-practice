console.log("Script connected! Let's get coding!");

let firstScreen = document.querySelector("#first-screen");
let secondScreen = document.querySelector("#second-screen");
let thirdScreen = document.querySelector("#third-screen");

let secondScreenWidth = 1000;
let secondScreenHeight = 700;

//character size and position variables
let aquamanX = 20;
let aquamanHeight = 300;
let aquamanWidth = 300;

function setup() {
  //load all the images you will need here
  bg = loadImage("./images/aquabg.jpeg");
  aquaman = loadImage("./images/aquaman.png");

  //create the canvas and append it to the div from html
  let canvas = createCanvas(secondScreenWidth, secondScreenHeight);
  canvas.parent("second-screen");
}

function draw() {
  //draw background for game from line 13
  background(bg);

  //draw image character of aquaman from line 14
  image(
    aquaman,
    aquamanX,
    //this is the screen height minus the height of the character minus 20 for bottom space. Remember minus is up ^ in canvas!
    secondScreenHeight - aquamanHeight - 20,
    aquamanWidth,
    aquamanHeight
  );

  // function to move my character left and right
  if (keyIsPressed && keyCode === LEFT_ARROW && aquamanX > 20) {
    aquamanX -= 5;
  } else if (
    keyIsPressed &&
    keyCode === RIGHT_ARROW &&
    aquamanX + aquamanWidth < secondScreenWidth
  ) {
    aquamanX += 5;
  }
}
