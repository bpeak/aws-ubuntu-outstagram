import React from 'react'

import arrowLeft from '../../../img/post/arrowLeft.png'
import arrowRight from '../../../img/post/arrowRight.png'

import './PostArrow.scss'

// const getClassNames = (isActive) => {
//     let classNames;
//     if(isActive === true){
//         classNames = "postArrow postArrow-left postArrow-active"
//     } else {
//         classNames = "postArrow postArrow-left postArrow-disabled"
//     }
// }

const left = ({handler, isActive}) => {
    return (
        <img onClick={handler} className="postArrow postArrow-left" src={arrowLeft}/>
    )
}
const right = ({handler}) => {
    return (
        <img onClick={handler} className="postArrow postArrow-right" src={arrowRight}/>
    )
}

const PostArrow = { left, right }
export default PostArrow

