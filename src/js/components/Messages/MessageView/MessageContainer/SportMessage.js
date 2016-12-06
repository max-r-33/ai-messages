import React from 'react';

export default class SportMessage extends React.Component {
    //displays message
    //styles css based on the sender of the message
    constructor(props){
        super(props);
        var scoreArr = [];
        for(var key in this.props.scores){
            scoreArr.push(this.props.scores[key]);
        }
        this.state = {
            scores : scoreArr
        }
    }
    render() {
        return (
            <div className='message customMessage'>
                <div className={`spacing ${this.props.senderClass}`}>
                    <p>{this.props.messageText}</p><br />
                    <div className='infoArea score'>
                        <h2>{this.state.scores[0]} - {this.state.scores[1]}</h2>
                    </div>
                </div>
            </div>
        )
    }
}
