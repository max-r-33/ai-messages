import React from 'react';
import TextRegion from './MessageView/TextRegion';
import MessageContainer from './MessageView/MessageContainer';
import axios from 'axios';
import auth from '../../utils/LoginStatus';
import config from '../../../../config.js';
import {Link} from 'react-router';

var messagesArr = [];
var node;

export default class MessageView extends React.Component {

    constructor(props) {
        super(props);
        //gets logged in user
        //sets messages to initial vals
        this.state = {
            user: auth.getLoggedInUser(),
            messages: [
                {
                    text: 'Hello! If you need help, head over to the features page to see what questions can be answered.',
                    key: 1
                }
            ]
        };
    }

    componentDidMount() {
        document.title = 'Messages';
        //makes get request to the messages endpoint with user's id
        //loops through all of the user's messages and builds messages objects
        //that get put onto messagesArr
        axios.get(`${config.baseDomain}/api/getAllMessages/${this.state.user.id}`).then(response => {
            //checks if there are messages
            //if there are, build objects with them.
            if (response.data.length > 0) {
                messagesArr = response.data.map(function(msg, i) {
                    return {text: msg.message.text, key: i+2, sender: msg.message.sender, data: msg.message.data, type: msg.message.type};
                });
                //sets state with newly created messagesArr
                messagesArr.unshift(this.state.messages[0]);
                this.setState({messages: messagesArr});
            }
        });
    }

    handleMessageSend(text, event) {
        event.preventDefault();
        //gets current messagesArr
        if (text.length > 0) {
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

            //sends request to backend to handle the user's message
            axios.post(config.baseDomain + '/api/handleRequest', {
                textRequest: text,
                userid: this.state.user.id
            }).then(response => {
                messagesArr.push({
                    data: response.data.data,
                    type: response.data.type,
                    text: response.data.text,
                    key: messagesArr[messagesArr.length - 1].key + 1
                });
                this.setState({messages: messagesArr});
            });
        }
    }
    render() {
        return (
            <div>
                <div className='messageView'>
                    <MessageContainer msgArr={this.state.messages}/>
                </div>
                <div className='textRegionContainer'>
                    <TextRegion sendMessage={this.handleMessageSend.bind(this)}/>
                </div>
            </div>
        );
    }
}
