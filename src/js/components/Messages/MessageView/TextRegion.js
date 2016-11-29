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
            <div>
                <div className='textRegion'>
                    <form onChange={event => this.handleChange(event)} autoComplete='off'>
                        <input id='textField' value={this.state.value} placeholder="Did the Lakers win?" type='text'></input>
                        <button className='btn btn-3' onClick={(event) => {
                            this.props.sendMessage(this.state.value, event);
                            this.setState({value: ''});
                        }}>Send</button>
                    </form>
                </div>
            </div>
        );
    }
}
