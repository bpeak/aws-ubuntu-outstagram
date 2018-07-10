import React, { Component } from 'react'

import './NewsModal.scss'

import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'

import { Link } from 'react-router-dom'

import LoadingSpinner from '~components/LoadingSpinner/LoadingSpinner.js'

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
                            ? '최근 소식이 없습니다.'
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
    return (
        <div className="News LikeNews">
            <Link className="__userInfo" to="/dd">
                <div className="__profilePhoto-container">
                    <ProfilePhoto url={news.profilePhotoUrl}/>
                </div>
                <span className="__nick">
                    {news.nick}
                </span>
            </Link>
            <span className="__msg">님이 회원님의 포스트를 좋아합니다.</span>
            <span className="__date">2주</span>
        </div>
    )
}

const CommentNews = ({news}) => {
    return (
        <div className="News LikeNews">
            <Link className="__userInfo" to="/dd">
                <div className="__profilePhoto-container">
                    <ProfilePhoto url={news.profilePhotoUrl}/>
                </div>
                <span className="__nick">
                    {news.nick}
                </span>
            </Link>
            <span className="__msg">님이 댓글을 남겼습니다.</span>
            <span className="__date">2주</span>
        </div>
    )
}

const FollowNews = ({news}) => {
    return (
        <div className="News LikeNews">
            <Link className="__userInfo" to="/dd">
                <div className="__profilePhoto-container">
                    <ProfilePhoto url={news.profilePhotoUrl}/>
                </div>
                <span className="__nick">
                    {news.nick}
                </span>
            </Link>
            <span className="__msg">님이 회원님을 팔로우하기 시작했습니다.</span>
            <button className="__btn">팔로잉</button>
        </div>
    )
}

export default NewsModal