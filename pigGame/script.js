'use strict';

// Selecting global elements
const score0Elm = document.querySelector('#score--0');
const score1Elm = document.getElementById('score--1');
const current0Elm = document.getElementById('current--0');
const current1Elm = document.getElementById('current--1');
const player0Elm = document.querySelector('.player--0');
const player1Elm = document.querySelector('.player--1');
const diceElm = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores;
let currentScore;
let activePlayer;
let activeGame;

// Functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Elm.classList.toggle('player--active');
  player1Elm.classList.toggle('player--active');
};

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  activeGame = true;

  score0Elm.textContent = 0;
  score1Elm.textContent = 0;
  current0Elm.textContent = 0;
  current1Elm.textContent = 0;

  player0Elm.classList.remove('player--winner');
  player1Elm.classList.remove('player--winner');
  player0Elm.classList.add('player--active');
  player1Elm.classList.remove('player--active');
  diceElm.classList.add('hidden');
};
init();

// Starting conditions
score0Elm.textContent = 0;
score1Elm.textContent = 0;
diceElm.classList.add('hidden');

// Rolling the dice
btnRoll.addEventListener('click', function () {
  if (activeGame) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceElm.classList.remove('hidden');
    diceElm.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold Score
btnHold.addEventListener('click', function () {
  if (activeGame) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      activeGame = false;
      diceElm.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    switchPlayer();
  }
});

// Reseting
btnNew.addEventListener('click', init);
