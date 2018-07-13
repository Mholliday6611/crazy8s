import React, { Component } from 'react';
import socketApi from './utils/sockets'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state ={
      game:false,
      player:false
    }

    socketApi.main(
        game=>this.setState({
        game: game
      }),
        player=>this.setState({
        player:(player -1)
      })
    )

  }
  renderHand(hand){
   return(<ul>
    {hand.map((card,index)=><li onClick={()=>socketApi.playCard(index)}>{card.name}</li>)}
      </ul>)   
  }
  render() {
    console.log(this.state)
    return (
      this.state.game.started?
      <div className="App">
        <div>
          {!(this.state.player === false) && this.renderHand(this.state.game.players[this.state.player].hand)}
        </div>
        <button onClick={socketApi.draw}>Draw</button>

        <h1>Current Turn: Player {this.state.game.currentTurn +1}</h1>
        <h1>Current Card: {this.state.game.cardsInPlay[0].name}</h1>
      </div>

      :

      <div>
        <button onClick={()=>socketApi.startGame(5)}>click</button>
      </div>
    );
  }
}

export default App;
