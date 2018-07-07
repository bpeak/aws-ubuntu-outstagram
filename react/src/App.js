import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'

import Home from '~routes/Home.js'
import PostWrite from '~routes/PostWrite/PostWrite.js'
import Compass from '~routes/Compass/Compass.js'
import CompassHashtags from '~routes/CompassHashtags/CompassHashtags.js'
import Profile from '~routes/Profile/Profile.js'
import RePassport from '~routes/RePassport.js'
import SocialLogin from '~routes/SocialLogin/SocialLogin.js'
import ProfileEdit from '~routes/ProfileEdit/ProfileEdit.js'
import DevInfo from '~routes/DevInfo/DevInfo.js'
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
                        <Route exact path="/profile/:nick" component={Profile}/>
                        <Route exact path="/SocialLogin/:way" component={SocialLogin}/>
                        <Route exact path="/ProfileEdit" component={ProfileEdit}/>
                        <Route exact path="/DevInfo" component={DevInfo}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default App