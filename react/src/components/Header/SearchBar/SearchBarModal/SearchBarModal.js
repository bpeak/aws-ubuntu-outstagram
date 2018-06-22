import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//scss
import './SearchBarModal.scss'

//components
import Modal from '~components/Modal/Modal.js'
import ProfilePhoto from '~components/Profile/ProfilePhoto/ProfilePhoto.js'

import sampleImg from '~img/header/searchbar/sharp.png'

class SearchBarModal extends Component {
    
    _handleOnWrapperClick = (e) => {
        if(e.target.className === 'searchBarModal-wrapper'){
            this.props.handleOnModalCloseClick()
        }
    }

    render(){
        const { users, classifiedPosts, handleOnModalCloseClick} = this.props
        return(
            <Modal>
                <div onClick={this._handleOnWrapperClick} className="searchBarModal-wrapper">
                    {classifiedPosts.length === 0 && users.length === 0 
                        ?
                            <div className="searchBarModal-noResult">
                                <span>검색결과가 없습니다.</span>
                            </div>   
                        :
                            <div className="searchBarModal">
                                {classifiedPosts.map((classifiedPost, index) => {
                                    return (
                                        <SearchBarModalHashtag
                                            key={index}
                                            hashtag={classifiedPost.hashtag}
                                            hashtagPostsCount = {classifiedPost.posts.length}
                                            handleOnModalCloseClick = {handleOnModalCloseClick}
                                        />
                                    )
                                })}
                                {users.map((user, index) => {
                                    return (
                                        <SearchBarModalUser
                                            key={index}
                                            profilePhotoUrl={user.profilePhotoUrl}
                                            nick={user.nick}
                                            name={user.name}
                                            handleOnModalCloseClick = {handleOnModalCloseClick}
                                        />
                                    )
                                })}
                            </div>                        
                    }
                </div>
            </Modal>
        )
    }
}

const SearchBarModalHashtag = ({hashtag, hashtagPostsCount, handleOnModalCloseClick}) => {
    return (
        <Link onClick={handleOnModalCloseClick} to={`/Compass/hashtags/${hashtag}`} className="__content">
            <img src={sampleImg}/>
            <div className="__textSet">
                <span>#{hashtag}</span>
                <span>게시물 {hashtagPostsCount}</span>
            </div>
        </Link>
    )
}
const SearchBarModalUser = ({profilePhotoUrl, nick, name, handleOnModalCloseClick}) => {
    return (
        <Link onClick={handleOnModalCloseClick} to={`/profile/${nick}`} className="__content">
            <ProfilePhoto url={profilePhotoUrl}/>
            <div className="__textSet">
                <span>{nick}</span>
                <span>{name}</span>
            </div>
        </Link>
    )
}
export default SearchBarModal