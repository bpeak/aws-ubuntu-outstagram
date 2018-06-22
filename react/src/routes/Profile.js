import React,{ Fragment } from 'react';

import Header from '../components/Header/Header.js'

const Profile = (props) => {
    return (
        <Fragment>
            <Header/>
            <div>Profile Page</div>
            <div>{props.match.params.user_nick}</div>
        </Fragment>
    )
}

export default Profile