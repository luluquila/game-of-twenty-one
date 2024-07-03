
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

startButton.addEventListener('click', handleStartClick);

hitButton.addEventListener('click', handleHitClick);

standButton.addEventListener('click', handleStandClick);


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

}

function playerWentAboveTwentyOne() {

const message = document.createElement('div');
message.setAttribute('class', 'message');
message.innerText = 'Opss... that makes it above 21!';
board.appendChild(message);
message.style.opacity = '1.0';
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