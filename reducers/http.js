import * as types from '../actions/http'

const initialState = {
    user: null,
};
export default function http(state = initialState, action = {}) {

    switch (action.type) {
        case types.LOGIN:
            return Object.assign({}, state, { user: action.payload });
        default:
            return state;
    }
}