// import {Player} from './Player.js';
// import {Deck} from './Deck.js';
// import {Card} from './Card.js';
// import {MyTools} from './MyTools.js';
class Dealer {
    constructor() {
        this.dealerHand = [];
        this.sumOfCards = 0;
    }

    addCardToDealerHand(aCard) {
        this.dealerHand.push(aCard);
        this.sumOfCards += aCard.valueOfCard;
    }

    dealCards(aDeck, aPlayer) {
        aDeck.shuffleCards();

        aPlayer.addCardToPlayerHand(aDeck.drawOneCard());

        const card = aDeck.drawOneCard();
        card.makeInvisible();
        this.addCardToDealerHand(card)

        aPlayer.addCardToPlayerHand(aDeck.drawOneCard());

        this.addCardToDealerHand(aDeck.drawOneCard());
    }

    hitPlayer(aPlayer, aDeck) {
        const card = aDeck.drawOneCard();
        aPlayer.addCardToPlayerHand(card);
        return card;
    }


    hitAllDealerCards(aDeck){
        // const cardOne = this.dealerHand[0];
        // cardOne.makeVisible();

        MyTools.ifAceShouldAceChange(this, this.dealerHand);

        while (this.sumOfCards < 17) {
            const newCard = aDeck.drawOneCard();
            this.addCardToDealerHand(newCard);
            MyTools.ifAceShouldAceChange(this, this.dealerHand);
        }
    }

    showResults(playerSum, dealerSum) {
        console.log("Player's Total Sum: ", playerSum);
        console.log("Dealer's Total Sum: ", dealerSum);

        if (playerSum <= 21 && (playerSum > dealerSum || dealerSum > 21)) {
            console.log("You won! It seems that you are in luck today!");
        } else if (dealerSum <= 21 && (dealerSum > playerSum || playerSum > 21)) {
            console.log("The dealer won! Sorry player, you are not in luck...");
        } else if (dealerSum === playerSum && dealerSum <= 21) {
            console.log("It's a tie!");
        } else {
            console.log("Both went above 21, nobody won!")
        }

    }

}