import React, { Component } from 'react';

import './JoinForm.scss'

import markYesImg from '~img/mark/markYes.svg'
import markNoImg from '~img/mark/markNo.svg'

import logoImg from '~img/post/testLogo2.png'

function JoinFormInPutStateMaker(){
    this.val = '';
    this.isFocus = false;
    this.isChecked = false;
}

class JoinForm extends Component{
    constructor(){
        super();
        this.state = {
            user_input_id : {
                val : '',
                isChecked : false,
                isAvailable : false
            },
            user_input_name : {
                val : '',
                isChecked : false,
                isAvailable : false
            },
            user_input_nick : {
                val : '',
                isChecked : false,
                isAvailable : false
            },
            user_input_pw : {
                val : '',
                isChecked : false,
                isAvailable : false
            }
        }
    }

    _handleOnInputChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id] : {
                ...this.state[e.target.id],
                val : e.target.value,
                isChecked : false
            }
        })
    }

    _handleOnInputBlur = (e) => {
        switch(e.target.id){
            case "user_input_id":
                this.props.fetchJoinCheckId(this.state.user_input_id.val, (response) => {
                    if(response.isAvailable === true){
                        this.setState({
                            ...this.state,
                            user_input_id : {
                                ...this.state.user_input_id,
                                isChecked : true,
                                isAvailable : true
                            }
                        })                
                    } else {
                        this.setState({
                            ...this.state,
                            user_input_id : {
                                ...this.state.user_input_id,
                                isChecked : true,
                                isAvailable : false
                            }
                        })
                    }
                })            
            break
            case "user_input_name":
                if(this.state.user_input_name.val.length > 1){
                    this.setState({
                        ...this.state,
                        user_input_name : {
                            ...this.state.user_input_name,
                            isChecked : true,
                            isAvailable : true
                        }
                    })
                } else {
                    this.setState({
                        ...this.state,
                        user_input_name : {
                            ...this.state.user_input_name,
                            isChecked : true,
                            isAvailable : false
                        }
                    })                    
                }
            break
            case "user_input_nick":
                this.props.fetchJoinCheckNick(this.state.user_input_nick.val, (response) => {
                    if(response.isAvailable === true){
                        this.setState({
                            ...this.state,
                            user_input_nick : {
                                ...this.state.user_input_nick,
                                isChecked : true,
                                isAvailable : true
                            }
                        })                   
                    } else {
                        this.setState({
                            ...this.state,
                            user_input_nick : {
                                ...this.state.user_input_nick,
                                isChecked : true,
                                isAvailable : false
                            }
                        })                
                    }
                })            
            break
            case "user_input_pw":
                if(this.state.user_input_pw.val.length > 5){
                    this.setState({
                        ...this.state,
                        user_input_pw : {
                            ...this.state.user_input_pw,
                            isChecked : true,
                            isAvailable : true
                        }
                    })
                } else {
                    this.setState({
                        ...this.state,
                        user_input_pw : {
                            ...this.state.user_input_pw,
                            isChecked : true,
                            isAvailable : false
                        }
                    })                    
                }            
            break
        }
    }

    _handleOnJoinSubmit = (e) => {
        e.preventDefault();
        let { user_input_id, user_input_name, user_input_nick, user_input_pw } = this.state
        if(
            user_input_id.val === '' ||
            user_input_name.val === '' ||
            user_input_nick.val === '' ||
            user_input_pw.val === ''
        ){
            console.warn('미입력값 존재')
            //done
        } else {
            console.log('모든값 입력')
            this.props.fetchJoin(
                user_input_id.val, 
                user_input_name.val, 
                user_input_nick.val, 
                user_input_pw.val
            )
        }
    }

    render(){
        //&& this.state.user_input_id.val !== '' 
        return(
            <div id="joinForm-container">
                <img className="loginForm-logoImg" src={logoImg}/>
                <form>
                    <div>
                        <input className="joinForm-input" id="user_input_id" onChange={this._handleOnInputChange} onBlur={this._handleOnInputBlur} onFocus={this._handleOnInputFocus} placeholder="아이디" type="text"/>
                        {this.state.user_input_id.isChecked === true && 
                            <img className="joinForm-mark" src={this.state.user_input_id.isAvailable === true ? markYesImg : markNoImg }/>
                        }
                    </div>
                    <div>
                        <input className="joinForm-input" id="user_input_name" onChange={this._handleOnInputChange} onBlur={this._handleOnInputBlur} onFocus={this._handleOnInputFocus} placeholder="이름" type="text"/>
                        {this.state.user_input_name.isChecked === true &&
                            <img className="joinForm-mark" src={this.state.user_input_name.isAvailable === true ? markYesImg : markNoImg }/>   
                        }
                    </div>
                    <div>
                        <input className="joinForm-input" id="user_input_nick" onChange={this._handleOnInputChange} onBlur={this._handleOnInputBlur} onFocus={this._handleOnInputFocus} placeholder="닉네임" type="text"/>                        
                        {this.state.user_input_nick.isChecked === true &&
                            <img className="joinForm-mark" src={this.state.user_input_nick.isAvailable === true ? markYesImg : markNoImg }/>
                        }
                    </div>
                    <div>
                        <input className="joinForm-input" id="user_input_pw" onChange={this._handleOnInputChange} onBlur={this._handleOnInputBlur} onFocus={this._handleOnInputFocus} placeholder="비밀번호" type="password"/>
                        {this.state.user_input_pw.isChecked === true &&
                            <img className="joinForm-mark" src={this.state.user_input_pw.isAvailable === true ? markYesImg : markNoImg }/>
                        }
                    </div>
                    <input 
                        disabled={
                            this.state.user_input_id.val === '' ||
                            this.state.user_input_name.val === '' ||
                            this.state.user_input_nick.val === '' ||
                            this.state.user_input_pw.val === '' ||
                            this.props.isFetching === true
                                ? true
                                : false
                        } 
                        id="joinForm-btnSubmit" onClick={this._handleOnJoinSubmit} type="submit" value="가입"/>                  
                </form>
            </div>
        )
    }
}

export default JoinForm