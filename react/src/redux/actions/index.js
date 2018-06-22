import * as types from './ActionTypes.js'
//action creator
export const login_success = (user_id, user_nick, user_name, user_profilePhotoUrl) => {
    return { type : types.LOGIN_SUCCESS, id : user_id, nick : user_nick, name : user_name, profilePhotoUrl : user_profilePhotoUrl}
}
export const logout_success = () => {
    return { type : types.LOGOUT_SUCCESS}
}
export const profile_add_photo = (url) => {
    return { type : types.PROFILE_ADD_PHOTO, url : url}
}