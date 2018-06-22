import React, { Component, Fragment } from 'react'

import './SlideShow.scss'

import phoneImg from '../../img/slideShow/phone.png'
import slide1Img from '../../img/slideShow/slide1.png'
import slide2Img from '../../img/slideShow/slide2.jpg'
import slide3Img from '../../img/slideShow/slide3.jpg'
import slide4Img from '../../img/slideShow/slide4.png'
import slide5Img from '../../img/slideShow/slide5.png'
import slide6Img from '../../img/slideShow/slide6.jpg'
import slide7Img from '../../img/slideShow/slide7.jpg'

//zz
import taesubImg from '../../img/slideShow/taesub.png'

const slideImgs = [slide1Img, slide2Img, taesubImg, slide3Img, slide4Img, slide5Img, slide6Img]

class SlideShow extends Component{
    constructor(){
        super()
        this.state = {
            slideImgs : slideImgs,
            slideImgCurrentIndex : 0,
            slideImgPreviousIndex : slideImgs.length - 1,
            isOdd : false
        }
    }
    
    componentDidMount(){
        this.unSetInterval = setInterval(() => {
            if(this.state.slideImgCurrentIndex === this.state.slideImgs.length - 1){
                this.setState({
                    ...this.state,
                    slideImgPreviousIndex : this.state.slideImgCurrentIndex,
                    slideImgCurrentIndex : 0,
                    isOdd : !this.state.isOdd
                })
            } else {
                this.setState({
                    ...this.state,
                    slideImgPreviousIndex : this.state.slideImgCurrentIndex,
                    slideImgCurrentIndex : this.state.slideImgCurrentIndex + 1,
                    isOdd : !this.state.isOdd
                })
            }
        }, 4000)
    }

    componentWillUnmount(){
        clearInterval(this.unSetInterval)
    }

    render(){
        return (
            <div id="slideShow-container">
                <img id="slideShow-phone" src={phoneImg}/>
                <div id="slideShow-phone-container">
                    <img className={this.state.isOdd === true ? "slideImgCurrent" : "slideImgPrevious"} src={this.state.isOdd === true ? this.state.slideImgs[this.state.slideImgCurrentIndex] : this.state.slideImgs[this.state.slideImgPreviousIndex] }/>
                    <img className={this.state.isOdd === true ? "slideImgPrevious" : "slideImgCurrent"} src={this.state.isOdd === true ? this.state.slideImgs[this.state.slideImgPreviousIndex] : this.state.slideImgs[this.state.slideImgCurrentIndex]}/>               
                </div>
            </div>
        )
    }
}

export default SlideShow