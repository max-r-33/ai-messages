import React from 'react';
import Message from './MessageContainer/Message'

export default class MessageContainer extends React.Component{

    render(){
        var msgs = this.props.msgArr;
        var messagesToDisplay = msgs.map(function(message){
            return (
                <Message key={message.key} messageText={message.text} />
            );
        });
        return (
            <div>
                <h1>Message Container</h1>
                {messagesToDisplay}
            </div>
        );
    }
}
