/**
 * Created by illya on 26/07/2017.
 */
import React, {Component} from 'react';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {box: false};
        this.box = null;
    }

    componentDidMount() {


    }

    openBox = () => {
            this.setState({box: true});
    };

    render() {
        let box = null;
        if (this.state.box) {
            box = <div className="chatBox"><div className="chatHead"></div></div>
        }

        return (
            <div>{box}
        <button className="btn btn-info" onClick={this.openBox}>Click to chat</button></div>
    );
    }

}
