import * as types from '../actions/home'

const initialState = {
    number: 0,
};
export default function home(state = initialState, action = {}) {

    switch (action.type) {
          case types.HOME_ADD:
            return Object.assign({}, state, { number: action.payload });   
             case types.HOME_SUD:
            return Object.assign({}, state, { number: action.payload });   
        default:
            return state;
    }
}