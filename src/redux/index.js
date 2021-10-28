import { combineReducers } from "redux";
import visibilityReducer from "./reducers/visibilityReducer";
import starReducer from "./reducers/starReducer";
import catchReducer from "./reducers/catchReducer";
import itemReducer from "./reducers/itemReducer";
import configReducer from "./reducers/configReducer";

const reducers = combineReducers({
    visibilityReducer,
    starReducer,
    catchReducer,
    itemReducer,
    configReducer,
});

export default reducers;
