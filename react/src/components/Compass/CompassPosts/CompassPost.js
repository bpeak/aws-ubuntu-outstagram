import React, { Component } from 'react'

import PostModal from '~components/Post/PostModal/PostModal.js'

//imgs
import chatImg from '~img/compass/chat3.png'
import heartImg from '~img/compass/heart3.png'

//scss
import './CompassPost.scss'

class CompassPost extends Component{
    constructor(){
        super()
        this.state = {
            isFocused : false,
            isOpend : false
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

    _handleOnModalOpenClick = (e) => {
        //이부분 개선필요함 현재 억지로 끼워놨는데
        //왜 여기서의 클릭이 리액트포탈로 전달되어서
        //리액트포탈모달에서의 클릭이 발생했을때 여기서의 클릭이벤트가 발생되는건지 모르겠다.
        if(this.state.isOpend === true){
            //done//done
        } else {
            this.setState({
                ...this.state,
                isOpend : true
            })
        }
    }

    _handleOnModalCloseClick = () => {
        this.setState({
            ...this.state,
            isOpend : false
        })
        console.log('클로즈클릭')
    }

    render(){
        const { 
            contents,
            likes,
            comments
         } = this.props.post
        return(
            <div 
                className="compassPost"
                onClick={this._handleOnModalOpenClick}
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
                            <span className="icon-text">{likes.length}개</span>
                        </div>
                        <div className="icon">
                            <img className="iconChat" src={chatImg}/>
                            <span className="icon-text">{comments.length}개</span>
                        </div>
                    </div>
                }
                {this.state.isOpend === true 
                    && <PostModal 
                            post={this.props.post}
                            handleOnClose={this._handleOnModalCloseClick}
                        />
                }
            </div>
        )
    }
}

export default CompassPost