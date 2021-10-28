import initialState from "../initialState";
import * as actionTypes from "../actions/actionTypes";

export default function starReducer(state = initialState, action) {
  var newStarredPokis;
  switch (action.type) {
    case actionTypes.POKI_STAR:
      newStarredPokis = [...state.starredpokis, action.payload];
      return { starredpokis: newStarredPokis};
    case actionTypes.POKI_UNSTAR:
      newStarredPokis = state.starredpokis.filter((poki) => poki !== action.payload);
      return { starredpokis: newStarredPokis};

    default:
      return state;
  }
}
