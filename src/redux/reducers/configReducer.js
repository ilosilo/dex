import initialState from "../initialState";
import * as actionTypes from "../actions/actionTypes";

export default function configReducer(state = initialState, action) {
    var newSet;
    switch (action.type) {
        case actionTypes.SET_LANG:
            newSet = action.payload;
            return { ...state, language: newSet };
        default:
            return state;
    }
}