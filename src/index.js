import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/*
class Square extends React.Component {      //Square components are now controlled components. The Board has full control over them.
    render() {                
        return (
            <button 
                className="square" 
                onClick={() => this.props.onClick()}    //  render onClick  
            
            >        
                {this.props.value}          {/* this.props.value passes a prop from a parent ""Board component to a child Square component. Passing props is how information flows in React apps, from parents to children }
            </button>
        );
    }
}
*/

//We’ll now change the Square to be a function component.

function Square(props) {
    return ( 
        <button className="square" onClick={props.onClick}>
            {props.value}                                       {/* We have changed this.props to props both times it appears. */}
        </button>
    );
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };

    }

    handleClick(i) {
        const squares = this.state.squares.slice(); 
        if (calculateWinner(squares) || squares[i]) {       //  if there's a winner or the square is full, return and dont change anything 
            return;
        }    //  create a copy of the squares array to modify instead of modifying the existing array. an ability to undo and redo certain actions is a common requirement in applications. Avoiding direct data mutation lets us keep previous versions of the game’s history intact, and reuse them later
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,       //  flips to opposite whatever state is now 

        });
    }
    
    renderSquare(i) {
        return <Square 
            value={this.state.squares[i]}               //  now we're passing two props to Square component: value and onClick
            onClick={() => this.handleClick(i)}         //  tells react to set up onClick event listener. We could give any name to the Square’s onClick prop or Board’s handleClick method, and the code would work the same. In React, it’s conventional to use on[Event] names for props which represent events and handle[Event] for the methods which handle the events.
        />;
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Nexdt player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}



function calculateWinner(squares) {
    const lines =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i =0; i <lines.length; i++) {
        const [a, b ,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;    //if no winner
}


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
