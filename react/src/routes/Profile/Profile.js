import React, { Component, Fragment } from 'react';

//components
import ProfileMy from './ProfileMy/ProfileMY.js'
import ProfileOther from './ProfileOther/ProfileOther.js'
import LoadingSpinner from '~components/LoadingSpinner/LoadingSpinner.js'

//store
import store from '~redux/reducers/store.js'

//components
import Header from '~components/Header/Header.js'

//scss
import './Profile.scss'

import Footer from '~components/Footer/Footer.js'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            user : null
        }
    }

    componentWillReceiveProps(){
        this.componentDidMount()
    }

    componentDidMount(){
        console.log('디마')
        const nick = this.props.match.params.nick
        console.log(nick)
        fetch(`/api/users/${nick}`, {
            method : "GET",
            credentials: "same-origin"
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            console.log(response)
            this.setState({
                ...this.state,
                user : response.user
            })
        })
    }
    render(){
        const nick = this.props.match.params.nick
        return (
            <div className="profile">
                <Header/>
                <main className="__main">
                    {this.state.user !== null
                        ? <Fragment>
                            {nick === store.getState().user.nick
                                ? <ProfileMy user={this.state.user}/>
                                : <ProfileOther user={this.state.user}/>
                            }
                        </Fragment>
                        : <LoadingSpinner/>
                    }
                </main>
                <Footer/>
            </div>
        )
    }
}

export default Profile