
let aDeck;
let aDealer;
let aPlayer; 

const board = document.getElementById('board');
const startButton = document.getElementById('start');
const hitButton = document.getElementById('hit');
const hitAndStandButtons = document.getElementById('player-choice');
const standButton = document.getElementById('stand');
const dealerCards = document.getElementById('dealer');
const playerCards = document.getElementById('player');
const header = document.getElementById('header');
const resultBox = document.getElementById('result-box');
const closeButton = document.getElementById('close');
const aboveTwentyOne = document.getElementById('above-21');
const aboveTwentyOneHeader = document.getElementById('above-21-header');

startButton.addEventListener('click', handleStartClick);

hitButton.addEventListener('click', handleHitClick);

standButton.addEventListener('click', handleStandClick);

// what
closeButton.addEventListener('click', (event) => {
  event.preventDefault();
  resultBox.close();
});


function handleStartClick() {
  aDeck = new Deck();
  aDealer = new Dealer();
  aPlayer = new Player();

  console.log('Start button clicked');
  aDealer.dealCards(aDeck, aPlayer);
  showInitialDealtCardsInContainers(aPlayer.playerHand, aDealer.dealerHand);

  const restartButton = document.createElement('button');
  restartButton.setAttribute('id', 'restart');
  restartButton.setAttribute('class', 'start-button game-button');
  restartButton.innerText = 'Restart';

  header.replaceChild(restartButton, startButton);
 
}


function handleHitClick() {
  console.log("Hit button clicked");

  const cardToDisplay = aDealer.hitPlayer(aPlayer, aDeck);

  addCardToPlayerContainer(cardToDisplay);

  if (aPlayer.sumOfCards > 21) {
      playerWentAboveTwentyOne();
  }
}

function handleStandClick(){
  console.log("Stand button clicked");

  freezeButtons();

  aDealer.hitAllDealerCards(aDeck);
  
  showAllDealerCards(aDealer.dealerHand);

  //const myTimeout = setTimeout(showResultBox, 5000); (see setinterval on 'showAllDealerCards')

}

function showResultBox(){
  resultBox.showModal();
}

function playerWentAboveTwentyOne() {
  aboveTwentyOne.showModal();
  aboveTwentyOneHeader.style.opacity = '1.0';

  let indexForMyFunctionInterval = 0;
  const myFunction = setInterval(()=>{
    if (indexForMyFunctionInterval == 0) {
      aboveTwentyOneHeader.style.opacity = '0.0';
      indexForMyFunctionInterval++;
    } else {
      aboveTwentyOne.close();
      handleStandClick();
      clearInterval(myFunction);
    }
  }, 2000);

}

function freezeButtons(){
  hitButton.disabled = true;
  hitButton.style.opacity = 0.6;
  hitButton.style.cursor = 'not-allowed';

  standButton.disabled = true;
  standButton.style.opacity = 0.6;
  standButton.style.cursor = 'not-allowed';

}

function showAllDealerCards(dealerHand) {
  
  let cardIsInvisible = true;
  let dealerCardIndex = 2;
  const myFunction = setInterval(()=>{
    if (cardIsInvisible) {
      updateCardToVisible();
      cardIsInvisible = false;
    } else if (dealerCardIndex < dealerHand.length) {
      addCardToDealerContainer(dealerHand[dealerCardIndex]);
      dealerCardIndex++;
    } else {
      setTimeout(showResultBox, 2000);
      clearInterval(myFunction);
    }
  }, 500);

}

function showInitialDealtCardsInContainers(playerHand, dealerHand){

  let isPlayer = true;
  let playerCardIndex = 0;
  let dealerCardIndex = 0;
  const myFunction = setInterval(()=>{
    if (isPlayer) {
      addCardToPlayerContainer(playerHand[playerCardIndex]);
      playerCardIndex++;
    } else {
      addCardToDealerContainer(dealerHand[dealerCardIndex]);
      dealerCardIndex++;
    }
    isPlayer = !isPlayer;
    if (playerCardIndex === 2 && dealerCardIndex === 2) {
      clearInterval(myFunction);
      setTimeout(showHitAndStandButtons, 800);
    }
  }, 500);

}

function showHitAndStandButtons() {
  hitAndStandButtons.style.opacity = '1.0';
}

function addCardToDealerContainer(jsCard){
  let name = jsCard.name;
  let hiddenName = jsCard.hiddenName;
  const card = document.createElement('img')
  card.setAttribute('src', './img/deck/' + name + '.svg')
  card.setAttribute('alt', name);
  card.setAttribute('class', 'card');
  card.setAttribute('id', hiddenName);
  dealerCards.appendChild(card);

}

function addCardToPlayerContainer(jsCard){
  let name = jsCard.name;
  let hiddenName = jsCard.hiddenName;
  const card = document.createElement('img')
  card.setAttribute('src', './img/deck/' + name + '.svg')
  card.setAttribute('alt', name);
  card.setAttribute('class', 'card');
  card.setAttribute('id', hiddenName);
  playerCards.appendChild(card);
}

function updateCardToVisible() {
  const cardOne = aDealer.dealerHand[0];
  cardOne.makeVisible();
  const cardOneElement = document.getElementById(cardOne.name); 
  cardOneElement.src = './img/deck/' + cardOne.name + '.svg';
  cardOneElement.alt = 'cardOne.name';
}