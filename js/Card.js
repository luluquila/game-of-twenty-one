class Card {
    constructor(rank, suit){
        this.rank = rank;
        this.suit = suit;
        this.isVisible = true;

        if (this.rank > 10) {
            this.valueOfCard = 10;

            switch (this.rank) {
                case 11:
                    this.name = "jack_of_" + this.suit;
                    break;
                case 12:
                    this.name = "queen_of_" + this.suit;
                    break;
                case 13:
                    this.name = "king_of_" + this.suit;
                    break;
            }

        } else if (this.rank === 1) {
            this.valueOfCard = 11;
            this.name = "ace_of_" + this.suit;

        } else {
            this.valueOfCard = rank;
            this.name = this.rank + "_of_" + this.suit;
        }

        this.hiddenName = this.name;
    }

    changeAce() {
        this.valueOfCard = 1;
    }

    makeInvisible() {
        this.isVisible = false;
        this.name = 'card_flipped_down';
    }

    makeVisible() {
        this.isVisible = true;
        this.name = this.hiddenName;
    }
}