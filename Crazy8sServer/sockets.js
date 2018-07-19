const Game = require("./gameLogic")

let game = {}
const gameSocket = function(server){

	const io = require('socket.io')(server)

	let gameRoom = io.of("/gameRoom");

	gameRoom.on('connection', function(socket){

		socket.on('room', room=>{
			socket.join(room, ()=>{
				gameRoom.in(room).clients((err,clients)=>{
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
			let currentRoom = Object.keys(socket.rooms)[0]
			let result = game[currentRoom].players[game[currentRoom].currentTurn].playCard(cardIndex,game[currentRoom].checkCards)
			console.log(result)
			if(result){
				gameRoom.in(currentRoom).emit('updateGame',game[currentRoom])
			}else{
				gameRoom.in(currentRoom).emit('error', "Can't Place that card!")
			}
		})

		socket.on('draw', ()=>{
			let currentRoom = Object.keys(socket.rooms)[0]
			game[currentRoom].players[game[currentRoom].currentTurn].draw(game[currentRoom])
			gameRoom.in(currentRoom).emit('updateGame',game[currentRoom])
		})

		socket.on('changeSuit', suit=>{
			let currentRoom = Object.keys(socket.rooms)[0]

			game[currentRoom].changeSuit(suit)
			gameRoom.in(currentRoom).emit('updateGame',game[currentRoom])
		})

	})
}	

module.exports = gameSocket