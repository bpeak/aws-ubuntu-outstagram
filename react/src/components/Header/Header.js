import React from 'react';
import { Link } from 'react-router-dom';

import IconHeart from './IconHeart/IconHeart.js'
import SearchBar from './SearchBar/SearchBar.js'

import IconPostWriteImg from '~img/post/write.png'

import imgs from '../../img/img.js'

//store
import store from '~redux/reducers/store.js'

//scss
import './Header.scss';

const Header = () => {
    return (
        <header id="header">
            <div className="header__content">
                <div>
                    <IconCamera/>
                    <IconBstargram/>            
                </div>
                <div>
                    <SearchBar/>
                </div>
                <div>
                    <IconPostWrite/>
                    <IconCompass/>
                    <IconHeart/>
                    <IconProfile/>            
                </div>
            </div>
        </header>
    )
}
const IconCamera = () => {
    return (
        <Link to="/">
            <img className="header__icon_camera" src={imgs.camera}/>
        </Link>
    )
}
const IconBstargram = () => {
    return (
        <Link to="/">
            <img className="header__icon_bstargram" src={imgs.logo}/>
        </Link>
    )
}
const IconPostWrite = () => {
    return (
        <Link to="/postWrite">
            <img className="header__icon_right" src={IconPostWriteImg}/>
        </Link>
    )
}
const IconCompass = () => {
    return (
        <Link to="/compass">
            <img className="header__icon_right" src={imgs.compass}/>
        </Link>
    )
}
const IconProfile = () => {
    const nick = store.getState().user.nick
    const url = `/profile/${nick}`
    return (
        <Link to={url}>
            <img className="header__icon_right" src={imgs.profile}/>
        </Link>
    )
}

export default Header