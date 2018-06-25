import React, { Component } from 'react';

//imgs
import nineRectangleImg from '~img/profile/my/nineRectangle.png'
import nineRectangleGreyImg from '~img/profile/my/nineRectangleGrey.png'
import bookmarkImg from '~img/profile/my/bookmark.png'
import bookmarkGreyImg from '~img/profile/my/bookmarkGrey.png'

//scss
import './ProfileMyContentsNav.scss'

class ProfileMyContentsNav extends Component {
    render() {
        const { 
            isSelectedNavItemPosts,
            handleOnNavItemPostsClick,
            handleOnNavItemSavedClick
        } = this.props
        return (
            <div className="profileMyContentsNav">
                <ProfileMyContentsNavPosts 
                    isSelected={isSelectedNavItemPosts}
                    handler={handleOnNavItemPostsClick}
                />
                <ProfileMyContentsNavSaved 
                    isSelected={!isSelectedNavItemPosts}
                    handler={handleOnNavItemSavedClick}
                />
            </div>
        );
    }
}

const ProfileMyContentsNavPosts = ({isSelected, handler}) => {
    let className
    let src
    if(isSelected){
        className="profileMyContentsNavItem active"
        src=nineRectangleImg
    } else {
        className="profileMyContentsNavItem disabled"
        src=nineRectangleGreyImg
    }
    return (
        <div onClick={handler} className={className}>
            <img src={src}/>
            <span>게시물</span>
        </div>
    )
}

const ProfileMyContentsNavSaved = ({isSelected, handler}) => {
    let className
    let src
    if(isSelected){
        className="profileMyContentsNavItem active"
        src=bookmarkImg
    } else {
        className="profileMyContentsNavItem disabled"
        src=bookmarkGreyImg
    }    
    return (
        <div onClick={handler} className={className}>
            <img src={src}/>
            <span>저장됨</span>
        </div>
    )
}

export default ProfileMyContentsNav