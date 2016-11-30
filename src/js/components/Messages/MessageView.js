import React from 'react';
import TextRegion from './MessageView/TextRegion';
import MessageContainer from './MessageView/MessageContainer';
import axios from 'axios';
import auth from '../../utils/LoginStatus';

var messagesArr = [];
var elem;

export default class MessageView extends React.Component {

    constructor(props) {
        super(props);
        //gets logged in user
        //sets messages to initial vals
        this.state = {
            user: auth.getLoggedInUser(),
            messages: [
                {
                    text: 'hello',
                    key: 1
                }
            ]
        };
    }

    componentDidMount() {
        //makes get request to the messages endpoint with user's id
        //loops through all of the user's messages and builds messages objects
        //that get put onto messagesArr
        axios.get(`http://localhost:9000/api/getAllMessages/${this.state.user.id}`).then(response => {
            //checks if there are messages
            //if there are, build objects with them.
            if (response.data.length > 0) {
                messagesArr = response.data.map(function(msg, i) {
                    return {text: msg.message.text, key: i, sender: msg.message.sender};
                });
                //sets state with newly created messagesArr
                this.setState({messages: messagesArr});
            }
        });
    }

    handleMessageSend(text, event) {
        event.preventDefault();
        //gets current messagesArr
        messagesArr = this.state.messages;

        //builds new message to send to backend and adds it to arr
        //then updates state.
        var newMsg = {
            text: text,
            key: messagesArr[messagesArr.length - 1].key + 1,
            sender: 'user'
        };
        messagesArr.push(newMsg);
        this.setState({messages: messagesArr});

        //sends request to backend
        axios.post('http://localhost:9000/api/handleRequest', {
            textRequest: text,
            userid: this.state.user.id
        }).then(response => {
            messagesArr.push({
                text: response.data.text,
                key: messagesArr[messagesArr.length - 1].key + 1
            });
            this.setState({messages: messagesArr});
        });
    }
    render() {
        return (
            <div className='messageView'>
                <MessageContainer msgArr={this.state.messages}/>
                <TextRegion sendMessage={this.handleMessageSend.bind(this)}/>
            </div>
        );
    }
}
