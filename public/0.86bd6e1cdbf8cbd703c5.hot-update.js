webpackHotUpdate(0,{

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_icons_lib_fa_close__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_icons_lib_fa_close___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_icons_lib_fa_close__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_icons_lib_ti_message__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_icons_lib_ti_message___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_icons_lib_ti_message__);
/**
 * Created by illya on 26/07/2017.
 */




class Chat extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

    constructor(props) {
        super(props);

        this.openBox = () => {
            this.setState({ box: true, btn: false, notification: false });
        };

        this.closeBox = () => {
            this.setState({ box: false, btn: true, messageAlert: "Click to chat" });
        };

        this.sendMessage = event => {
            event.preventDefault();
            let message = this.state.text;
            this.setState({ text: "" });
            let tempArray = this.state.conversation;
            tempArray.push({ 'user': this.user, 'message': message });
            this.setState({ convarsation: tempArray });
            this.socket.emit('message', this.state.conversation);
        };

        this.onInputChange = event => {
            this.setState({ text: event.target.value });
        };

        this.state = {
            box: false,
            btn: true,
            text: "",
            conversation: [],
            messageAlert: "Click to chat",
            notification: false
        };
        this.user = props.user;
        this.socket = props.socket;
    }

    componentDidMount() {
        this.socket.on('message', conversation => {
            // got message
            this.setState({ conversation: conversation, messageAlert: "New message", notification: true });
        });
    }

    render() {
        let placeHolder = 'Type message';
        let box = null;
        let conversation = this.state.conversation.map((message, index) => {
            if (message.user == this.user) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'p',
                        { className: 'yourMessage', key: index },
                        message.message
                    )
                );
            } else {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { style: { textAlign: 'right' } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'p',
                        { className: 'opponentMessage',
                            key: index },
                        message.message
                    )
                );
            }
        });
        if (this.state.box) {
            box = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'chatBox' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'chatHead' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_icons_lib_fa_close___default.a, { className: 'close', onClick: this.closeBox })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'conversation' },
                    conversation
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'form',
                    { onSubmit: this.sendMessage },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text', className: 'input', placeholder: placeHolder, onChange: this.onInputChange,
                        value: this.state.text })
                )
            );
        }
        let notification = null;
        if (this.state.notification) {
            notification = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_icons_lib_ti_message___default.a, { className: 'alertSign' });
        }
        let btn = null;
        if (this.state.btn) {
            btn = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { className: 'btn btn-info', onClick: this.openBox },
                this.state.messageAlert,
                notification
            );
        }
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            box,
            btn
        );
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Chat;


/***/ })

})