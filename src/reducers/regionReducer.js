import * as ACTION_TYPE from '../actions/actionTypes'

const INITIAL_STATE = {
    regions: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPE.FETCH_REGIONS:
            return {
                ...state,
                regions: action.payload.result
            }
        default:
            return state;
    }
}