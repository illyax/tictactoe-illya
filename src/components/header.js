import React, {Component} from 'react';
import '../../public/styles.css';
import logo from '../../public/toe.png';
class Header extends Component {
    constructor(props){
        super(props);
        if(props.user){
            console.log(props.user);
        }

    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>Welcome to TicTacToe</h1>
                </div>
            </div>
        );
    }
}

export default Header;
