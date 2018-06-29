import React, { Component, Fragment } from 'react';

//components
import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'
import PassportHeader from '~components/PassportHeader/PassportHeader.js'

//imgs
import logoImg from '~img/post/testLogo2.png'

//scss
import './SocialLogin.scss'

class SocialLogin extends Component {
    constructor(){
        super()
        this.state = {
            user : undefined,
            user_input_nick : ''
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
        // fetch('/auth/kakao/info', {
        //     method : "GET",
        //     credentials: 'same-origin'
        // })
        // .then(data => data.json())
        // .then(json => JSON.parse(json))
        // .then(response => {
        //     console.log(response.user)
        //     this.setState({
        //         ...this.state,
        //         user : response.user
        //     })
        // })
        this._test()
    }

    _handleOnNickInputChange = (e) => {
        console.log(e.target.value)
    }

    _checkNick = (nick) => {
        // fetch('/auth/')
    }

    _test = () => {
        const request = {
            user : {
                id : 'test id',
                nick : 'test nick',
                name : 'test name',
                pw : 'test pw'
            }
        }
        fetch('/auth/login/local', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(request.user)
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => console.log(response))
    }

    _handleOnBtnSubmitClick = () => {
        const user = {
            id : this.state.user.unqueId,
            name : this.state.user.name,
            profilePhotoUrl : this.state.user.profilePhotoUrl,
            nick : 'kihyun'
        }
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
                                <div className="__top">
                                    <div className="__left">
                                        <div className="socialLogin__profilePhoto-container">
                                            <ProfilePhoto url={this.state.user.profilePhotoUrl}/>
                                        </div>
                                        <span>{this.state.user.name}</span>
                                    </div>
                                    <div className="__right">
                                        <img className="__logo" src={logoImg}/>
                                    </div>
                                </div>
                                <div className="__bottom">
                                    <span>사용하실 닉네임을 정해주세요</span>
                                    <div className="__input-container">
                                        <input onChange={this._handleOnNickInputChange} type="text" placeholder="닉네임"/>
                                    </div>
                                    <button disabled="true">시작하기</button>
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

export default SocialLogin