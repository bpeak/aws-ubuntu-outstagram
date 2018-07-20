import React, { Component } from 'react'

import './NewsModal.scss'

import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'

import { Link } from 'react-router-dom'

import LoadingSpinner from '~components/LoadingSpinner/LoadingSpinner.js'

import videoImg from '~img/video.png'

class NewsModal extends Component{
    constructor(){
        super()
        this.state = {
            recentNews : null,
            isFetched : false
        }
    }

	_handleClick = (e) => {
		if(e.target.id === "modal"){
            //done
		} else {
            this.props.invertModalState()
		}
    }
    
    _fetchNews = () => {
        fetch('/api/news', {
            method : "GET",
            credentials: 'same-origin'
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            console.log(response)
            this.setState({
                recentNews : response.recentNews,
                isFetched : true
            })
        })
    }

    componentWillMount(){
    	document.addEventListener('click', this._handleClick)
    }
    componentWillUnmount() {
    	document.removeEventListener('click', this._handleClick)
    }
    
    componentDidMount(){
        console.log(1)
        this._fetchNews()
    }

    render(){
        return(
            <div id="modal" className={this.state.isFetched === true ? "newsModal-container newsModal-active" : "newsModal-container newsModal-InActive" }>
                {this.state.isFetched === false && <LoadingSpinner/>}
                {this.state.isFetched === true && this.state.recentNews !== null && 
                    <div className="__main">
                        {this.state.recentNews.length === 0 
                            ? <div className="__msg-container">
                                <span>최근소식이 없습니다.</span>
                            </div>
                            : <div>
                                {this.state.recentNews.map(((news, index) => {
                                    if(news.type === 'follow'){
                                        return <FollowNews key={index} news={news}/>
                                    } else if (news.type === 'like'){
                                        return <LikeNews key={index} news={news}/>
                                    } else if (news.type === 'comment'){
                                        return <CommentNews key={index} news={news}/>
                                    }
                                }))}
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

const LikeNews = ({news}) => {
    let imgSrc = null
    for(let i = 0; i < news.post.contents.length; i++){
        if(news.post.contents[i].type === 'img'){
            imgSrc = news.post.contents[i].url
            break
        } else {
            continue
        }
    }
    let timeStamp

    const date = new Date(Date.parse(news.date))
    const today = new Date()
    if(date.getMonth() === today.getMonth()){
        if(today.getDate() === date.getDate()){
            timeStamp = "오늘"
        } else {
            timeStamp = today.getDate() - date.getDate() + "일전"
        }
    } else {
        timeStamp = today.getMonth() - date.getMonth() + "달전"
    }

    return (
        <div className="News LikeNews">
            <div className="__left">
                <Link className="__userInfo" to={`/profile/${news.nick}`}>
                    <div className="__profilePhoto-container">
                        <ProfilePhoto url={news.profilePhotoUrl}/>
                    </div>
                    <span className="__nick">
                        {news.nick}
                    </span>
                </Link>
                <span className="__msg">님이 회원님의 포스트를 좋아합니다.</span>
                <span className="__date">{timeStamp}</span>            
            </div>
            <div className="__right">
                {imgSrc === null
                    ? <img className="__content" src={videoImg}/>
                    : <Link to={`/post/${news.post._id}`}><img className="__content" src={imgSrc}/></Link>
                }
            </div>
        </div>
    )
}

const CommentNews = ({news}) => {
    let imgSrc = null
    for(let i = 0; i < news.post.contents.length; i++){
        if(news.post.contents[i].type === 'img'){
            imgSrc = news.post.contents[i].url
            break
        } else {
            continue
        }
    }

    let timeStamp

    const date = new Date(Date.parse(news.date))
    const today = new Date()
    if(date.getMonth() === today.getMonth()){
        if(today.getDate() === date.getDate()){
            timeStamp = "오늘"
        } else {
            timeStamp = today.getDate() - date.getDate() + "일전"
        }
    } else {
        timeStamp = today.getMonth() - date.getMonth() + "달전"
    }

    return (
        <div className="News LikeNews">
            <div className="__left">
                <Link className="__userInfo" to={`/profile/${news.nick}`}>
                    <div className="__profilePhoto-container">
                        <ProfilePhoto url={news.profilePhotoUrl}/>
                    </div>
                    <span className="__nick">
                        {news.nick}
                    </span>
                </Link>
                <span className="__msg">님이 댓글을 남겼습니다.</span>
                <span className="__date">{timeStamp}</span>
            </div>
            <div className="__right">
                {imgSrc === null
                    ? <img className="__content" src={videoImg}/>
                    : <Link to={`/post/${news.post._id}`}><img className="__content" src={imgSrc}/></Link>
                }            
            </div>
        </div>
    )
}

const FollowNews = ({news}) => {

    let timeStamp

    const date = new Date(Date.parse(news.date))
    const today = new Date()
    if(date.getMonth() === today.getMonth()){
        if(today.getDate() === date.getDate()){
            timeStamp = "오늘"
        } else {
            timeStamp = today.getDate() - date.getDate() + "일전"
        }
    } else {
        timeStamp = today.getMonth() - date.getMonth() + "달전"
    }

    return (
        <div className="News LikeNews">
            <div className="__left">
                <Link className="__userInfo" to={`/profile/${news.nick}`}>
                    <div className="__profilePhoto-container">
                        <ProfilePhoto url={news.profilePhotoUrl}/>
                    </div>
                    <span className="__nick">
                        {news.nick}
                    </span>
                </Link>
                <span className="__msg">님이 회원님을 팔로우하기 시작했습니다.</span>          
                <span className="__date">{timeStamp}</span>  
            </div>
            <div className="__right">
                <button className={news.follow === true ? "__btn unFollow" : "__btn follow"}>{news.follow === true ? "언팔로잉" : "팔로잉"}</button>
            </div>
        </div>
    )
}

export default NewsModal