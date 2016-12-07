import React from 'react';
import {Link} from 'react-router';
import Message from '../Messages/MessageView/MessageContainer/Message.js';

export default class Info extends React.Component {
    scroll() {
        document.querySelector('.examples').scrollIntoView({behavior: 'smooth'});
    }
    render() {
        return (
            <div>
                <div className='infoBox'>
                    <div className='homeCard'>
                        <h1 className='heading'>Hello.</h1>
                        <div className='subHeading'>
                            <p>Finding basketball statistics has never been this easy.</p>
                            <div className='formBtn formBtnLight'>
                                <Link to='signup'>Sign Up</Link>
                            </div>
                        </div>
                        <div onClick={this.scroll} className='arrow'>↓</div>
                    </div>
                </div>
                <div className='infoBox'>
                    <div className='examples'>
                        <h1>Here are a few topics you can ask about</h1>
                        <div className='examplesContainerGrid'>
                            <div className='examplesContainerColumn'>
                                <div data-aos="fade-zoom-in" data-aos-offset='0' data-aos-once='true' className='exampleContainer'>
                                    <h3 className='exampleContainerHeader'>
                                        Teams
                                    </h3>
                                    <p className='exampleText'>
                                        Did the lakers win?
                                    </p>
                                    <p className='exampleText'>
                                        When do the cavs play again?
                                    </p>
                                    <p className='exampleText'>
                                        Whats the dubs record?
                                    </p>
                                </div>
                                <div data-aos="fade-zoom-in" data-aos-offset='150' data-aos-once='true' className='exampleContainer'>
                                    <h3 className='exampleContainerHeader'>
                                        Statistics
                                    </h3>
                                    <p className='exampleText'>
                                        How many points did Jordan Clarkson have?
                                    </p>
                                    <p className='exampleText'>
                                        Who leads the league in mpg?
                                    </p>
                                    <p className='exampleText'>
                                        Who is leading the league in assists to turnover ratio?
                                    </p>
                                </div>
                            </div>
                            <div className='examplesContainerColumn'>
                                <div data-aos="fade-zoom-in" data-aos-offset='100' data-aos-once='true' className='exampleContainer'>
                                    <h3 className='exampleContainerHeader'>
                                        League
                                    </h3>
                                    <p className='exampleText'>
                                        Show me standings for the eastern conference?
                                    </p>
                                    <p className='exampleText'>
                                        What games are on tomorrow?
                                    </p>
                                    <p className='exampleText'>
                                        Whos playing tonight?
                                    </p>
                                </div>
                                <div data-aos="fade-zoom-in" data-aos-offset='200' data-aos-once='true' className='exampleContainer'>
                                    <h3 className='exampleContainerHeader'>
                                        Miscallaneous
                                    </h3>
                                    <p className='exampleText'>
                                        Whats the weather in LA?
                                    </p>
                                    <p className='exampleText'>
                                        Whats the price of apple stock?
                                    </p>
                                    <p className='exampleText'>
                                        Hows the weather going to be tomorrow in Sydney?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='infoBox'>
                    <div className='homeCard'>
                        <h1>Interested?</h1>
                        <div className='formBtn formBtnLight'>
                            <Link to='signup'>Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
