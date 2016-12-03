import React from 'react';

export default class StockMessage extends React.Component {
    //displays message
    //styles css based on the sender of the message
    constructor(props){
        super(props);
        if(parseFloat(this.props.stockInfo.percentChange) < 0){
            this.state = { changeColor : 'red' };
        }else{
            this.state = { changeColor : 'green' };
        }
    }
    render() {
        return (
            <div className='message customMessage'>
                <div className={`spacing ${this.props.senderClass}`}>
                    <div className='infoArea'>
                        <h1 className='symbol'>{this.props.stockInfo.symbol}</h1>
                        <h4 className='company'>{this.props.stockInfo.companyName}</h4>
                        <div className='stockRow'>
                            <div className='price'>${this.props.stockInfo.price}</div>
                            <div className={`${this.state.changeColor} hideOnMobile`}>
                                <div>{this.props.stockInfo.percentChange}%</div>
                                <div>{this.props.stockInfo.change}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
