import React from 'react';

export default class ScheduleMessage extends React.Component {
    //displays message
    //styles css based on the sender of the message

    constructor(props) {
        super(props);

        var scheduleGrid = [],
            showMore,
            hiddenGames = [],
            gamesToDisplay = [],
            scheduleArr = [],
            t = this,
            scheduleObj = this.props.schedule,
            scheduleArr = Object.keys(scheduleObj).map(function(key) {
                return scheduleObj[key];
            });

        if (scheduleArr.length > 5) {
            if (scheduleArr.length - 6 === 1) {
                showMore = <a className='info showMore' onClick={() => t.showMissingGames()}>Show {scheduleArr.length - 6} More Game</a>
            } else {
                showMore = <a className='info showMore' onClick={() => t.showMissingGames()}>Show {scheduleArr.length - 6} More Games</a>
            }
        }

        scheduleArr.forEach(function(game, i) {
            if (game.event_status !== 'scheduled') {
                scheduleGrid.push(
                    <div className='gameContainer' key={game.homeTeam}>
                        <a className='info final' href={`http://www.nba.com/games/${game.date}/${game.awayTeamAbbr}${game.homeTeamAbbr}/`} target='blank'>
                            final
                        </a>
                        <div className='teamContainer'>
                            <span className={`${game.awayClass}`}>{game.awayTeam}</span>
                            <p className={`${game.awayClass}`}>{game.awayTeamPts}</p>
                        </div>
                        <div className='teamContainer'>
                            <span className={`${game.homeClass}`}>{game.homeTeam}</span>
                            <p className={`${game.homeClass}`}>{game.homeTeamPts}</p>
                        </div>
                    </div>
                )
            } else {
                scheduleGrid.push(
                    <div className='gameContainer' key={game.homeTeam}>
                        <div className='teamContainer'>
                            {game.awayTeam}
                            <p>{game.time}
                                ET</p>
                        </div>
                        <div className='teamContainer'>
                            {game.homeTeam}
                            <a className='info' href={`http://www.nba.com/games/${game.date}/${game.awayTeamAbbr}${game.homeTeamAbbr}/`} target='blank'>
                                info
                            </a>
                        </div>
                    </div>
                )
            }
        });

        gamesToDisplay = scheduleGrid.slice(0, 4);
        hiddenGames = scheduleGrid.slice(5, scheduleArr.length - 1);
        this.state = {
            hiddenGames,
            schedule: gamesToDisplay,
            showMore,
            style: {}
        }
    }

    showMissingGames() {
        var displayedGames = this.state.schedule;
        this.state.hiddenGames.forEach(function(game) {
            displayedGames.push(game);
        });
        this.setState({
            schedule: displayedGames,
            style: {
                marginBottom: 20
            },
            showMore: <div></div>
        });
    }

    render() {
        return (
            <div className='message customMessage'>
                <div className={`spacing ${this.props.senderClass}`}>
                    <p className='messageText'>
                        {this.props.messageText}
                    </p>
                    <div className='infoArea score'>
                        {this.state.schedule}
                    </div>
                    <div id='hideShow' className='showMoreContainer'>{this.state.showMore}</div>
                </div>
            </div>
        )
    }
}
