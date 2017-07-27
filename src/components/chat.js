/**
 * Created by illya on 26/07/2017.
 */
import React, {Component} from 'react';
import Faclose from 'react-icons/lib/fa/close'

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {box: false, btn: true, text: "",conversation: [] };
        this.user = props.user;
        this.socket = props.socket;
    }

    componentDidMount() {
        this.socket.on('message', (conversation) => { // opponent wants rematch
           this.setState({conversation:conversation});

        });

    }

    openBox = () => {
        this.setState({box: true, btn: false});
    };
    closeBox = () => {
        this.setState({box: false, btn: true});
    };
    sendMessage = (event) => {
        event.preventDefault();
        let message = this.state.text;
        this.setState({text : ""});
        let tempArray = this.state.conversation;
        tempArray.push({'user' : this.user, 'message':message});
        this.setState({convarsation : tempArray});
        console.log(this.state.conversation);
        this.socket.emit('message', this.state.conversation);

    };

    onInputChange = (event)=> {
        this.setState({text: event.target.value});
    };

    render() {
        let placeHolder = 'Type message';
        let box = null;
        let conversation = this.state.conversation.map((message,index) => {
            if(message.user == this.user){
                return <div><p className="yourMessage" key={index}>{message.message}</p></div>}
            else{
                return <div style={{textAlign:'right'}}><p className="opponentMessage" key={index}>{message.message}</p></div>;
            }
        });
        if (this.state.box) {
            box = <div className="chatBox">
                <div className="chatHead"><Faclose className="close" onClick={this.closeBox}></Faclose></div>
                <div className="conversation">{conversation}</div>
                <form onSubmit={this.sendMessage}>
                    <input type="text" className="input" placeholder={placeHolder} onChange={this.onInputChange}
                           value={this.state.text}/></form>
            </div>
        }
        let btn = null;
        if (this.state.btn) {
            btn = <button className="btn btn-info" onClick={this.openBox}>Click to chat</button>
        }
        return (
            <div>{box}
                {btn}
            </div>
        );
    }

}
