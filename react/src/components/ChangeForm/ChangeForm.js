import React from 'react'

import './ChangeForm.scss'

const ChangeForm = ({invertVia, isViaLogin}) => {
    return (
        <div id="ChangeForm-container">
            {isViaLogin === true
                ? <div>계정이 없으신가요? <a className="ChangeForm-btnInvert" onClick={invertVia}>가입하기</a></div>
                : <div>계정이 있으신가요? <a className="ChangeForm-btnInvert" onClick={invertVia}>로그인</a></div>
            }
        </div>
    )
}

export default ChangeForm