import React from 'react';

export default class TextRegion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageValue: ''
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className='textRegionContainer'>
                <div className='textRegion'>
                    <form onChange={event => this.handleChange(event)} autoComplete='off'>
                        <input className='messageInput formInput' id='textField' value={this.state.value} placeholder="Did the Lakers win?" type='text'></input>
                        <button className='messageBtn formBtn' onClick={(event) => {
                            this.props.sendMessage(this.state.value, event);
                            this.setState({value: ''});
                        }}>Send</button>
                    </form>
                </div>
            </div>
        );
    }
}
