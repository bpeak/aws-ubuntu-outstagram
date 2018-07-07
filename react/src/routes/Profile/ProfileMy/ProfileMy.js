import React, { Component } from 'react';

//components
import ProfileMyHeader from '~components/Profile/ProfileMyHeader.js'
import ProfileMyContents from '~components/Profile/ProfileMyContents.js'

//scss 
import './ProfileMy.scss'

class ProfileMy extends Component {
    constructor(){
        super()
        this.state = {
            savedPosts : []
        }
    }
    componentDidMount(){
        fetch('/api/users/post/flaged', {
            method : "GET",
            credentials: "same-origin"
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            console.log(response)
            this.setState({
                ...this.state,
                savedPosts : response.posts
            })
        })
    }
    render() {
        const { 
            nick,
            name,
            profilePhotoUrl,
            followers,
            followings,
            posts,
            savedPosts
        } = this.props.user
        return (
            <div className="profileMy">
                <header>
                   <ProfileMyHeader
                        nick={nick}
                        name={name}
                        profilePhotoUrl={profilePhotoUrl}
                        followers={followers}
                        followings={followings}
                        postsCount={posts.length}
                   />
                </header>
                <section>
                    <ProfileMyContents
                        posts={posts}
                        savedPosts={this.state.savedPosts}
                    />
                </section>
            </div>
        )
    }
}

export default ProfileMy;