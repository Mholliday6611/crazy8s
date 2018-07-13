const Game = require("./gameLogic")

let game = new Game()
const gameSocket = function(server){

	const io = require('socket.io')(server)

	let gameRoom = io.of("/gameRoom");

	gameRoom.on('connection', function(socket){

		socket.on('room', room=>{
			socket.join(room, ()=>{
				gameRoom.in(room).clients((err,clients)=>{
					socket.emit('updateGame', game)
					socket.emit('joined', clients.length)
				})
			})
		})

		socket.on('startGame', numberOfPlayers =>{
			game.startGame(numberOfPlayers)
			gameRoom.in(Object.keys(socket.rooms)[0]).emit('updateGame', game)
		})

		socket.on('playCard', cardIndex => {
			let result = game.players[game.currentTurn].playCard(cardIndex,game.checkCards)
			console.log(result)
			if(result){
				gameRoom.in(Object.keys(socket.rooms)[0]).emit('updateGame',game)
			}else{
				gameRoom.in(Object.keys(socket.rooms)[0]).emit('error', "Can't Place that card!")
			}
		})

		socket.on('draw', ()=>{
			game.players[game.currentTurn].draw(game.deck)
			gameRoom.in(Object.keys(socket.rooms)[0]).emit('updateGame',game)
		})

	})
}	

module.exports = gameSocket