import React, { Component } from 'react';

import searchFile3Img from '~img/post/searchFile3.png'
import sampleImg from '~img/slideShow/slide2.jpg'

import getFileType from '~modules/getFileType.js'

import './PostWriteFormUpload.scss'

class PostWriteFormUpload extends Component {
    constructor(){
        super()
        this.state = {
            files : []
        }
    }

    _handleOnInputFileChange = (e) => {
        if(e.target.files.length === 0){
            //cancle
            return true
        }
        const newFile = e.target.files[0]
        let newFileType = getFileType(newFile.name)
        if(newFileType === false){
            alert('지원하지 않는 파일입니다.')
        } else {
            if(newFileType === "img"){
                const reader = new FileReader();            
                reader.onloadend = () => {
                    this.setState({
                        ...this.state,
                        files : [
                            ...this.state.files,
                            {
                                file : newFile,
                                type : "img",
                                previewUrl : reader.result
                            }
                        ]
                    });
                    const filed = {
                        file : newFile,
                        type : "img"
                    }
                    this.props.fileHandler(filed)
                }
                reader.readAsDataURL(newFile)
            } else if (newFileType === "video"){
                const videoPreviewUrl = URL.createObjectURL(newFile);
                this.setState({
                    ...this.state,
                    files : [
                        ...this.state.files,
                        {
                            file : newFile,
                            type : "video",
                            previewUrl : videoPreviewUrl
                        }
                    ]
                });
                const filed = {
                    file : newFile,
                    type : "video"
                }                
                this.props.fileHandler(filed)
            }
        }
    }

    _handleOnSearchFileClick = () => {
        this.refs.input_file.click()
    }
    
    render() {
        return (
            <div className="PostWriteFormUpload">
                <div className="contents">
                    {this.state.files.map((file, index) => {
                        if(file.type === "img"){
                            return <img key={index} src={file.previewUrl}/>
                        } else if(file.type === "video"){
                            return <video key={index}>
                                <source src={file.previewUrl} type="video/mp4"/>    
                            </video>
                        }
                    })}                    
                </div>
                <div className="file">
                    <div className="spec">
                        <div>지원이미지 png jpg</div>
                        <div>지원동영상 mp4</div>
                    </div>
                    <div className="adding">
                        <input onChange={this._handleOnInputFileChange} ref="input_file" type="file"/>
                        <span>여러분의 이미지와 동영상을 추가하세요.</span>
                        <img onClick={this._handleOnSearchFileClick} src={searchFile3Img}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostWriteFormUpload;