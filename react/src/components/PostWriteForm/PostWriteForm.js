import React, { Component } from 'react'

import './PostWriteForm.scss'

//components
import PostWriteFormHashtag from './PostWriteFormHashtag/PostWriteFormHashtag.js'
import PostWriteFormUpload from './PostWriteFormUpload/PostWriteFormUpload.js'

import write3Img from '~img/post/write3.png'

import hashtagController from '~modules/hashtagController.js'

import store from '~redux/reducers/store.js'

class PostWriteForm extends Component{
	_maxLength = 150
	constructor(){
		super()
		this.state = {
			textarea : {
				val : '',
				currentLength : 0
			},
            hashtags : ['outstagram'],
            files : [],
            isFetched : false
		}
	}

	_handleOnTextareaChange = (e) => {
		const text = e.target.value
        const hashtags = hashtagController.getTextExceptSharp(hashtagController.extract(text))
		this.setState({
			...this.state,
			hashtags,
			textarea : {
				...this.state.textarea,
				val : text,
				currentLength : text.length
			}
		})
    }
    
    _handleOnInputFileChange = (test) => {
        this.setState({
            ...this.state,
            files : [
                ...this.state.files,
                test
            ]
        })
    }

    _handleOnSubmitClick = () => {
        if(this.state.files.length === 0){
            return alert('사진이나 영상을 올려주세요.')
        }
        this.setState({
            ...this.state,
            isFetched : true
        })
        const form = new FormData()
        //files
        for(let i = 0; i < this.state.files.length; i++){
            form.append('postFiles', this.state.files[i].file)
        }
        //textarea
        form.append('user_input_textarea', this.state.textarea.val)
        //hashtags
        for(let i = 0; i < this.state.hashtags.length; i++){
            form.append('hashtags', this.state.hashtags[i])
        }
        fetch('/api/posts/write', {
            method : "POST",
            credentials: "same-origin",
            body : form
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            if(response.isSuccess === true){
                const nick = store.getState().user.nick
                const url = `/profile/${nick}`
                window.location=url 
            }
        })
    }

	render(){
		return(
			<div className="postWriteForm">
                <header>
                    <img src={write3Img}/>
                    <span>POST WRITE</span>
                </header>
                <div className="upload-container">
                    <PostWriteFormUpload fileHandler={this._handleOnInputFileChange}/>
                </div>
				<div className="hashtags">
					{this.state.hashtags.map((hashtag, index) => {
						return <PostWriteFormHashtag hashtag={hashtag} key={index}/>
					})}
				</div>
                <div className="textLimit">
                    <span className={this.state.textarea.currentLength >= this._maxLength ? "warning" : undefined}>{this.state.textarea.currentLength}/{this._maxLength}</span>
                </div>
				<textarea placeholder="간단한 코멘트과 태그로 포스트를 공유하세요.&#13;&#10;eg ) #outstagram 과함께." onChange={this._handleOnTextareaChange} maxLength={this._maxLength}></textarea>
                <div className="btns">
                    <button 
                        onClick={this._handleOnSubmitClick} 
                        className={this.state.isFetched === true ? "submit sumbit-loading" : "submit"}>공유하기</button>
                    <button className="cancel">취소</button>
                </div>
            </div>
		)
	}
}

export default PostWriteForm