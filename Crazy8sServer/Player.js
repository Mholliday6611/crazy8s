class Player {
	constructor(id){
		this.hand = [];
		this.id = id
	}

	draw(game){
		//PASS IN THE GAME'S DECK
		let drawnCard = game.deck.cards.shift();
		this.addToHand(drawnCard)
		game.nextTurn(0)
	}

	//cardIndex is the index of the card in Player's hand
	//checkCards is the function from the Game class needs to be put into this one
	playCard(cardIndex, checkCards){
		console.log(cardIndex)
		if(checkCards(this.hand[cardIndex])){
			this.hand.splice(cardIndex,1)
			return true
		}else{
			console.log("Can't play that card")
			return false
		}
	}

	addToHand(card){
		this.hand.push(card)
	}
}

module.exports = Player