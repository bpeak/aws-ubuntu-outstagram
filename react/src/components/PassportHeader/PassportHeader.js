import React from 'react'

import { Link } from 'react-router-dom';

import './PassportHeader.scss'

const PassportHeader = () => {
    return (
        <Link to="/">
            <header className="passportHeader">
                <span>Outstagram</span>
            </header>
        </Link>
    )
}

export default PassportHeader