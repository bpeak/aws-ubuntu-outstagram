import * as types from '../actions/ActionTypes.js';

//디폴트스테이트
const defaultState = {
    isLoggedIn : false,
    isFetching_login : false,
    user : {
        _id : undefined,
        nick : undefined,
        name : undefined,
        profilePhotoUrl : undefined
    }
}
//리듀서
const reducer = (state = defaultState, action) => {
    if(action.type === types.LOGIN_SUCCESS ){
        return {
            ...state,
            isLoggedIn : true,
            user : {
                id : action.id,
                nick : action.nick,
                name : action.name,
                profilePhotoUrl : action.profilePhotoUrl
            }
        }
    } else if (action.type === types.LOGOUT_SUCCESS ){
        return {
            ...state,
            isLoggedIn : false
        }
    } else if (action.type === types.PROFILE_ADD_PHOTO ){
        return {
            ...state,
            user : {
                ...state.user,
                profilePhotoUrl : action.url
            }
        }
    } else {
        return state
    }
}

export default reducer

