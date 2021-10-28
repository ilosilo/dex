import initialState from "../initialState";
import * as actionTypes from "../actions/actionTypes";

export default function itemReducer(state = initialState, action) {
    var newCount;
    switch (action.type) {
        case actionTypes.BALL_ADD:
            newCount = state.balls + action.payload;
            return { ...state, balls: newCount };
        case actionTypes.BALL_REMOVE:
            newCount = state.balls - action.payload;
            return { ...state, balls: newCount };
        case actionTypes.GOLD_ADD:
            newCount = state.gold + action.payload;
            return { ...state, gold: newCount };
        case actionTypes.GOLD_REMOVE:
            newCount = state.gold - action.payload;
            return { ...state, gold: newCount };
        default:
            return state;
    }
}