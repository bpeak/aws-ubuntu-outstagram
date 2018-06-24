import React, { Component } from 'react';

//components
import ProfileMyHeader from '~components/Profile/ProfileMyHeader.js'

//scss 
import './ProfileMy.scss'

class ProfileMy extends Component {
    render() {
        const { 
            nick,
            name,
            profilePhotoUrl,
            followers,
            followings,
            posts
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
                    콘텐뚜
                </section>
            </div>
        )
    }
}

export default ProfileMy;