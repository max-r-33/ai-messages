import React from 'react';

export default class SportStatisticMessage extends React.Component {
    //displays message
    //styles css based on the sender and type of the message
    constructor(props) {
        super(props);
        var playersGrid = [];
        var playersObj = this.props.stats;
        var statArr = Object.keys(playersObj).map(function (key) { return playersObj[key]; });
        statArr.forEach(function(player) {
            playersGrid.push(
                <p className='gridRow' key={player.name}>
                    <span className='rank'>{player.rank}.</span>
                    <span className='name'>{player.name}</span>
                    <span className='value'>{player.value}</span>
                </p>
            )
        });
        this.state = {
            statGrid: playersGrid,
            statistic: statArr[0].stat
        }
    }
    render() {
        return (
            <div className='message customMessage'>
                <div className={`spacing ${this.props.senderClass}`}>
                    <p className='statMessage'>{this.props.messageText}</p>
                    <div className='infoGrid'>
                        <p className='gridHeader'>{this.state.statistic}</p>
                        {this.state.statGrid}
                    </div>
                </div>
            </div>
        )
    }
}
