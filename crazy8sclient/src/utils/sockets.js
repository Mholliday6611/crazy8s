import io from 'socket.io-client'

const socket = io('http://localhost:8080/gameRoom');

const socketApi = {
	main : function(cb,join){
		socket.on('updateGame', game=>cb(game))

		socket.on('joined',player=>join(player))


		socket.emit("room", 5)
	},
	startGame : function(numberOfPlayers){
		socket.emit("startGame", numberOfPlayers)
	},
	playCard : function(index){
		socket.emit("playCard", index)
	},
	draw: function(){
		socket.emit("draw")
	}
}

export default socketApi