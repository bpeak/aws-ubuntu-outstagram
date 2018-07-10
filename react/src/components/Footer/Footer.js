import React from 'react';

import './Footer.scss'

import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer id="footer-container">
            <Link to='/devinfo'>개발정보</Link>
            <a>© 2018 OUTSTAGRAM</a>
        </footer>
    )
}

export default Footer