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
                        <h1>developer</h1>
                        <ul>
                            <li>name : 김기현</li>
                            <li>email : bpeakCpeak@gmail.com</li>
                        </ul>
                        <h2>technical stack</h2>
                        <ul>
                            <li>frontend
                                <ul>
                                    <li>html5</li>
                                    <li>javascript</li>
                                    <li>scss</li>
                                    <li>React</li>
                                    <li>Redux</li>
                                    <li>webpack</li>
                                </ul>
                            </li>
                            <li>backend
                                <ul>
                                    <li>node.js</li>
                                    <li>express</li>
                                    <li>aws</li>
                                    <li>ec2</li>
                                    <li>linux(ubuntu)</li>
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