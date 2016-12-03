import React from 'react';

export default class WeatherMessage extends React.Component {
    //displays message
    //styles css based on the sender of the message
    constructor(props){
        super(props);
        var tempData;
        for(var key in this.props.weather){
            if(key === 'temperature'){
                tempData = this.props.weather[key];
            }
        }
        tempData = (tempData+"").split(':');
        this.state = {
            high: tempData[0],
            low: tempData[1]
        }
    }
    render() {
        if(this.state.low){
            return (
                <div className='message customMessage'>
                    <div className={`spacing ${this.props.senderClass}`}>
                        <div className='infoArea'>
                            <h1 className='cityName'>{this.props.weather.city}{this.props.weather.country}</h1>
                            <p className='description'>{this.props.weather.description}</p>
                            <div className='tempArea'>
                                <div className='labels'>
                                    <p>High</p>
                                    <h1 className='temperature'>{this.state.high}°</h1>
                                </div>
                                <div className='labels'>
                                    <p>Low</p>
                                    <h1 className='temperature'>{this.state.low}°</h1>
                                </div>
                            </div>
                            <h1 className='conditions'>{this.props.weather.conditions}</h1>
                        </div>
                    </div>
                </div>
            );
        }else{
            return (
                <div className='message customMessage'>
                    <div className={`spacing ${this.props.senderClass}`}>
                        <div className='infoArea'>
                            <h1 className='cityName'>{this.props.weather.city}{this.props.weather.country}</h1>
                            <p className='description'>{this.props.weather.description}</p>
                            <h1 className='temperature'>{this.props.weather.temperature}°</h1>
                            <h1 className='conditions'>{this.props.weather.conditions}</h1>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
