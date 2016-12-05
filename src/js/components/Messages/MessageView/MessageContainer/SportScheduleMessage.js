import React from 'react';

export default class ScheduleMessage extends React.Component {
    //displays message
    //styles css based on the sender of the message
    constructor(props) {
        super(props);
        var scheduleGrid = [];
        var scheduleObj = this.props.schedule;
        var scheduleArr = Object.keys(scheduleObj).map(function(key) {
            return scheduleObj[key];
        });
        scheduleArr.forEach(function(game) {
            if (game.event_status !== 'scheduled') {
                scheduleGrid.push(
                    <div className='gameContainer' key={game.homeTeam}>
                        <div className='teamContainer'>
                            <a className='team' href={`http://www.nba.com/games/${game.date}/${game.homeTeamAbbr}${game.awayTeamAbbr}/`} target='blank'>
                                {game.awayTeam}
                            </a>
                            <p>{game.awayTeamPts}</p>
                        </div>
                        <div className='teamContainer'>
                            <a className='team' href={`http://www.nba.com/games/${game.date}/${game.homeTeamAbbr}${game.awayTeamAbbr}/`} target='blank'>
                                {game.homeTeam}
                            </a>
                            <p>{game.homeTeamPts}</p>
                        </div>
                    </div>
                )
            } else {
                scheduleGrid.push(
                    <div className='gameContainer' key={game.homeTeam}>
                        <div className='teamContainer'>
                            <a className='team' href={`http://www.nba.com/games/${game.date}/${game.homeTeamAbbr}${game.awayTeamAbbr}/`} target='blank'>
                                {game.awayTeam}
                            </a>
                            <p>{game.time}
                                ET</p>
                        </div>
                        <div className='teamContainer'>
                            <a href={`http://www.nba.com/games/${game.date}/${game.homeTeamAbbr}${game.awayTeamAbbr}/`} target='blank'>
                                {game.homeTeam}
                            </a>
                        </div>
                    </div>
                )
            }
        });
        this.state = {
            schedule: scheduleGrid
        }
    }
    render() {
        return (
            <div className='message customMessage'>
                <div className={`spacing ${this.props.senderClass}`}>
                    <p className='messageText'>{this.props.messageText}</p>
                    <div className='infoArea score'>
                        {this.state.schedule}
                    </div>
                </div>
            </div>
        )
    }
}
