import React from 'react';
import {Link} from 'react-router';

export default class Info extends React.Component {
    render() {
        return (
            <div>
                <div className='infoBox'>
                    <div className='homeCard fadeIn'>
                        <h1 className='heading'>Hello.</h1>
                        <div className='subHeading'>
                            <p>Finding basketball statistics has never been this easy.</p>
                            <div data-aos='fade-up' data-aos-delay='1050' className='formBtn formBtnLight'>
                                <Link to='signup'>Sign Up</Link>
                            </div>
                        </div>
                        <div className='arrow'>↓</div>
                    </div>
                </div>
                <div className='infoBox'>
                    <div className='examples'>
                        <h1 id='headingAnchor' className='heading'>Here are a few topics you can ask about</h1>
                        <div className='featuresLink'><Link to='features'>Check out the rest here</Link></div>
                        <div className='examplesContainerGrid'>
                            <div className='examplesContainerColumn'>
                                <div data-aos="fade-zoom-in" data-aos-offset='0' data-aos-once='true' className='exampleContainer'>
                                    <h3 className='exampleContainerHeader'>
                                        Teams
                                    </h3>
                                    <p className='exampleText'>
                                        Did the Lakers win?
                                    </p>
                                    <p className='exampleText'>
                                        When do the Cavs play again?
                                    </p>
                                    <p className='exampleText'>
                                        What's the Dubs record?
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
                                        Who is leading the league in steals?
                                    </p>
                                </div>
                            </div>
                            <div className='examplesContainerColumn'>
                                <div data-aos="fade-zoom-in" data-aos-offset='100' data-aos-once='true' className='exampleContainer'>
                                    <h3 className='exampleContainerHeader'>
                                        League
                                    </h3>
                                    <p className='exampleText'>
                                        Show me standings for the eastern conference
                                    </p>
                                    <p className='exampleText'>
                                        What games are on tomorrow?
                                    </p>
                                    <p className='exampleText'>
                                        Who's playing tonight?
                                    </p>
                                </div>
                                <div data-aos="fade-zoom-in" data-aos-offset='200' data-aos-once='true' className='exampleContainer'>
                                    <h3 className='exampleContainerHeader'>
                                        Miscallaneous
                                    </h3>
                                    <p className='exampleText'>
                                        What's the weather in LA?
                                    </p>
                                    <p className='exampleText'>
                                        What's the price of apple stock?
                                    </p>
                                    <p className='exampleText'>
                                        What's the weather tomorrow in Sydney?
                                    </p>
                                </div>
                            </div>
                        </div><br />

                    </div>
                </div>
                <div className='infoBox'>
                    <div className='homeCard'>
                        <div className='footerCard'>
                            <h1 className='bottomHeading anchor'>Interested?</h1>
                            <div className='formBtn formBtnLight' data-aos-offset='270' data-aos-anchor='.anchor' data-aos-anchor-placement='bottom-bottom' data-aos='fade-up' data-aos-once='true'>
                                <Link to='signup'>Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
