import React, { Component } from 'react';
import socketApi from './utils/sockets'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
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
      }),
        this.props.match.params.room
    )
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  renderHand(hand){
    let playCard = this.state.game.currentTurn === this.state.player? (index)=>socketApi.playCard(index) : () => alert("Not your turn dick!")
   return(<div style={{"overflowX":"scroll",display:"inline"}}>
    {hand.map((card,index)=><img className="yourCard" height="100" onClick={()=>playCard(index)} src={`http://localhost:8080/images/${card.image}.png`}/>)}
      </div>)   
  }
  renderOthers(players){
    let others = players.filter((elem,index)=> index !== this.state.player)

    return(others.map(i=> <div className="otherCards"><h4>Player {i.id+1}'s Hand:</h4>X{i.hand.length}<img height="100" src='http://localhost:8080/images/card_back_black.png'/></div>))
  }

  render() {
    console.log(this.props)
    return (
      this.state.game.started?
      <div className="App">

        <div className="others">
        {this.renderOthers(this.state.game.players)}
        </div>

        <div className="GameDetails">
          <h1>Current Turn: Player {this.state.game.currentTurn +1}</h1>
          <h1>Current Card: </h1> <img height="100" src={`http://localhost:8080/images/${this.state.game.cardsInPlay[0].image}.png`}/>
          <h1>Wild Card Suit: {this.state.game.changedSuit}</h1>
        </div>

        <div className="playerHand">
          {
            this.state.game.currentTurn === this.state.player?
              !this.state.game.suitChangedNeeded?

              <div>
                <h1>Your Hand</h1>
                {!(this.state.player === false) && this.renderHand(this.state.game.players[this.state.player].hand)}
                <button onClick={socketApi.draw}>Draw</button>
              </div>
              :
              <div>
               <h1>Pick a Suit!</h1>
 
               <button onClick={()=>socketApi.changeSuit("Clubs")}>Clubs</button>
               <button onClick={()=>socketApi.changeSuit("Hearts")}>Hearts</button>
               <button onClick={()=>socketApi.changeSuit("Spades")}>Spades</button>
               <button onClick={()=>socketApi.changeSuit("Diamonds")}>Diamonds</button>
             </div>
           
           :
            <div>
                <h1>Your Hand</h1>
                {!(this.state.player === false) && this.renderHand(this.state.game.players[this.state.player].hand)}
            </div>

          }
        </div>
      </div>

      :

      <div>
        <input type="number" name="numberOfPlayers" onChange={this.handleChange}/>
        <button onClick={()=>socketApi.startGame(this.state.numberOfPlayers)}>click</button>
      </div>
    );
  }
}

export default App;
