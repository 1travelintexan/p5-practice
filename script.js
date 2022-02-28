console.log("Script connected! Let's get coding!");
//gameover starts as false!!!
let gameIsOver = false;
let score = 0;

//all the screens organized with variables and meaningful names
let firstScreen = document.querySelector("#first-screen");
let secondScreen = document.querySelector("#second-screen");
let thirdScreen = document.querySelector("#third-screen");
let gameOverScore = document.querySelector("#score");

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
let objectArray = [];
let sharkImg;
let alligatorImg;
let squidImg;
let sharkX = 1000;
let sharkY = 20;
let sharkLength = 500;
let sharkHeight = 300;

//This is the array of objects to loop over
//the Math.random is * by 400 bc its the height of the canvas minus the height of the shark. So they dont loop half under the canvas and look bad

//this is a better place to load all images. It runs once before setup
function preload() {
  //load all the images you will need here
  bg = loadImage("./images/aquabg.jpeg");
  aquaman = loadImage("./images/aquaman.png"); //character size and position variables
  sharkImg = loadImage("./images/shark.png");
  alligatorImg = loadImage("./images/alligator.png");
  squidImg = loadImage("./images/squid.png");
}
function setup() {
  //create the canvas and append it to the div from html
  let canvas = createCanvas(1000, 700);
  canvas.parent("second-screen");

  objectArray = [
    { x: sharkX, y: Math.floor(Math.random() * 400) + 30, img: sharkImg },
    {
      x: sharkX + 1200,
      y: Math.floor(Math.random() * 400) + 30,
      img: alligatorImg,
    },
    {
      x: sharkX + 2400,
      y: Math.floor(Math.random() * 400) + 30,
      img: squidImg,
    },
    {
      x: sharkX + 3400,
      y: Math.floor(Math.random() * 400) + 30,
      img: sharkImg,
    },
    {
      x: sharkX + 5000,
      y: Math.floor(Math.random() * 400) + 30,
      img: alligatorImg,
    },
    {
      x: sharkX + 6200,
      y: Math.floor(Math.random() * 400) + 30,
      img: sharkImg,
    },
    {
      x: sharkX + 7500,
      y: Math.floor(Math.random() * 400) + 30,
      img: squidImg,
    },
  ];

  //set the font size for the score
  textSize(60);
}

let x = 20;
let y = 20;
let speedX = 5;
let speedY = 3;

function draw() {
  //draw background for game from line 13
  background(bg);

  fill(255);
  text("Score:" + " " + score, width - 300, 60);

  //draw image character of aquaman and the objects
  image(aquaman, aquamanX, aquamanStartY, aquamanWidth, aquamanHeight);

  //for loop for the looping of the objectArray which is x and y coordinates of three objects.
  // Then draw the image with each element of the array as the x and y, this will loop through as we move the object from right to left by subtracting the x by 2
  for (let i = 0; i < objectArray.length; i++) {
    let currentObject = objectArray[i];
    image(
      currentObject.img,
      currentObject.x,
      currentObject.y,
      sharkLength,
      sharkHeight
    );
    currentObject.x -= 5;

    //collision with objects
    if (
      aquamanStartY >= objectArray[i].y + 20 &&
      aquamanStartY <= objectArray[i].y + sharkHeight - 40 &&
      aquamanX + aquamanWidth >= objectArray[i].x &&
      aquamanX <= objectArray[i].x + sharkLength
    ) {
      gameIsOver = true;
    }
    // because the shark doesnt always perfectly land on a certain number
    //you may need to test for a range that is equal to the speed
    //in this case the shark moves -=5 so I check for a range of 5. If I check for more then I may get +2 on the score

    if (currentObject.x < 5 && currentObject.x >= 0) {
      score++;
    }

    //this if statement checks if the image has past 0 and the length of the shark
    //then resets the x so it will come again from the right
    if (currentObject.x <= -500) {
      currentObject.x = 9000;
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
  gameOverScore.innerHTML = score;
  //no loop is used to stop the draw function so it is not always running behind the scenes
  noLoop();
}
//loading the window and showing the first screen and hiding the other two to start
window.addEventListener("load", () => {
  secondScreen.style.display = "none";
  thirdScreen.style.display = "none";
  noLoop();

  //listener on the START button to hide the first screen and show the game canvas
  startBtn.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "flex";
    thirdScreen.style.display = "none";
    loop();
  });

  //listener on the RE-START button to hide the GAME OVER screen and show the game canvas
  restartBtn.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "flex";
    thirdScreen.style.display = "none";
    gameIsOver = false;
    //reset the score to zero
    score = 0;

    //reset the objects in their starting positions
    objectArray = [
      { x: sharkX, y: Math.floor(Math.random() * 400) + 30, img: sharkImg },
      {
        x: sharkX + 1200,
        y: Math.floor(Math.random() * 400) + 30,
        img: alligatorImg,
      },
      {
        x: sharkX + 2400,
        y: Math.floor(Math.random() * 400) + 30,
        img: squidImg,
      },
      {
        x: sharkX + 3400,
        y: Math.floor(Math.random() * 400) + 30,
        img: sharkImg,
      },
      {
        x: sharkX + 5000,
        y: Math.floor(Math.random() * 400) + 30,
        img: alligatorImg,
      },
      {
        x: sharkX + 6200,
        y: Math.floor(Math.random() * 400) + 30,
        img: sharkImg,
      },
      {
        x: sharkX + 7500,
        y: Math.floor(Math.random() * 400) + 30,
        img: squidImg,
      },
    ];
    //reset aquaman back in his starting position
    aquamanX = 20;
    aquamanStartY = 700 - aquamanHeight - 20;
    //loop is used to start the game again after the gameover screen stops it
    loop();
  });
});
