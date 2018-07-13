class Deck {
	constructor(){
		this.cards = [];
	}

	createDeck(){
		let card = (suit,value) => {
			this.name = value + " of " + suit
			this.suit = suit
			this.value = value

			return {name:this.name, suit:this.suit, value:this.value}
		}

		let values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
		let suits = ['Clubs', 'Diamonds', 'Spades', 'Hearts']

		for (let s = 0; s<suits.length; s++ ){
			for (let v = 0; v < values.length; v++){
				this.cards.push(card(suits[s], values[v]))
			}
		}
	}

	shuffle() {
	  let currentIndex = this.cards.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = this.cards[currentIndex];
	    this.cards[currentIndex] = this.cards[randomIndex];
	    this.cards[randomIndex] = temporaryValue;
	  }
	}
}

module.exports = Deck