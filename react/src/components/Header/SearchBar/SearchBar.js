import React, { Component } from 'react';

//css
import './SearchBar.scss'

//img
import searchImg from '~img/header/search.png'

//components
import SmallLoadingSpinner from '~components/LoadingSpinner/SmallLoadingSpinner'
import SearchBarModal from './SearchBarModal/SearchBarModal.js'
import Modal from '~components/Modal/Modal.js'

class SearchBar extends Component {
    constructor(){
        super()
        this.state = {
            input : {
                isFocused : false,
                val : '검색'
            },
            isFetching : false,
            classifiedPosts : undefined,
            users : undefined
        }
    }

    _currentFetchController = null

    _handleOnInputFocus = () => {
        this.setState({
            ...this.state,
            input : {
                ...this.state.input,
                isFocused : true
            }
        })
    }
    _handleOnInputBlur = (e) => {
        console.log('블러이벤트')
        this.setState({
            ...this.state,
            input : {
                ...this.state.input,
                isFocused : false
            }
        })    
    }

    _handleOnInputChange = (e) => {
        //onChange => but 모달값존재 => 이벤트동작X
        if(this.state.users !== undefined && this.state.classifiedPosts !== undefined){
            return false
        }
        if(e.target.value === ''){
            this._checkPreviousFetchAndCancel()
            this.setState({
                ...this.state,
                isFetching : false,
                users : undefined,
                classifiedPosts : undefined,
                input : {
                    ...this.state.input,
                    val : '검색'
                }
            })
        } else {
            this._checkPreviousFetchAndCancel()
            this._fetchSearchStart(e.target.value)
            this._fetchSearch(e.target.value, (err, response) => {
                if(err){
                    if(err.name === "AbortError"){
                        //done
                    } else {
                        console.log(err)
                    }
                } else {
                    this.setState({
                        ...this.state,
                        classifiedPosts : response.classifiedPosts,
                        users : response.users,
                        isFetching : false,
                        input : {
                            ...this.state.input,
                            isFocused : false
                        }
                    })
                }
            })
        }
    }

    _checkPreviousFetchAndCancel = () => {
        if(this._currentFetchController !== null){
            this._currentFetchController.abort()
        }
        this._currentFetchController = new AbortController()
    }

    _fetchSearchStart = (eTargetValue) => {
        this.setState({
            ...this.state,
            input : {
                ...this.state.input,
                val : eTargetValue
            },
            isFetching : true
        })
    }

    _fetchSearch = (user_input_text, callback) => {
        fetch(`/api/search/${user_input_text}`, {
            method : "GET",
            signal : this._currentFetchController.signal
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => callback(null, response))
        .catch(err => {
            callback(err, null)
        })
    }

    _handleOnModalCloseClick = () => {
        this.refs.searchBar__input.value = ''
        this.refs.searchBar__input.focus()
        this.setState({
            ...this.state,
            users : undefined,
            classifiedPosts : undefined,
            input : {
                ...this.state.input,
                isFocused : true
            }
        })
    }

    render() {
        return (
            <div className="searchBar">
                <input ref="searchBar__input"
                    onFocus={this._handleOnInputFocus}
                    onBlur={this._handleOnInputBlur}
                    onInput={this._handleOnInputChange}
                    type="text"
                >
                 </input>   
                <img className="searchImg_focus" src={searchImg}/>

                {this.state.isFetching === true && 
                    <div className="smallLoadingSpinner-container">
                        <SmallLoadingSpinner/>
                    </div>                    
                }

                {this.state.input.isFocused === false &&
                    //cover
                    <div className="cover">
                        <img className="searchImg" src={searchImg}/>
                        <span ref="span_blur">{this.state.input.val}</span>                
                    </div>
                }
               
                {this.state.users !== undefined && this.state.classifiedPosts !== undefined 
                    && <SearchBarModal 
                            classifiedPosts={this.state.classifiedPosts} 
                            users={this.state.users}
                            handleOnModalCloseClick = {this._handleOnModalCloseClick}
                        />
                }

            </div>
        );
    }
}

export default SearchBar;

