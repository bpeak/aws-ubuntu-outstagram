import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'

import Home from '~routes/Home.js'
import PostWrite from '~routes/PostWrite/PostWrite.js'
import Compass from '~routes/Compass/Compass.js'
import CompassHashtags from '~routes/CompassHashtags/CompassHashtags.js'
import Profile from '~routes/Profile.js'
import RePassport from '~routes/RePassport.js'
import NoMatch from '~routes/NoMatch.js'


class App extends Component{

    render(){
        return (
            <Router>
                <Fragment>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/PostWrite" component={PostWrite}/>
                        <Route exact path="/Compass" component={Compass}/>
                        <Route exact path="/Compass/hashtags/:hashtag" component={CompassHashtags}/>
                        <Route exact path="/RePassport" component={RePassport}/>
                        <Route exact path="/:user_nick" component={Profile}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default App