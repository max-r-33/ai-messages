import React from 'react';

export default class FeaturesView extends React.Component {
    constructor(props) {
        super(props);
        let statisticLeaders = [
            {text: 'points per game', abbr: '(PPG)'},
            {text:'assists per game', abbr: '(APG)'},
            {text:'rebounds per game', abbr:'(RPG)'},
            {text:'blocks per game', abbr: '(BPG)'},
            {text:'steals per game', abbr:'(SPG)'},
            {text:'field goal percentage', abbr:'(FGP)'},
            {text:'field goals made', abbr:'(FGM)'},
            {text:'free throws made', abbr:'(FTM)'},
            {text:'minutes per game', abbr:'(MPG)'},
            {text:'games played'},
            {text:'double doubles'},
            {text:'triple doubles'},
            {text:'freethow percentage'},
            {text:'three point percentage'},
            {text:'threes made'},
            {text:'assists to turnover ratio'},
            {text:'steals to turnover ratio'}
        ];
        statisticLeaders = statisticLeaders.map(function(stat, i) {
            return <li key={i} className='subList'>{stat.text} <span className='abbreviation'>{stat.abbr}</span></li>
        });
        this.state = {
            stats : statisticLeaders
        };
    }
    render() {
        return (
            <div className='featuresView'>
                <h1>Features</h1>
                <p>A complete list of questions the assistant can answer</p>
                <div className='featuresContainer'>
                    <div className='basketball'>
                        <h2>Basketball</h2>
                        <ul>
                            <h3>Teams</h3>
                            <li>Did the lakers win their last game (Context)</li>
                            <li>When do the lakers play again (Context)</li>
                            <li>What’s the lakers record (Context)</li>
                            <li>How many points did Russell Westbrook have in his last game</li>
                            <li className='statPositioner'>assists</li>
                            <li className='statPositioner'>rebounds</li>
                            <li className='statPositioner'>minutes</li>
                            <li className='statPositioner'>steals</li>
                            <li className='statPositioner'>turnovers</li>
                            <li className='statPositioner'>blocks</li>
                        </ul>
                        <ul>
                            <h3>Statistic Leaders</h3>
                            <li>Who leads the league in</li>
                            <div className='statsGrid'>
                                {this.state.stats}
                            </div>
                        </ul>
                        <ul>
                            <h3>Schedule</h3>
                            <li>What games are on today</li>
                            <li>What games are on (any date)</li>
                            <li>Show me today’s NBA schedule</li>
                        </ul>
                        <ul>
                            <h3>Rankings</h3>
                            <li>Show me eastern conference rankings</li>
                            <li>What are the rankings in the western conference</li>
                            <li>Western conference rankings</li>
                        </ul>
                    </div>
                    <div className='other'>
                        <h2>Other</h2>
                        <ul>
                            <h3>Weather</h3>
                            <li>Whats the weather in Salt Lake City</li>
                            <li>Whats the forecast for tomorrow in Sydney</li>
                        </ul>
                        <ul>
                            <h3>Stocks</h3>
                            <li>Whats the price of apple stock</li>
                            <li>Whats micron stock at right now</li>
                        </ul>

                    </div>
                </div>
            </div>
        )
    }
}
