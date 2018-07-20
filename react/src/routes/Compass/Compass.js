import React, { Fragment, Component } from 'react';

import Header from '~components/Header/Header.js'

import './Compass.scss'

class Compass extends Component {
    constructor(){
        super()
        this.state = {
            postIds : []
        }
    }


    componentDidMount(){
        const request = {
            postIds : this.state.postIds
        }
        fetch('/api/posts/all', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            credentials : 'same-origin',
            body : JSON.stringify(request)
        })
        .then(data => data.json())
        .then(json => JSON.parse(json))
        .then(response => {
            console.log(response)
        })
    }

    render(){
        return (
            <div className="Compass">
                <Header/>
                <div className="__main">
                    <div className="__contents">

                    </div>
                </div>
            </div>
        );
    }
};

export default Compass