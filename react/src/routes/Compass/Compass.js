import React, { Fragment } from 'react';

import Header from '~components/Header/Header.js'

const Compass = (props) => {
    console.log(props.match.params)
    return (
        <Fragment>
            <Header/>
            <main>
                노말 컴패스
            </main>
        </Fragment>
    );
};

export default Compass