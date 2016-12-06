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
            <div className='textRegion'>
                <form autoComplete='off'>
                    <input onChange={event => this.handleChange(event)}
                           className='messageInput formInput'
                           id='textField' value={this.state.value}
                           placeholder="Did the Lakers win?"
                           type='text'>
                    </input>
                    <button id='send' className='messageBtn formBtn' onClick={(event) => {
                        this.props.sendMessage(this.state.value, event);
                        this.setState({value: ''});
                    }}>Send</button>
                </form>
            </div>
        );
    }
}
