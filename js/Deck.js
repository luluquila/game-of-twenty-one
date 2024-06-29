//import {Card} from './Card.js';
class Deck {
    constructor() {
        this.deckOfCards = [];

        for (let s = 1; s <= 4; s++) {
            let suit;
            for (let rank = 1; rank <= 13; rank++) {
                switch (s) {
                    case 1:
                        suit = 'spades';
                        break;
                    case 2:
                        suit = 'hearts';
                        break;
                    case 3:
                        suit = 'diamonds';
                        break;
                    case 4:
                        suit = 'clubs';
                        break;
                }
                this.deckOfCards.push(new Card(rank, suit));
            }
        }
        
    }

    shuffleCards(){

        // Fisher Yates Method. I want to discuss it/ understand it better later

        for (let i = this.deckOfCards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let k = this.deckOfCards[i];
            this.deckOfCards[i] = this.deckOfCards[j];
            this.deckOfCards[j] = k;
        }


        return this.deckOfCards;
        //do I need a return?
    }

    drawOneCard() {
        const card = this.deckOfCards.pop();
        return card;
    }

    resetDeck() {
        // call constructor...??
    }

    numberOfCards() {
        return this.deckOfCards.length;
    }

}
