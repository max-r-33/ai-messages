import React from 'react';
import Info from './Info';


export default class HomeView extends React.Component {


    render() {
        return (
            <div className='homeView'>
                <h1>Home</h1>
                <a href='http://localhost:9000/auth/facebook'>Signup</a>
                <Info/>
            </div>
        )
    }
}
