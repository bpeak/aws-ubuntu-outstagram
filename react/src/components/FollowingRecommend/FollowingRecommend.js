import React, { Component, Fragment } from 'react';

import './FollowingRecommend.scss'

import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'
import SmallLoadingSpinner from '~components/LoadingSpinner/SmallLoadingSpinner.js'

import xImg from '~img/main/followingRecommend/x.png'

import arrowLeft from '~img/post/arrowLeft.png'
import arrowRight from '~img/post/arrowRight.png'

import { Link } from 'react-router-dom'

class FollowingRecommend extends Component {
    constructor(){
        super()
        this.state = {
            allFollowingRecommendedList : undefined,
            currentFollowingRecommendedList : undefined,
            currentStartIndex : 0,
            isMouseEntered : false,
        }
    }

    componentDidMount(){
        fetch('/api/users/recommend/list', {
            method : "GET",
            credentials: "same-origin"
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            const allFollowingRecommendedList = response.users
            let currentFollowingRecommendedList
            if(allFollowingRecommendedList <= 3){
                currentFollowingRecommendedList = [...allFollowingRecommendedList]
            } else {
                currentFollowingRecommendedList = [...allFollowingRecommendedList].slice(this.state.currentStartIndex, this.state.currentStartIndex + 3)
            }
            this.setState({
                ...this.state,
                allFollowingRecommendedList,
                currentFollowingRecommendedList
            }, () => {console.log(this.state)})
        })
    }

    _handleOnArrowLeftClick = () => {
        this.setState({
            ...this.state,
            currentStartIndex : this.state.currentStartIndex - 3
        }, () => {
            console.log(this.state.currentStartIndex)
        })
    }

    _handleOnArrowRightClick = () => {
        this.setState({
            ...this.state,
            currentStartIndex : this.state.currentStartIndex + 3
        }, () => {console.log(this.state.currentStartIndex)})
    }

    _handleOnMouseEnter = () => {
        this.setState({
            ...this.state,
            isMouseEntered : true
        })
    }

    _handleOnMouseLeave = () => {
        this.setState({
            ...this.state,
            isMouseEntered : false
        })
    }

    _removeRecommendedUser = (index) => {
        const deleteIndex = this.state.currentStartIndex + index
        let currentStartIndex = this.state.currentStartIndex
        if(deleteIndex > 2 && index === 0 && this.state.allFollowingRecommendedList.length === deleteIndex + 1){
            currentStartIndex = this.state.currentStartIndex - 3
        }
        const allFollowingRecommendedList = [...this.state.allFollowingRecommendedList]
        allFollowingRecommendedList.splice(deleteIndex, 1)
        this.setState({
            ...this.state,
            allFollowingRecommendedList : allFollowingRecommendedList,
            currentStartIndex : currentStartIndex
        })
        
    }

    render() {
        return (
            <div 
                onMouseEnter={this._handleOnMouseEnter}
                onMouseLeave={this._handleOnMouseLeave}
                className="followingRecommend">
                <div className="__top">
                    <div>회원님을 위한 추천</div>
                    <div>모두 보기</div>
                </div>
                <div className="__main">
                    { this.state.allFollowingRecommendedList === undefined
                        ? ''
                        : <Fragment>
                            {this.state.allFollowingRecommendedList.length === 0 && 
                                <span className="__currentNone">현재 추천이 없습니다.</span>
                            }
                            {this.state.currentStartIndex !== 0 && this.state.isMouseEntered === true &&
                                <img onClick={this._handleOnArrowLeftClick} className="__arrow __arrowLeft" src={arrowLeft}/>    
                            }
                            {this.state.allFollowingRecommendedList.slice(this.state.currentStartIndex, this.state.currentStartIndex + 3).map((user, index) => {
                                return (
                                    <FollowingRecommendedUser
                                        key={index}
                                        user={user}
                                        index={index}
                                        _removeRecommendedUser={this._removeRecommendedUser}
                                        _addFollowingUser={this._addFollowingUser}
                                    />
                                )
                            })}
                            {this.state.currentStartIndex + 3 < this.state.allFollowingRecommendedList.length && this.state.isMouseEntered === true &&
                                <img onClick={this._handleOnArrowRightClick} className="__arrow __arrowRight" src={arrowRight}/>
                            }
                        </Fragment>
                    }

                </div>
            </div>
        );
    }
}

class FollowingRecommendedUser extends Component {
    constructor(){
        super()
        this.state = {
            isFollowing : false,
            isFetching : false
        }
    }
    _fetchStart = () => {
        return new Promise((resolve, reject) => {
            this.setState({
                ...this.state,
                isFetching : true
            }, resolve)
        })
    }

    _fetchFollow = () => {
        return new Promise((resolve, reject) => {
            const request = {
                followNick : this.props.user.nick
            }
            fetch('/api/users/add/follow', {
                method : "POST",
                headers : {
                    'content-type' : 'application/json'
                },
                credentials: "same-origin",
                body : JSON.stringify(request)
            })
            .then(data => data.json())
            .then(json => JSON.parse(json))
            .then(response => {
                if(response.isSuccess === true){
                    resolve()
                }
            })
        })
    }

    _fetchFollowFinish = () => {
        this.setState({
            ...this.state,
            isFetching : false,
            isFollowing : true
        })
    }

    _fetchUnFollow = () => {
        return new Promise((resolve, reject) => {
            const request = {
                unFollowNick : this.props.user.nick
            }
            fetch('/api/users/remove/follow', {
                method : "POST",
                headers : {
                    'content-type' : 'application/json'
                },
                credentials: "same-origin",
                body : JSON.stringify(request)
            })
            .then(data => data.json())
            .then(json => JSON.parse(json))
            .then(response => {
                if(response.isSuccess === true){
                    resolve()
                }
            })
        })
    }

    _fetchUnFollowFinish = () => {
        this.setState({
            ...this.state,
            isFetching : false,
            isFollowing : false
        })
    }

    _handleOnFollowClick = () => {
        this._fetchStart()
        .then(() => {
            if(this.state.isFollowing === true){
                //언팔로우
                console.log('언팔한다')
                this._fetchUnFollow()
                .then(() => {
                    this._fetchUnFollowFinish()
                })
            } else {
                //팔로우
                this._fetchFollow()
                .then(() => {
                    this._fetchFollowFinish()
                })
            }
        })
    }
    _handleOnXClick = () => {
        this.props._removeRecommendedUser(this.props.index)
    }
    render(){
        const { user, index } = this.props
        console.log(user)
        return(
            <div className="__user">
                <img onClick={this._handleOnXClick} className="xImg" src={xImg}/>
                <Link to={`/profile/${user.nick}`}>
                    <div className="profilePhoto-container">
                        <ProfilePhoto url={user.profilePhotoUrl}/>
                    </div>
                </Link>
                <Link to={`/profile/${user.nick}`}>                <div className="userSet">
                    <div className="nick">{user.nick}</div>
                        <div className="name">{user.name}</div>
                        <div className="recommendedReason">{user.recommendedReason}</div>                            
                    </div>
                </Link>

                <div className="__btnSet">
                    <button
                        onClick={this._handleOnFollowClick}
                        className={this.state.isFollowing === false ? "btnFollow" : "btnUnFollow"}
                    >
                        {this.state.isFollowing === true ? "언팔로우" : "팔로우"}
                    </button>
                    {this.state.isFetching === true &&
                        <div className="__loadingSpinner-container">
                            <SmallLoadingSpinner/>
                        </div>                   
                    }
                </div>
            </div>
        )
    }
}

export default FollowingRecommend;