import { combineReducers } from 'redux'
import http from './http'
import home from './home'



export default combineReducers({
  http,
  home
})
