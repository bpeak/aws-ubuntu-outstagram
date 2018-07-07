import React, { Component, Fragment } from 'react'

import './IconHeart.scss'

import ImgHeart from '~img/heart.svg'

import NewsModal from './NewsModal/NewsModal.js'

class IconHeart extends Component{
    constructor(){
        super()
        this.state = {
            isModalOpend : false
        }
    }

    _invertModalState = () => {
        console.log('인벌트버튼')
        this.setState({
            ...this.state,
            isModalOpend : !this.state.isModalOpend
        })
    }

    render(){
        return (
            <div id="iconHeart-container">
                <a onClick={this._invertModalState}><img className="header__icon_right" src={ImgHeart}/></a>
                {this.state.isModalOpend === true && <NewsModal invertModalState={this._invertModalState}/>}
            </div>
        )
    }
}

export default IconHeart