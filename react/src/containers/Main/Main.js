import React, { Component, Fragment } from 'react';

import Header from '../../components/Header/Header.js'
import Posts from '../../components/Post/Posts.js'
import ProfileAddingPhoto from '../../components/ProfileAddingPhoto/ProfileAddingPhoto.js'
import ProfileAside from '../../components/ProfileAside/ProfileAside.js'

import store from '~redux/reducers/store.js'

import './Main.scss'

class Main extends Component{
    constructor(){
        super()
        this.state = {
            isExistProfilePhoto : store.getState().user.profilePhotoUrl
        }
    }
    
    render(){
        return (
            <Fragment>
                <section className="main_header">
                    <Header/>
                </section>
                <section className="main_center">
                    <div>
                        { this.state.isExistProfilePhoto === undefined && <ProfileAddingPhoto/> }
                        <Posts/>
                    </div>
                    <div id="test">
                        <ProfileAside/>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default Main