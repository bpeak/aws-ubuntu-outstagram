import React, { Component, Fragment } from 'react';

//components
import ProfileMyContentsNav from '~components/Profile/ProfileMyContentsNav/ProfileMyContentsNav.js'
//컴패스포스트랑 그거  포스트박스 공용으로쓸건데 일단 임시로 해놨음
import CompassPost from '~components/Compass/CompassPosts/CompassPost.js'

import saveImg from '~img/save.png'
import writeImg from '~img/post/write.png'
import { Link } from 'react-router-dom'

//scss
import './ProfileMyContents.scss'

class ProfileMyContents extends Component {
    constructor(){
        super()
        this.state = {
            isSelectedNavItemPosts : true
        }
    }

    _handleOnNavItemPostsClick = () => {
        this.setState({
            ...this.state,
            isSelectedNavItemPosts : true
        })
    }

    _handleOnNavItemSavedClick = () => {
        this.setState({
            ...this.state,
            isSelectedNavItemPosts : false
        })
    }

    render() {
        const { 
            posts,
            savedPosts
        } = this.props
        return (
            <div className="profileMyContents">
                <nav>
                    <ProfileMyContentsNav 
                        isSelectedNavItemPosts={this.state.isSelectedNavItemPosts}
                        handleOnNavItemPostsClick={this._handleOnNavItemPostsClick}
                        handleOnNavItemSavedClick={this._handleOnNavItemSavedClick}
                    />
                </nav>
                <section>
                    {this.state.isSelectedNavItemPosts === true 
                        ? <Fragment>
                            {posts.length === 0
                                ? <div className="__msg-container">
                                    <Link to="/postwrite">
                                        <img src={writeImg}/>
                                    </Link>
                                    <div className="__msg">
                                        게시된 포스트가 없습니다. 사진, 동영상을 올려 공유해보세요.
                                    </div>
                                </div>
                                : <Fragment>
                                    {posts.map((post, index) => {
                                        return (
                                            <CompassPost 
                                                key={index}
                                                post={post}
                                            />
                                        )
                                    })}
                                </Fragment>
                            }
                        </Fragment>
                        : <Fragment>
                            {savedPosts.length === 0 
                                ? <div className="__msg-container">
                                    <img src={saveImg}/>
                                    <div className="__msg">
                                        다시 보고 싶은 사진과 동영상을 저장하세요. 콘텐츠를 저장해도 다른 사람에게 알림이 전송되지 않으며, 저장된 콘텐츠는 회원님만 볼 수 있습니다.
                                    </div>
                                </div>
                                : <Fragment>
                                    {savedPosts.map((post, index) => {
                                        return (
                                            <CompassPost 
                                                key={index}
                                                post={post}
                                            />
                                        )
                                    })}                                    
                                </Fragment>
                            }

                        </Fragment>
                    }

                </section>
            </div>
        );
    }
}

export default ProfileMyContents;