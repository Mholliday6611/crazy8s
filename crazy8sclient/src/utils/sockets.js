import io from 'socket.io-client'

const socket = io('/gameRoom');

const socketApi = {
	main : function(cb,join,room){
		socket.on('updateGame', game=>cb(game))

		socket.on('joined',player=>join(player))


		socket.emit("room", room)
	},
	startGame : function(numberOfPlayers){
		socket.emit("startGame", numberOfPlayers)
	},
	playCard : function(index){
		socket.emit("playCard", index)
	},
	draw: function(){
		socket.emit("draw")
	},
	changeSuit: function(suit){
		socket.emit("changeSuit", suit)
	}
}

export default socketApi