//variables
const btnColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let isStart = false;

//listeners
$(document).keydown(function () {
  if (!isStart) {
    chooseColoredBtn();
    isStart = true;
  }
});

$(".btn").click(function () {
  if (isStart) {
    const userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);
    animateAndPlaySound(userChosenColor);
    if (checkUserSequence()) {
      if (userPattern.length === gamePattern.length) {
        setTimeout(chooseColoredBtn, 1000);
      }
    } else {
      restart();
    }
  }
});

//functions
function chooseColoredBtn() {
  const randomColor = chooseRandomColor();
  level++;
  userPattern = [];
  $("h1").text(`Level ${level}`);
  //fade(show) the item durring 100ms then hide it then show it
  // Flash the color to indicate the game pattern
  $(`#${randomColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

// choose random color
function chooseRandomColor() {
  const index = Math.floor(Math.random() * btnColors.length); //generate random number between 0 - 3
  const colorChosen = btnColors[index];
  gamePattern.push(colorChosen);
  return colorChosen;
}

//play sound
function playSound(name) {
  let audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

// Play specific sound and animate button
function animateAndPlaySound(color) {
  $(`#${color}`).addClass("pressed");
  setTimeout(() => $(`#${color}`).removeClass("pressed"), 100);
  playSound(color);
}

// check user sequence
function checkUserSequence() {
  return gamePattern.slice(0, userPattern.length).toString() === userPattern.toString();
}

// Restart game
function restart() {
  $("h1").text("Game Over! Press A Key to Restart");
  $("body").addClass("game-over");
  setTimeout(() => $("body").removeClass("game-over"), 200);
  playSound("wrong");
  gamePattern = [];
  userPattern = [];
  level = 0;
  isStart = false;
}
