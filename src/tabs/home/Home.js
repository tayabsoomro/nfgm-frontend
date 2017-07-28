import React from 'react';
import HomeCarousel from "./HomeCarousel";
import HomeLocation from './HomeLocation';
import Comments from './Comments';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="home">
                <HomeCarousel/>
                <div className="col-lg-12 run"></div>
                <HomeLocation/>
                <Comments/>
            </div>
        )
    }
};

export default Home;
