
export const HOME_ADD = 'HOME_ADD';
export const HOME_SUD = 'HOME_SUD';
import HttpClient from '../api/httpClient'
//加
export function add(number) {
    return content(number+1, HOME_ADD)
}

//减
export function sub(number) {
   return content(number-1, HOME_SUD)
}

export function content(data, type) {
    return {
        type: type,
        payload: data
    }
}