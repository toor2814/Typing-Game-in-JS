const words = ["apple", "banana", "cherry", "date"];

let score = 0;
let correctKeystrokes = 0;
let totalKeystrokes = 0;
let currentWordIndex = 0;
let currentWord = words[currentWordIndex];
let startTime;
let timerInterval;

const wordElement = document.getElementById("word");
const userInput = document.getElementById("userInput");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");

function updateWord() {
  currentWord = words[currentWordIndex];
  wordElement.textContent = currentWord;
  userInput.value = "";
}

function startGame() {
  startTime = new Date().getTime();
  updateWord();
  userInput.focus();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  timeElement.textContent = elapsedTime;
}

function endGame() {
  clearInterval(timerInterval);
  const accuracy = (correctKeystrokes / totalKeystrokes) * 100;
  const restart = confirm(
    `Game Over!\nScore: ${score}\nTime: ${
      timeElement.textContent
    } seconds\nAccuracy: ${accuracy.toFixed(2)}%\n\nDo you want to play again?`
  );
  if (restart) {
    location.reload();
  }
}

userInput.addEventListener("input", function (event) {
  const userInputValue = userInput.value;
  const currentWordValue = currentWord.substring(0, userInput.value.length);

  if (userInputValue === currentWordValue) {
    // Correct keystroke
    totalKeystrokes++;
    correctKeystrokes++;

    if (userInput.value === currentWord) {
      // Completed the word
      score++;
      scoreElement.textContent = "Score: " + score;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      if (currentWordIndex === 0) {
        endGame();
      } else {
        updateWord();
      }
    }
  } else {
    // Incorrect keystroke
    userInput.value = currentWordValue;
    totalKeystrokes++;
  }
});

startGame();
