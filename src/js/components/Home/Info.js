import React from 'react';
import {Link} from 'react-router';
import Message from '../Messages/MessageView/MessageContainer/Message';
import SportStatisticMessage from '../Messages/MessageView/MessageContainer/SportStatisticMessage';
import WeatherMessage from '../Messages/MessageView/MessageContainer/WeatherMessage';
import StockMessage from '../Messages/MessageView/MessageContainer/StockMessage';

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        var userMessages = [
            'Did the Spurs win?',
            'How many points did Kawhi Leonard have?',
            'When do the Cavs play again?',
            "What's the Dubs record?",
            'Who leads the league in mpg?',
            "What's the weather tomorrow in LA?",
            "What's the price of apple stock?"
        ];
        var autoMessages = [
            {
                text: 'The San Antonio Spurs beat the Minnesota Timberwolves 2 days ago in Minneapolis. 105-91',
                type: 'sport'
            }, {
                text: 'Kawhi Leonard had 31 points against the Timberwolves.'
            }, {
                text: 'The Cavaliers play the Heat in Cleveland tomorrow at 7:30 ET.'
            }, {
                text: 'The Golden State Warriors are 19-3.'
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
                        name: '"Kyle Lowry"',
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
                data: {
                    city: "Los Angeles",
                    conditions: "Clear",
                    country: "",
                    description: "Tomorrow",
                    temperature: "74:39"
                },
                type: 'weatherForecast'
            }, {
                data: {
                    change: "+1.14",
                    companyName: "Apple Inc",
                    exchange: "NASDAQ",
                    lastUpdated: "1:22PM EST",
                    percentChange: "1.03",
                    price: "112.17",
                    symbol: "AAPL"
                },
                type:'stock'
            }
        ];
        userMessages = userMessages.map(function(message, i ) {
            return (
                <div data-aos='slide-left' aos-anchor-placement='bottom-center' data-aos-duration="600" key={i} className='messageSpacer'>
                    <Message senderClass='user' messageText={message}/>
                </div>
            );
        });
        autoMessages = autoMessages.map(function(message, i){
            if(message.type === 'sportStatistic'){
                return (
                    <div data-aos='slide-right' aos-anchor-placement='bottom-center' data-aos-duration="600"  key={i+100} className='sportStatMessageSpacer'>
                        <SportStatisticMessage stats={message.data} senderClass='bot' messageText={message.text}/>
                    </div>
                );
            }else if(message.type === 'weatherForecast'){
                return (
                    <div data-aos='slide-right' aos-anchor-placement='bottom-center' data-aos-duration="600"  key={i+100} className='weatherForecastMessageSpacer'>
                        <WeatherMessage weather={message.data} senderClass='bot' messageText={message.text}/>
                    </div>
                );
            }else if(message.type === 'stock'){
                return (
                    <div data-aos='slide-right' aos-anchor-placement='bottom-center' data-aos-duration="600" key={i+100} className='stockMessageSpacer'>
                        <StockMessage stockInfo={message.data} senderClass='bot' messageText={message.text}/>
                    </div>
                );
            }else{
                return (
                    <div data-aos='slide-right' aos-anchor-placement='bottom-center' data-aos-duration="600"  key={i+100} className='messageSpacer'>
                        <Message senderClass='bot' messageText = {message.text} />
                    </div>
                )
            }
        });
        var messages = [];
         userMessages.forEach(function(message, i){
            messages.push(message);
            messages.push(autoMessages[i])
        });

        this.state = {messages}
    }
    render() {
        return (
            <div className='infoWindow'>
                <div className='infoBox'>
                    <div className='homeCard fadeIn'>
                        <h1 className='heading'>Hello.</h1>
                        <div className='subHeading'>
                            <p>Finding basketball statistics has never been this easy.</p>
                            <div data-aos='fade-up' data-aos-delay='1050' className='formBtn formBtnLight'>
                                <Link to='signup'>Sign Up</Link>
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
                            <div className='formBtn formBtnLight' data-aos-offset='270' data-aos-anchor='.anchor' data-aos-anchor-placement='bottom-bottom' data-aos='fade-up' data-aos-once='true'>
                                <Link to='signup'>Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
