class MyTools {

    static ifAceShouldAceChange(aGamer, gamerHand) {

        let firstAce = this.firstAceInHand(gamerHand);
        
        if(firstAce != undefined && (aGamer.sumOfCards) > 21) {
            firstAce.changeAce();
            aGamer.sumOfCards -= 10; // can I make it automatic????????????????????????????????????????????????
        }

    }

    static firstAceInHand(aHand){
        let firstAce = aHand.find(myFunction)

        function myFunction(aCard) {
            return aCard.valueOfCard === 11;
        }

        return firstAce;

    }
}