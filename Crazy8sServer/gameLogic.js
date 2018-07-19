const Deck = require("./Deck")
const Player = require("./Player")
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
	constructor(){
		this.numberOfPlayers = 0;
		this.players = [];
		this.deck = new Deck();
		this.cardsInPlay = []
		this.currentTurn = 0
		this.changedSuit = ""
		this.orderFoward = true 
		this.suitChangedNeeded = false
		this.started = false

		//bounded functions
		this.checkCards = this.checkCards.bind(this)
		this.nextTurn = this.nextTurn.bind(this)
		this.changeSuit = this.changeSuit.bind(this)
		this.findPersonToDraw = this.findPersonToDraw.bind(this)
	}

	startGame(numberOfPlayers){
		this.started = true
		this.numberOfPlayers = numberOfPlayers;
		this.createPlayers(this.numberOfPlayers);
		this.deck.createDeck();
		this.deck.shuffle();
		this.deal()
		this.playTopDeck()
	}


	//Utility functions
	createPlayers(number){
		for(let i=0; i<number; i++){
			this.players.push(
					new Player(i)
				)
		}
	}

	deal(){
		for(let i = 0; i<6; i++){
			this.players.forEach(player=>{
				let cardAdded = this.deck.cards.shift()
				player.addToHand(cardAdded)
			})
		}
	}

	checkCards(cardToCheck){
		console.log("My Card")
		console.log(cardToCheck)
		let suitToComapre = this.changedSuit === ""? this.cardsInPlay[0].suit : this.changedSuit;
		console.log("SUIT "+suitToComapre)
		if(cardToCheck.value === "8"|| cardToCheck.value === this.cardsInPlay[0].value || cardToCheck.suit === suitToComapre){
			this.cardsInPlay.unshift(cardToCheck)
			this.cardSuccessfullyPlayed(cardToCheck)

			return true
		}else{
			return false
		}
	}

	cardSuccessfullyPlayed(card){
		let turnsSkipped = 0

		let personToDraw = this.findPersonToDraw()

		this.changedSuit = ""

		if(card.value === "8"){
			//Wild Card Place on anything change suit
			this.suitChangedNeeded = true
		}else if (card.value === "J"){
			//Skip
			turnsSkipped ++
		}else if (card.value === "Q"){
			//Reverse
			this.orderFoward = !this.orderFoward
		}else if (card.value === "A"){
			//Next Player draws 4
			for(let i = 0; i < 4 ; i++){
				this.players[personToDraw].draw(this)
			}
		}else if (card.value === "2"){
			//Next Player picks up 2
			for(let i = 0; i < 2 ; i++){
				this.players[personToDraw].draw(this)
			}
		}

		if(!this.suitChangedNeeded){
			this.nextTurn(turnsSkipped)
		}
		
	}

	changeSuit(suit){
		this.changedSuit = suit;
		this.suitChangedNeeded = false

		this.nextTurn(0)
	}

	nextTurn(turnsToSkip){
		if(this.orderFoward){
			this.currentTurn += (1+turnsToSkip)
			if(this.currentTurn >= this.numberOfPlayers){
				this.currentTurn = 0
			}
		}else{
			this.currentTurn -= (1+turnsToSkip)
			if(this.currentTurn < 0){
				this.currentTurn = this.numberOfPlayers -1
			}
		}
	}	

	findPersonToDraw(){
		if(this.orderFoward){
			if((this.currentTurn + 1) == this.numberOfPlayers){
				return 0
			} else {
				return this.currentTurn +1
			}
		}{
			if((this.currentTurn -1) < 0){
				return this.numberOfPlayers
			} else {
				return this.currentTurn -1
			}
		}
	}

	playTopDeck(){
		let topCard = this.deck.cards.shift()
		this.cardsInPlay.unshift(topCard)
	}

}

module.exports = Game;

game = new Game(5)

game.startGame()


