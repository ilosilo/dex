import initialState from "../initialState";
import * as actionTypes from "../actions/actionTypes";

export default function visibilityReducer(state = initialState, action) {
    var newMode;
    switch (action.type) {
        case actionTypes.VISIBILITY_INFO:
            newMode = action.payload;
            return { ...state, infoVisible: newMode };
        default:
            return state;
    }
}