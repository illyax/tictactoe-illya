import React, {Component} from 'react';
import '../../public/styles.css';

class Board extends Component {

    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.turn = 1;
        this.user = props.user;
        this.board = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
        this.state = {board: this.board, turn: "Wait for opponents turn", playAgain : false};
        this.rowsCounter = [0, 0, 0, 0];
        this.colCounter = [0, 0, 0, 0];
        this.formTopLeftDiagonalCounter = 0;
        this.fromTopRightDiagonalCounter = 0;

    }

    componentDidMount() {
        if (this.user == 1) { //first user to begin
            this.setState({turn: "Your turn"});
        }

        this.socket.on('getBoard', (board) => { // update board after move
            this.setState({board});
            this.turn = this.user;
            this.setState({turn: "Your turn"});

        });

        this.socket.on('lost', (board) => { // you lost
            this.setState({board});
            this.setState({turn: "You lose"});
            this.playAgain();

        });

        this.socket.on('draw', (board) => { // you lost
            this.setState({board});
            this.setState({turn: "draw"});
            this.playAgain();

        });

        this.socket.on('playAgain', (board) => { // opponent wants rematch
            this.setState({board});
            this.resetCounters();
            this.setState({turn: "Wait for opponents turn"});
            this.setState({playAgain:false});

        });
    }

    handleClick = (i, j) => {
        if (this.state.board[i][j] == "" && this.turn == this.user) {
            let tempState = this.state.board; // lets define temp to manipulate our board
            if (!this.user == 1) {
                tempState[i][j] = "x";
            }
            else {
                tempState[i][j] = "o";
            }
            this.setState({board:tempState});
            if(!this.checkWin(i, j, tempState)){
                this.socket.emit('move', tempState); // send updated board to server which will send it to other user
                this.turn = !this.user; // switch turns
                this.setState({turn: "Wait for opponents turn"});
            }

        }
    };

    checkDraw =(tempState)=>{
        let flag = true;
        for(let i in this.state.board){
            for(let j in this.state.board[i]){
                if(this.state.board[i][j] == ""){
                    flag = false;
                }
            }
        }
        if(flag){//draw
            this.socket.emit('draw', tempState);
            this.turn = !this.user; // switch turns
            this.setState({turn: "Draw"});
            this.playAgain(); // show button
            return true;

        }
        return false;
    };
    checkWin = (i, j, tempState) => {
        this.rowsCounter[i]++;
        this.colCounter[j]++;
        if (i == j) {
            // top left diagonal
            this.formTopLeftDiagonalCounter++;
        }
        else if (i + j == 3) {
            // top right diagonal
            this.fromTopRightDiagonalCounter++;
        }

        if (this.rowsCounter[i] == 4 || this.colCounter[j] == 4 || this.formTopLeftDiagonalCounter == 4
            || this.fromTopRightDiagonalCounter == 4) { // if any of counters is 4 then bingo
            this.socket.emit('win', tempState);
            this.turn = !this.user; // switch turns
            this.setState({turn: "You win"});
            this.playAgain(); // show button
            return true;
        }
        if(this.checkDraw(tempState)){
            return true
        }
        return false;

    };

    playAgain = () =>{
        this.setState({playAgain : true}); // show button
    };

    startAnotherGame = () =>{
        this.setState({playAgain:false});
        this.turn = this.user;
        this.setState({turn: "Your turn"});
        this.resetCounters();
        this.socket.emit('playAgain', this.board);

    };

    resetCounters = () =>{
        this.rowsCounter = [0, 0, 0, 0];
        this.colCounter = [0, 0, 0, 0];
        this.formTopLeftDiagonalCounter = 0;
        this.fromTopRightDiagonalCounter = 0;
        this.board = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
        this.setState({board:this.board});
        console.log(this.board);

    };
    render() {
        // build table
        let tableBoard = this.state.board.map((row, index) => {
            let cols = row.map((col, colIndex) => {
                return (<td key={[index, colIndex]}
                            onClick={this.handleClick.bind(null, index, colIndex)}>{this.state.board[index][colIndex]}</td>);
            });
            return (<tr key={index}>{cols}</tr>);

        });
        if(!this.state.playAgain){
        return (
            <div className="App">
                <div className="container">
                    <h2>{this.state.turn}</h2>
                    <table className=" card table-bordered table-responsive">
                        <tbody>
                        {tableBoard}
                        </tbody>
                    </table>
                </div>
            </div>
        );}
        else{
            return (
                <div className="App">
                    <div className="container">
                        <h2>{this.state.turn}</h2>
                        <button className="btn btn-success" onClick={this.startAnotherGame.bind(null)}>Rematch</button>
                        <table className=" card table-bordered table-responsive">
                            <tbody>
                            {tableBoard}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }

}

export default Board;
