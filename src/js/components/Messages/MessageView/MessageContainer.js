import React from 'react';
import Message from './MessageContainer/Message'

export default class MessageContainer extends React.Component{

    render(){
        var msgs = this.props.msgArr;
        var messagesToDisplay = msgs.map(function(message){
            if(message.sender === 'user'){
                return (
                    <Message senderClass='user' key={message.key} messageText={message.text} />
                );
            }else{
                return (
                    <Message senderClass='bot' key={message.key} messageText={message.text} />
                );
            }
        });
        return (
            <div className='container message-container'>
                {messagesToDisplay}
            </div>
        );
    }
}
