import React from 'react';
import { Link } from 'react-router';

export default class Info extends React.Component {
    render() {
        return (
            <div className='info'>
                <div className='infoArea'>
                    <h1 className='heading'>Hello.</h1>
                    <div className='subHeading'>
                        <p>Finding basketball statistics has never been this easy.</p>
                        <div className='formBtn formBtnLight'><Link to='signup'>Sign Up</Link></div>
                    </div>
                </div>
                <div className='arrow'>↓</div>
            </div>
        );
    }
}
