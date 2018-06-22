import React, { Component, Fragment } from 'react'

import Header from '~components/Header/Header.js'

import PostWriteForm from '~components/PostWriteForm/PostWriteForm.js'

import './PostWrite.scss'

class PostWrite extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <Fragment>
                <Header/>
                <section id="postWrite-postWriteForm">
                    <PostWriteForm/>
                </section>

            </Fragment>
        )
    }
}

export default PostWrite




{/* <section id="postWrite-container">
<div id="postWrite">
    <div id="postWrite-iconWrite-container">
        <img id="postWrite-iconWrite" src={write2Img}/>
    </div>
    <div id="postwrite-uploadFile-container">
        <img src={sampleImg}/>
        <img src={sampleImg}/>
        <img src={sampleImg}/>
    </div>
    <div id="postWrite-hashTags-container">
        <span>#sdfsdf</span><span>#sdfsdf</span><span>#sdfsdf</span>
    </div>
    <div id="postwrite-textarea-container">
        <textarea></textarea>
    </div>
    <button id="postWrite-btnSubmit">공유하기</button>
    <button id="postWrite-btnCancel">취소</button>
</div>
</section> */}