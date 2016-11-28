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
            <div className='container'>
                <div className='textRegion'>
                    <form onChange={event => this.handleChange(event)} autocomplete='off'>
                        <input id='textField' value={this.state.value} placeholder="Message" type='text'></input>
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
