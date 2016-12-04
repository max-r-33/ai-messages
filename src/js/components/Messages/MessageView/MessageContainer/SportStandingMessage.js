import React from 'react';

export default class ConferenceStandingMessage extends React.Component {
    //displays message
    //styles css based on the sender and type of the message
    constructor(props) {
        super(props);
        var standingGrid = [];
        var standingObj = this.props.standings;
        var standingArr = Object.keys(standingObj).map(function (key) { return standingObj[key]; });
        standingArr.forEach(function(team) {
            standingGrid.push(
                <p className='gridRow' key={team.name}>
                    <span className='rankContainer'>
                        <span className='standingRank'>{team.rank}.</span>
                    </span>
                    <span className='teamContainer'>
                        <span className='name'>{team.name}</span>
                    </span>
                    <span className='recordContainer'>
                        <span className='record'>{team.record}</span>
                    </span>
                    <span className='streak'>{team.streak}</span>
                </p>
            )
        });
        this.state = {
            standingGrid: standingGrid,
            conference: standingArr[0].conference
        }
    }
    render() {
        return (
            <div className='message customMessage'>
                <div className={`spacing ${this.props.senderClass}`}>

                    <div className='infoGrid'>
                        <p className='gridHeader conferenceGridHeader'>{this.state.conference}ern Conference Standings</p>
                        {this.state.standingGrid}
                    </div>
                </div>
            </div>
        )
    }
}
