import React from 'react';
import Message from './MessageContainer/Message';
import SportMessage from './MessageContainer/SportMessage';
import WeatherMessage from './MessageContainer/WeatherMessage';
import StockMessage from './MessageContainer/StockMessage';

export default class MessageContainer extends React.Component{

    componentDidUpdate(){
        var node = document.getElementById('msgCont');
        node.scrollTop = node.scrollHeight;
    }

    render(){
        var msgs = this.props.msgArr;

        var messagesToDisplay = msgs.map(function(message){
            if(message.sender === 'user'){
                return (
                    <div key={message.key} className='messageSpacer'>
                        <Message senderClass='user'  messageText={message.text} />
                    </div>
                );
            }else{
                if(message.type === 'sport'){
                    return (
                        <div key={message.key} className='sportMessageSpacer'>
                            <SportMessage senderClass='bot' scores={message.data} messageText={message.text} />
                        </div>
                    );
                }else if(message.type === 'weather'){
                    return (
                        <div key={message.key} className='weatherMessageSpacer'>
                            <WeatherMessage weather={message.data} senderClass='bot' messageText={message.text} />
                        </div>
                    );
                }else if(message.type === 'weatherForecast'){
                    return (
                        <div key={message.key} className='weatherForecastMessageSpacer'>
                            <WeatherMessage weather={message.data} senderClass='bot' messageText={message.text} />
                        </div>
                    );
                }else if(message.type === 'stock'){
                    console.log(message.data)
                    return (
                        <div key={message.key} className='stockMessageSpacer'>
                            <StockMessage stockInfo={message.data} senderClass='bot' messageText={message.text} />
                        </div>
                    );
                }else{
                    return (
                        <div key={message.key} className='messageSpacer'>
                            <Message senderClass='bot' messageText={message.text} />
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
