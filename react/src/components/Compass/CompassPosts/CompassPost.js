import React, { Component } from 'react'

import './CompassPost.scss'

import chatImg from '~img/compass/chat3.png'
import heartImg from '~img/compass/heart3.png'

class CompassPost extends Component{
    constructor(){
        super()
        this.state = {
            isFocused : false
        }
    }

    _handleOnMouseEnter = () => {
        this.setState({
            ...this.state,
            isFocused : true
        })
    }
    _handleOnMouseLeave = () => {
        this.setState({
            ...this.state,
            isFocused : false
        })
    }

    render(){
        const { contents } = this.props.post
        return(
            <div 
                className="compassPost"
                onMouseEnter={this._handleOnMouseEnter}
                onMouseLeave={this._handleOnMouseLeave}
            >
                {contents[0].type === 'img'
                    ?
                        <img src={contents[0].url}/>
                    :
                        <video>
                            <source src={contents[0].url} type="video/mp4" />
                        </video>
                }
                {this.state.isFocused === true 
                    &&
                    <div className="icons">
                        <div className="icon">
                            <img className="iconHeart" src={heartImg}/>
                            <span className="icon-text">100개</span>
                        </div>
                        <div className="icon">
                            <img className="iconChat" src={chatImg}/>
                            <span className="icon-text">13개</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default CompassPost