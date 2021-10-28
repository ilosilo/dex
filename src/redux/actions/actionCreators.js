import * as actionTypes from "./actionTypes";

export const infoVisibility = (mode) => ({ type: actionTypes.VISIBILITY_INFO, payload: mode })

export const pokiAdd = (poki) => ({ type: actionTypes.POKI_ADD, payload: poki })
export const pokiRemove = (poki) => ({ type: actionTypes.POKI_REMOVE, payload: poki })

export const pokiStar = (poki) => ({ type: actionTypes.POKI_STAR, payload: poki })
export const pokiUnstar = (poki) => ({ type: actionTypes.POKI_UNSTAR, payload: poki })

export const ballAdd = (ball) => ({ type: actionTypes.BALL_ADD, payload: ball })
export const ballRemove = (ball) => ({ type: actionTypes.BALL_REMOVE, payload: ball })
export const goldAdd = (gold) => ({ type: actionTypes.GOLD_ADD, payload: gold })
export const goldRemove = (gold) => ({ type: actionTypes.GOLD_REMOVE, payload: gold })

//config actions: 
export const setLang = (set) => ({ type: actionTypes.SET_LANG, payload: set })


