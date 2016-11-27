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
                <form onChange={event => this.handleChange(event)}>
                    <input id='textField' value={this.state.value} placeholder="Message" type='text'></input>
                    <button onClick={(event) => {
                        this.props.sendMessage(this.state.value, event);
                        this.setState({value: ''});
                    }}>Send</button>
                </form>
            </div>
        );
    }
}
