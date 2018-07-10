import React, { Component } from 'react';

//components
import ProfileOtherContents from '~components/Profile/ProfileOtherContents.js'
import ProfileOtherHeader from '~components/Profile/ProfileOtherHeader.js'

//scss
import './ProfileOther.scss'

class ProfileOther extends Component {
    render() {
        return (
            <div className="ProfileOther">
                <section className="__user-info">
                    <ProfileOtherHeader user={this.props.user}/>
                </section>
                <section className="__user-contents">
                    <ProfileOtherContents posts={this.props.user.posts}/>
                </section>
            </div>
        );
    }
}

export default ProfileOther;