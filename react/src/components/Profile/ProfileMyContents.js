import React, { Component } from 'react';

//components
import ProfileMyContentsNav from '~components/Profile/ProfileMyContentsNav/ProfileMyContentsNav.js'
//컴패스포스트랑 그거  포스트박스 공용으로쓸건데 일단 임시로 해놨음
import CompassPost from '~components/Compass/CompassPosts/CompassPost.js'


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
        const { posts } = this.props
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
                    {posts.map((post, index) => {
                        return (
                            <CompassPost 
                                key={index}
                                post={post}
                            />
                        )
                    })}
                </section>
            </div>
        );
    }
}

export default ProfileMyContents;