import React, { Component } from 'react'

import './NewsModal.scss'

import LoadingSpinner from '~components/LoadingSpinner/LoadingSpinner.js'

class NewsModal extends Component{
    constructor(){
        super()
        this.state = {
            isFetched : false
        }
    }

	_handleClick = (e) => {
		if(e.target.id === "modal"){
            //done
		} else {
            this.props.invertModalState()
		}
    }
    
    _fetchNews = () => {
        fetch('/api/news', {
            method : "GET",
            credentials: 'same-origin'
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(respones => {
            console.log(response)
            this._fetchFinish()
        })
    }

    _fetchFinish = () => {
        this.setState({
            ...this.state,
            isFetched : true
        })
    }

    componentWillMount(){
    	document.addEventListener('click', this._handleClick)
    }
    componentWillUnmount() {
    	document.removeEventListener('click', this._handleClick)
    }
    
    componentDidMount(){
        console.log(1)
        this._fetchNews()
    }

    render(){
        return(
            <div id="modal" className={this.state.isFetched === true ? "newsModal-container newsModal-active" : "newsModal-container newsModal-InActive" }>
                {this.state.isFetched === false && <LoadingSpinner/>}
            </div>
        )
    }
}

export default NewsModal