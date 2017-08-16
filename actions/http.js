
export const LOGIN = 'LOGIN';
import HttpClient from '../api/httpClient'

//dengl
export function login(name,password) {
    return (dispatch) => {
        HttpClient.AjaxPost('/user/loginUser',{loginName:name,password:password}, list => {
            dispatch(content(list, LOGIN))
        })
    }
}
export function content(data, type) {
    return {
        type: type,
        payload: data
    }
}