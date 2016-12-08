import React from 'react';
import browser from 'detect-browser';

export default class TextRegion extends React.Component {
    constructor(props) {
        super(props);
        let buttonStyle, searchStyle;
        if(browser.name === 'chrome'){
            buttonStyle = {
                display: 'inline'
            }
        }else{
            searchStyle = {
                width: "25%"
            };
            buttonStyle = {
                display: 'none'
            };
        }
        this.state = {
            value: '',
            buttonStyle: buttonStyle,
            searchStyle: searchStyle,
            micStyle: {
                color: 'rgb(249, 247, 246)',
            }
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    startDictation() {

        if (window.hasOwnProperty('webkitSpeechRecognition')) {
            var t = this;

            console.log('start dictation');
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US";
            recognition.start();

            t.setState({micStyle: {
                color:'#BC4F6A'
            }});

            recognition.onresult = function(e) {
                var recognizedText = e.results[0][0].transcript;
                t.props.sendMessage(recognizedText, e);
                t.setState({
                    micStyle: {
                        color:'rgb(249, 247, 246)'
                }});
                recognition.stop();
                console.log(recognizedText);
                console.log('stop dictation');
            }

            recognition.onerror = function(e) {
                recognition.stop();
            }
        }
    }

    render() {
        return (
            <div className='textRegion'>
                <form autoComplete='off'>
                    <input onChange={event => this.handleChange(event)} className='messageInput formInput' id='textField' value={this.state.value} placeholder="Did the Lakers win?" type='text'></input>
                    <button id='send' style={this.state.searchStyle} className='messageBtn formBtn' onClick={(event) => {
                        this.props.sendMessage(this.state.value, event);
                        this.setState({value: ''});
                    }}>Send</button>
                <button style={this.state.buttonStyle} onClick={e => this.startDictation(e)} className='messageBtn formBtn speechBtn'>
                        <i style={this.state.micStyle} className='fa fa-microphone'></i>
                    </button>
                </form>
            </div>
        );
    }
}
