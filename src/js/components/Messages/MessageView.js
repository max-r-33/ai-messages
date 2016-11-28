import React from 'react';
import TextRegion from './MessageView/TextRegion';
import MessageContainer from './MessageView/MessageContainer';
import Sessions from 'express-session';
import axios from 'axios';

var messagesArr = [];

export default class MessageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    text: 'hello',
                    key: 1
                }
            ]
        };
    }
    componentDidMount() {
        console.log('component did mount');
        axios.get('http://localhost:9000/api/getAllMessages/117390815415116').then(response => {
            messagesArr = response.data.map(function(msg, i) {
                return {text: msg.message.message, key: i, sender: msg.message.sender};
            });
            if (messagesArr.length > 0) {
                this.setState({messages: messagesArr});
            }
        });
    }
    handleMessageSend(text, event) {
        event.preventDefault();
        messagesArr = this.state.messages;
        var newMsg = {
            text: text,
            key: messagesArr[messagesArr.length - 1].key + 1
        };
        messagesArr.push(newMsg);
        this.setState({messages: messagesArr});
        //sends request to backend
        axios.post('http://localhost:9000/api/handleRequest', {textRequest: text}).then(response => {
            console.log(response);
            messagesArr.push({
                text: response.data.message,
                key: messagesArr[messagesArr.length - 1].key + 1
            });
            this.setState({messages: messagesArr});
        });
    }
    render() {
        return (
            <div>
                <h1>MessageView</h1>
                <MessageContainer msgArr={this.state.messages}/>
                <TextRegion sendMessage={this.handleMessageSend.bind(this)}/>
            </div>
        );
    }
}
