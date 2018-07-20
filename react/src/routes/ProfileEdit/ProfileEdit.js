import React, { Component } from 'react'

import Header from '~components/Header/Header.js'

import { NavLink, Route, Link } from 'react-router-dom'

import ProfileEditProfile from './ProfileEditProfile.js'
import ProfileEditPw from './ProfileEditPw.js'

import './ProfileEdit.scss'

class ProfileEdit extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="ProfileEdit">
                <Header/>
                <div className="__main-container">
                    <div className="__main">
                        <nav className="__nav">
                            <Link className="__menu" to="/profileEdit">프로필 편집</Link>
                            <span onClick={() => {
                                window.location.href = '/repassport'
                            }} className="__menu logout">로그아웃</span>
                            <Link className="__menu" to="/profileEdit/pw">비밀번호 변경</Link>
                        </nav>
                        <section className="__contents">
                            <Route exact path="/profileEdit" component={ProfileEditProfile}/>
                            <Route path="/profileEdit/pw" component={ProfileEditPw}/>                        
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileEdit