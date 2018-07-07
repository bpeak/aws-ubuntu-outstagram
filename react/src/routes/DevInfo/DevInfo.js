import React, { Component } from 'react'

//components
import PassportHeader from '~components/PassportHeader/PassportHeader.js'

//scss
import './DevInfo.scss'

class DevInfo extends Component { 
    render(){
        return(
            <div className="devInfo">
                <PassportHeader/>
                <main>
                    <section>
                        <h1>dev info</h1>
                        <ul>
                            <li>developer : 김기현</li>
                            <li>email : bpeakCbpeak@gmail.com</li>
                        </ul>
                        <h2>기술 스택</h2>
                        <ul>
                            <li>프론트엔드
                                <ul>
                                    <li>React</li>
                                    <li>Redux</li>
                                    <li>html5</li>
                                    <li>scss</li>
                                    <li>webpack</li>
                                </ul>
                            </li>
                            <li>백엔드
                                <ul>
                                    <li>node.js</li>
                                    <li>express</li>
                                    <li>server : 자체서버</li>
                                </ul>                   
                            </li>
                        </ul>
                    </section>
                </main>
            </div>
        )
    }
}

export default DevInfo