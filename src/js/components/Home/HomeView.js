import React from 'react';
import Info from './Info';


export default class HomeView extends React.Component {
    componentDidMount(){
        document.title = 'Site Name';
    }

    render() {
        return (
            <div className='homeView'>
                <Info/>
            </div>
        )
    }
}
