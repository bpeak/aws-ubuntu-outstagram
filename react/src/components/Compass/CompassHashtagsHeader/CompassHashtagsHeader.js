import React from 'react'

import sampleImg from '~img/slideShow/slide1.png'

import './CompassHashtagsHeader.scss'

const CompassHashtagsHeader = (props) => {
    console.log(props.mostPopularPost, '인기짱')
    return (
        <div className="compassHashtagsHeader">
            <div className="mostPopularPostImg-container">
                <img src={props.mostPopularPost.contents[0].url}/>
            </div>
            <div className="textSet">
                <div className="hashtag">
                    #{props.hashtag}
                </div>
                <div className="postsCount">
                    <span>게시물</span>
                    <span>{props.postsCount}</span>
                </div>
            </div>
        </div>
    )
}

export default CompassHashtagsHeader