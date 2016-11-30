import React from 'react';

export default class Message extends React.Component {
    //displays message
    //styles css based on the sender of the message
    render() {
        return (
            <div className='message'>
                <div className={`spacing ${this.props.senderClass}`}>
                    <p>{this.props.messageText}</p>
                </div>
            </div>
        )
    }
}
