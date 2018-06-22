import React, { Component } from 'react'

import './FollowNewsModal.scss'

import LoadingSpinner from '~components/LoadingSpinner/LoadingSpinner.js'

class FollowNewsModal extends Component{
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
    
    _fetchRecentlyFollows = () => {
        console.log('d')
        setTimeout(() => {
            this.setState({
                ...this.state,
                isFetched : true
            })
        }, 1500)
    }

    componentWillMount(){
    	document.addEventListener('click', this._handleClick)
    }
    componentWillUnmount() {
    	document.removeEventListener('click', this._handleClick)
    }
    
    componentDidMount(){
        console.log(1)
        this._fetchRecentlyFollows()
    }

    render(){
        return(
            <div id="modal" className={this.state.isFetched === true ? "followNewsModal-container followNewsModal-active" : "followNewsModal-container followNewsModal-InActive" }>
                {this.state.isFetched === false && <LoadingSpinner/>}
            </div>
        )
    }
}

export default FollowNewsModal