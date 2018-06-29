import React, { Component, Fragment } from 'react';

//components
import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'
import PassportHeader from '~components/PassportHeader/PassportHeader.js'

//scss
import './SocialLogin.scss'

class SocialLogin extends Component {
    constructor(){
        super()
        this.state = {
            user : undefined,
        }
    }

    _getInfo = () => {
        fetch('/auth/kakao/info', {
            method : "GET",
            credentials: 'same-origin'
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            console.log(response)
        })
    }

    componentDidMount(){
        fetch('/auth/kakao/info', {
            method : "GET",
            credentials: 'same-origin'
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            console.log(response.user)
            this.setState({
                ...this.state,
                user : response.user
            })
        })
    }

    render() {
        return (
            <div className="socialLogin">
                <PassportHeader/>
                <main>
                    <section>
                        {this.state.user !== undefined 
                            ?
                            <Fragment>
                                <div>
                                    <div className="socialLogin__profilePhoto-container">
                                        <ProfilePhoto url={this.state.user.profilePhotoUrl}/>
                                    </div>
                                    <span>{this.state.user.name}</span>
                                </div>
                                <div>

                                </div>
                            </Fragment>
                            :
                            <div>데이터 가져오는중</div>
                        }
                    </section>
                </main>
            </div>
        );
    }
}

export default SocialLogin;