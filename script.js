console.log("Script connected! Let's get coding!");
//gameover starts as false!!!
let gameIsOver = false;

//all the screens organized with variables and meaningful names
let firstScreen = document.querySelector("#first-screen");
let secondScreen = document.querySelector("#second-screen");
let thirdScreen = document.querySelector("#third-screen");

//buttons organized with variables
let startBtn = document.querySelector("#start-btn");
let restartBtn = document.querySelector("#restart-btn");
let gameOverBtn = document.querySelector("#gameover");

//all character variables
let aquamanHeight = 150;
let aquamanWidth = 150;
let aquamanX = 20;
//this is the screen height minus the height of the character minus 20 for bottom space. Remember minus is up ^ in canvas!
let aquamanStartY = 700 - aquamanHeight - 20;

//all object variables
let sharkX = 1000;
let sharkY = 20;
let sharkLength = 500;
let sharkHeight = 300;

//This is the array of objects to loop over
let objectArray = [
  { x: sharkX, y: sharkY },
  { x: sharkX + 1200, y: sharkY + 200 },
  { x: sharkX + 2000, y: sharkY + 400 },
];

//this is a better place to load all images. It runs once before setup
function preload() {
  //load all the images you will need here
  bg = loadImage("./images/aquabg.jpeg");
  aquaman = loadImage("./images/aquaman.png"); //character size and position variables
  sharkImg = loadImage("./images/shark.png");
}

function setup() {
  //create the canvas and append it to the div from html
  let canvas = createCanvas(1000, 700);
  canvas.parent("second-screen");
}
function draw() {
  //draw background for game from line 13
  background(bg);

  //draw image character of aquaman and the objects
  image(aquaman, aquamanX, aquamanStartY, aquamanWidth, aquamanHeight);

  //for loop for the looping of the objectArray which is x and y coordinates of three objects.
  // Then draw the image with each element of the array as the x and y, this will loop through as we move the object from right to left by subtracting the x by 2
  for (let i = 0; i < objectArray.length; i++) {
    image(
      sharkImg,
      objectArray[i].x,
      objectArray[i].y,
      sharkLength,
      sharkHeight
    );
    objectArray[i].x -= 4;

    //collision with objects
    if (
      aquamanStartY >= objectArray[i].y + 20 &&
      aquamanStartY <= objectArray[i].y + sharkHeight - 40 &&
      aquamanX + aquamanWidth >= objectArray[i].x &&
      aquamanX <= objectArray[i].x + sharkLength
    ) {
      gameIsOver = true;
    }

    //this if statement checks if the image has past 0 and then resets the x so it will come again from the right
    if (objectArray[i].x < -500) {
      objectArray[i].x = 2000;
    }
  }

  // function to move my character left, right, up and down and checks if he is on the screen
  if (keyIsPressed && keyCode === LEFT_ARROW && aquamanX > 0) {
    aquamanX -= 5;
  } else if (
    keyIsPressed &&
    keyCode === RIGHT_ARROW &&
    aquamanX + aquamanWidth < width
  ) {
    aquamanX += 5;
  } else if (keyIsPressed && keyCode === UP_ARROW && aquamanStartY > 0) {
    aquamanStartY -= 5;
  } else if (
    keyIsPressed &&
    keyCode === DOWN_ARROW &&
    aquamanStartY + aquamanHeight < height
  ) {
    aquamanStartY += 5;
  }

  //if the game is over then call the game over function
  if (gameIsOver) {
    gameOver();
  }
}

//this is what happens when the game is over. Hide the game screen, stop the draw function and reset the objects and show the game over screen
function gameOver() {
  firstScreen.style.display = "none";
  secondScreen.style.display = "none";
  thirdScreen.style.display = "flex";
  //no loop is used to stop the draw function so it is not always running behind the scenes
  noLoop();
}
//loading the window and showing the first screen and hiding the other two to start
window.addEventListener("load", () => {
  secondScreen.style.display = "none";
  thirdScreen.style.display = "none";

  //listener on the START button to hide the first screen and show the game canvas
  startBtn.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "flex";
    thirdScreen.style.display = "none";
  });

  //listener on the RE-START button to hide the GAME OVER screen and show the game canvas
  restartBtn.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "flex";
    thirdScreen.style.display = "none";
    gameIsOver = false;
    //loop is used to start the game again after the gameover screen stops it
    objectArray = [
      { x: sharkX, y: sharkY },
      { x: sharkX + 800, y: sharkY + 200 },
      { x: sharkX + 1400, y: sharkY + 400 },
    ];
    loop();
  });

  //just a button to simulate that the game is over
  gameOverBtn.addEventListener("click", () => {
    gameIsOver = true;
  });
});
