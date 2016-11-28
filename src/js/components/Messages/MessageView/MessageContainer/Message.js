import React from 'react';


export default class Message extends React.Component{
    render(){
        return (
            <div className='message row'>
                <div className={`five columns ${this.props.senderClass}`}>
                    <p>{this.props.messageText}</p>
                </div>
            </div>
        )
    }
}
