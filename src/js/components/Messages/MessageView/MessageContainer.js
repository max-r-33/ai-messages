import React from 'react';
import Message from './MessageContainer/Message';
import SportMessage from './MessageContainer/SportMessage';
import SportStatisticMessage from './MessageContainer/SportStatisticMessage';
import SportStandingMessage from './MessageContainer/SportStandingMessage';
import SportScheduleMessage from './MessageContainer/SportScheduleMessage';
import WeatherMessage from './MessageContainer/WeatherMessage';
import StockMessage from './MessageContainer/StockMessage';

export default class MessageContainer extends React.Component {

    componentDidUpdate() {
        var node = document.getElementById('msgCont');
        node.scrollTop = node.scrollHeight;
    }

    render() {
        var msgs = this.props.msgArr;

        var messagesToDisplay = msgs.map(function(message) {
            if (message.sender === 'user') {
                return (
                    <div key={message.key} className='messageSpacer'>
                        <Message senderClass='user' messageText={message.text}/>
                    </div>
                );
            } else {
                if (message.type === 'sport') {
                    return (
                        <div key={message.key} className='sportMessageSpacer'>
                            <SportMessage senderClass='bot' scores={message.data} messageText={message.text}/>
                        </div>
                    );
                } else if (message.type === 'weather') {
                    return (
                        <div key={message.key} className='weatherMessageSpacer'>
                            <WeatherMessage weather={message.data} senderClass='bot' messageText={message.text}/>
                        </div>
                    );
                } else if (message.type === 'weatherForecast') {
                    return (
                        <div key={message.key} className='weatherForecastMessageSpacer'>
                            <WeatherMessage weather={message.data} senderClass='bot' messageText={message.text}/>
                        </div>
                    );
                } else if (message.type === 'stock') {
                    console.log(message.data)
                    return (
                        <div key={message.key} className='stockMessageSpacer'>
                            <StockMessage stockInfo={message.data} senderClass='bot' messageText={message.text}/>
                        </div>
                    );
                } else if (message.type === 'sportStatistic') {
                    return (
                        <div key={message.key} className='sportStatMessageSpacer'>
                            <SportStatisticMessage stats={message.data} senderClass='bot' messageText={message.text}/>
                        </div>
                    );
                } else if (message.type === 'sportStandings') {
                    return (
                        <div key={message.key} className='sportStandingMessageSpacer'>
                            <SportStandingMessage standings={message.data} senderClass='bot'/>
                        </div>
                    );
                } else if (message.type === 'daySchedule' && message.data[0].event_status === 'completed') {
                    return (
                        <div key={message.key} className='sportScheduleMessageSpacerCompleted'>
                            <SportScheduleMessage messageText={message.text} schedule={message.data} senderClass='bot'/>
                        </div>
                    );
                }else if (message.type === 'daySchedule' && message.data[0].event_status === 'scheduled') {
                    return (
                        <div key={message.key} className='sportScheduleMessageSpacer'>
                            <SportScheduleMessage messageText={message.text} schedule={message.data} senderClass='bot'/>
                        </div>
                    );
                } else {
                    return (
                        <div key={message.key} className='messageSpacer'>
                            <Message senderClass='bot' messageText={message.text}/>
                        </div>
                    );
                }
            }
        });

        return (
            <div id='msgCont' className='hiddenscrollbars message-container'>
                {messagesToDisplay}
            </div>
        );
    }
}
