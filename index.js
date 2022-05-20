const boxes = [
  { id: 0, color: "green" },
  { id: 1, color: "red" },
  { id: 2, color: "yellow" },
  { id: 3, color: "blue" },
];

let computerMoves = [];
let userMoveCount = 0;
let canPlay = false;
let totalMoves = 0;

const container = document.getElementById("container");
const playBtn = document.getElementById("play");
const resetBtn = document.getElementById("reset");
let textBox = document.getElementById("text-box");

playBtn.addEventListener("click", () => {
  canPlay = true;
  playBtn.disabled = true;
  playBtn.classList.add("disable");
  handleTurns();
});

resetBtn.addEventListener("click", () => {
  resetGame();
});

const playTone = (audioBox) => {
  let audio = document.getElementById(`audio-${audioBox}`);
  audio.play();
};

const getRandomNumber = () => {
  number = Math.floor(Math.random() * (4 - 0)) + 0;
  return number;
};

const getComputerMove = () => {
  randomNumber = getRandomNumber();
  turn = boxes.findIndex((box) => {
    if (box.id == randomNumber) {
      computerMoves.push(box.color);
      return true;
    }
  });
};

const computerTurn = () => {
  getComputerMove();
  for (let i = 0; i < computerMoves.length; i++) {
    let resetBox = () => {
      setTimeout(() => {
        document
          .getElementById(`${computerMoves[i]}-bg`)
          .classList.remove("active");
      }, i + 1 * 500);
    };
    setTimeout(() => {
      document.getElementById(`${computerMoves[i]}-bg`).classList.add("active");
      playTone(computerMoves[i]);
      resetBox();
    }, (i + 1) * 1000);
  }
};

const userTurn = (element = container) => {
  element.onclick = function (e) {
    if (e.target.classList.contains("simon-box")) {
      id = e.target.id;
      playTone(id);
      e.target.classList.add("active");

      setTimeout(() => {
        e.target.classList.remove("active");
      }, 500);

      matchMoves(id, userMoveCount);
      userMoveCount++;
    }
    renderCounter();
  };
  totalMoves++;
};

const renderCounter = () => {
  document.getElementById("turn-counter").innerHTML = totalMoves;
};

const resetGame = () => {
  totalMoves = 0;
  computerMoves = [];
  textBox.innerHTML = '<h3>Turnos: <span id="turn-counter">0</span></h3>';
  playBtn.disabled = false;
  playBtn.classList.remove("disable");
};

const gameOver = () => {
  if (canPlay) {
    textBox.innerHTML = `<h3>Juego terminado en ${totalMoves} turnos</h3> `;
    canPlay = false;
  }
};

const matchMoves = (id, userMoveCount) => {
  if (id !== computerMoves[userMoveCount]) {
    gameOver();
  }
  if (userMoveCount + 1 === computerMoves.length) {
    setTimeout(() => {
      handleTurns();
    }, 1000);
  }
};

const handleTurns = () => {
  if (canPlay) {
    userMoveCount = 0;
    computerTurn();
    userTurn();
  }
};
