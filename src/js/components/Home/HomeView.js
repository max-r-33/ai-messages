import React from 'react';
import Info from './Info';


export default class HomeView extends React.Component {


    render() {
        return (
            <div className='homeView'>
                <h1>Home</h1>
                <Info/>
            </div>
        )
    }
}
