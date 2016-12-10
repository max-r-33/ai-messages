import React from 'react';
import {Link} from 'react-router';
import Message from '../Messages/MessageView/MessageContainer/Message';
import SportMessage from '../Messages/MessageView/MessageContainer/SportMessage';
import SportStatisticMessage from '../Messages/MessageView/MessageContainer/SportStatisticMessage';
import SportScheduleMessage from '../Messages/MessageView/MessageContainer/SportScheduleMessage';
import auth from '../../utils/LoginStatus';

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        var userMessages = [
            'Did the Spurs win?',
            'How many points did Kawhi Leonard have?',
            'When do the Cavs play again?',
            "What's okc's record?",
            'Who leads the league in mpg?',
            "Show me the scores of yesterday's games"
        ];
        var autoMessages = [
            {
                text: 'The San Antonio Spurs beat the Minnesota Timberwolves 2 days ago in Minneapolis.',
                data: {
                    opponentPointsScored: 95,
                    pointsScored: 91
                },
                type: 'sport'
            }, {
                text: 'Kawhi Leonard had 31 points against the Timberwolves.'
            }, {
                text: 'The Cavaliers play the Heat in Cleveland tomorrow at 7:30 ET.'
            }, {
                text: 'The Oklahoma City Thunder are 14-8.'
            }, {
                text: 'Anthony Davis leads the league in minutes per game with 38.05',
                data: [
                    {
                        name: 'Anthony Davis',
                        rank: 1,
                        stat: "minutes per game",
                        team: 'New Orleans Pelicans',
                        value: 38.05
                    }, {
                        name: 'Kyle Lowry',
                        rank: 2,
                        stat: "minutes per game",
                        team: 'Toronto Raptors',
                        value: 37.48
                    }, {
                        name: 'Zach LaVine',
                        rank: 3,
                        stat: "minutes per game",
                        team: 'Minnesota Timberwolves',
                        value: 37.25
                    }, {
                        name: 'Harrison Barnes',
                        rank: 4,
                        stat: "minutes per game",
                        team: 'Dallas Mavericks',
                        value: 37.24
                    }, {
                        name: 'James Harden',
                        rank: 5,
                        stat: "minutes per game",
                        team: 'Houston Rockets',
                        value: 36.82
                    }
                ],
                type: 'sportStatistic'
            }, {
                data: [
                    {
                        awayClass: "winner",
                        awayTeam: "Magic",
                        awayTeamAbbr: "ORL",
                        awayTeamPts: 98,
                        date: "20161204",
                        event_status: "completed",
                        homeClass: "loser",
                        homeTeam: "Pistons",
                        homeTeamAbbr: "DET",
                        homeTeamPts: 92,
                        time: "6:00"
                    }, {
                        awayClass: "loser",
                        awayTeam: "Pelicans",
                        awayTeamAbbr: "NO",
                        awayTeamPts: 92,
                        date: "20161204",
                        event_status: "completed",
                        homeClass: "winner",
                        homeTeam: "Thunder",
                        homeTeamAbbr: "OKC",
                        homeTeamPts: 101,
                        time: "7:00"
                    }, {
                        awayClass: "winner",
                        awayTeam: "Pacers",
                        awayTeamAbbr: "IND",
                        awayTeamPts: 111,
                        date: "20161204",
                        event_status: "completed",
                        homeClass: "loser",
                        homeTeam: "Clippers",
                        homeTeamAbbr: "LAC",
                        homeTeamPts: 102,
                        time: "9:30"
                    }
                ],
                text: 'Games on 12/04',
                type: 'daySchedule'
            }
        ];
        userMessages = userMessages.map(function(message, i) {
            return (
                <div data-aos='slide-left' data-aos-once='true' data-aos-duration="600" data-aos-offset='100' data-aos-delay='200' key={i} className='messageSpacer'>
                    <Message senderClass='user' messageText={message}/>
                </div>
            );
        });
        autoMessages = autoMessages.map(function(message, i) {
            if (message.type === 'daySchedule') {
                console.log(message);
                return (
                    <div data-aos='slide-right' data-aos-once='true' data-aos-duration="600" data-aos-offset='200' key={i + 100} className='sportScheduleMessageSpacer'>
                        <SportScheduleMessage messageText={message.text} schedule={message.data} senderClass='bot'/>
                    </div>
                );
            } else if (message.type === 'sportStatistic') {
                return (
                    <div data-aos='slide-right' data-aos-once='true' data-aos-duration="600" data-aos-offset='200' key={i + 100} className='sportStatMessageSpacer'>
                        <SportStatisticMessage stats={message.data} senderClass='bot' messageText={message.text}/>
                    </div>
                );
            } else if (message.type === 'sport') {
                return (
                    <div data-aos='slide-right' data-aos-once='true' data-aos-duration="600" data-aos-offset='200' key={i + 100} className='sportMessageSpacer'>
                        <SportMessage senderClass='bot' scores={message.data} messageText={message.text}/>
                    </div>
                );
            } else {
                return (
                    <div data-aos='slide-right' data-aos-once='true' data-aos-duration="600" data-aos-offset='100' key={i + 100} className='messageSpacer'>
                        <Message senderClass='bot' messageText={message.text}/>
                    </div>
                )
            }
        });
        var button,
            messages = [];
        userMessages.forEach(function(message, i) {
            messages.push(message);
            messages.push(autoMessages[i])
        });

        if (!auth.getLoggedInUser().error) {
            button = <Link className='homeButton' to='signup'>View Your Messages</Link>
        } else {
            button = <Link className='homeButton' to='signup'>Sign Up</Link>
        }

        this.state = {
            messages,
            button
        }
    }
    render() {
        return (
            <div className='infoWindow'>
                <div className='infoBox'>
                    <div className='homeCard fadeIn'>
                        <h1 className='heading'>Hello.</h1>
                        <div className='subHeading'>
                            <p>Finding basketball statistics has never been this easy.</p>
                            <div data-aos='fade-up' data-aos-once='true' data-aos-offset='-500' data-aos-delay='1050' className='formBtn formBtnLight'>
                                {this.state.button}
                            </div>
                        </div>
                        <div className='arrow'>↓</div>
                    </div>
                </div>
                <div className='infoBox'>
                    <div className='examples'>
                        <h1 id='headingAnchor' className='heading'>Here are a few topics you can ask about</h1>
                        <div className='featuresLink'>
                            <Link to='features'>Check out the rest here</Link>
                        </div>
                        <div className='messageArea'>
                            {this.state.messages}
                        </div>
                    </div>
                </div>
                <div className='infoBox'>
                    <div className='homeCard'>
                        <div className='footerCard'>
                            <h1 className='bottomHeading anchor'>Interested?</h1 >
                            <div className='formBtn formBtnLight' data-aos-offset='300' data-aos-anchor='.anchor' data-aos-anchor-placement='bottom-bottom' data-aos='fade-up' data-aos-once='true'>
                                {this.state.button}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
