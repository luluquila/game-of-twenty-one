//import {Card} from './Card.js';
class Player {
    constructor() {
        this.playerHand = [];
        this.sumOfCards = 0;
    }

    addCardToPlayerHand(aCard) {
        this.playerHand.push(aCard);
        this.sumOfCards += aCard.valueOfCard;
    }

}