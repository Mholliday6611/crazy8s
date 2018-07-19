const Game = require("./gameLogic")

let game = {}
const gameSocket = function(server){

	const io = require('socket.io')(server)

	let gameRoom = io.of("/gameRoom");

	gameRoom.on('connection', function(socket){

		socket.on('room', room=>{
			socket.join(room, ()=>{
				gameRoom.in(room).clients((err,clients)=>{
					socket.emit('joined', clients.length)
					if(game[Object.keys(socket.rooms)[0]] !== undefined){
					socket.emit('updateGame', game[Object.keys(socket.rooms)[0]])
					}
				})
			})
		})

		socket.on('startGame', numberOfPlayers =>{
			if(numberOfPlayers === 0){
				numberOfPlayers = 2
			}else if(numberOfPlayers > 8){
				numberOfPlayers = 8
			}
			game[Object.keys(socket.rooms)[0]] = new Game()
			game[Object.keys(socket.rooms)[0]].startGame(numberOfPlayers)
			gameRoom.in(Object.keys(socket.rooms)[0]).emit('updateGame', game[Object.keys(socket.rooms)[0]])
		})

		socket.on('playCard', cardIndex => {
			let result = game[Object.keys(socket.rooms)[0]].players[game.currentTurn].playCard(cardIndex,game[Object.keys(socket.rooms)[0]].checkCards)
			console.log(result)
			if(result){
				gameRoom.in(Object.keys(socket.rooms)[0]).emit('updateGame',game[Object.keys(socket.rooms)[0]])
			}else{
				gameRoom.in(Object.keys(socket.rooms)[0]).emit('error', "Can't Place that card!")
			}
		})

		socket.on('draw', ()=>{
			game[Object.keys(socket.rooms)[0]].players[game.currentTurn].draw(game[Object.keys(socket.rooms)[0]])
			gameRoom.in(Object.keys(socket.rooms)[0]).emit('updateGame',game[Object.keys(socket.rooms)[0]])
		})

		socket.on('changeSuit', suit=>{
			game.changeSuit(suit)
			gameRoom.in(Object.keys(socket.rooms)[0]).emit('updateGame',game[Object.keys(socket.rooms)[0]])
		})

	})
}	

module.exports = gameSocket