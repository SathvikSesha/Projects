let nums = document.querySelectorAll(".num");
let playAgainBtn = document.getElementById("play-again");
let scoreDisplay = document.getElementById("score-display");
let score = 0;
let gameOver = false;
function updateScoreDisplay() {
  scoreDisplay.innerText = `Score: ${score} \n`;
}

function handleClick(num) {
  if (gameOver) return;
  let random = Math.ceil(Math.random() * 6);
  let bid = parseInt(num.innerText);

  if (bid !== random) {
    score += bid;
    updateScoreDisplay();
  } else {
    gameOver = true;
    updateScoreDisplay();
    scoreDisplay.innerText += "Game Over!";
    playAgainBtn.style.display = "inline-block";
    playAgainBtn.style.animation = "fadeBounce 0.8s ease forwards";
    scoreDisplay.style.animation = "fadeBounce 0.8s ease forwards";
  }
}

nums.forEach((num) => {
  num.addEventListener("click", () => handleClick(num));
});

playAgainBtn.addEventListener("click", () => {
  score = 0;
  gameOver = false;
  scoreDisplay.innerHTML = ``;
  playAgainBtn.style.display = "none";
  console.clear();
  console.log("Game Restarted!");
  scoreDisplay.style.animation = "none";
});
