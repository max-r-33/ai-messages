import React from 'react';
import browser from 'detect-browser';

export default class TextRegion extends React.Component {
    constructor(props) {
        super(props);
        var dictationButton, searchStyle;

        if(browser.name === 'chrome'){
            dictationButton = <button onClick={e => this.startDictation(e)} className='messageBtn formBtn speechBtn'><i  id='fa' className='fa fa-microphone'></i></button>;
        }else{
            searchStyle = {
                width: "25%"
            }
        }
        this.state = {
            value: '',
            dictationButton,
            searchStyle: searchStyle,
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    startDictation(event) {
        event.preventDefault();
        if (window.hasOwnProperty('webkitSpeechRecognition')) {

            var t = this;
            console.log('start dictation');
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US";
            recognition.start();
            document.getElementById('fa').style.color = '#BC4F6A';

            recognition.onresult = function(e) {
                var recognizedText = e.results[0][0].transcript;
                t.props.sendMessage(recognizedText, e);
                recognition.stop();
                setTimeout(function () {
                    console.log('ok');
                    document.getElementById('fa').style.color = 'rgb(249, 247, 246)';
                }, 3000);
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
                        {this.state.dictationButton}
                </form>
            </div>
        );
    }
}
