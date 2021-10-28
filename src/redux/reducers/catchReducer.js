import initialState from "../initialState";
import * as actionTypes from "../actions/actionTypes";

export default function catchReducer(state = initialState, action) {
  var newCaughtpokis;
  switch (action.type) {
    case actionTypes.POKI_ADD:
      newCaughtpokis = [...state.caughtpokis, action.payload];
      return { caughtpokis: newCaughtpokis };
    case actionTypes.POKI_REMOVE:
      newCaughtpokis = state.caughtpokis.filter((poki) => poki !== action.payload);
      return { caughtpokis: newCaughtpokis };
    default:
      return state;
  }
}
