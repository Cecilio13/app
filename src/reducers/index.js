import { combineReducers } from 'redux';


const tokenReducer = (token = null, action) => {
    //console.log(action);
    if (action.type === 'AUTH_TOKEN') {
        return action.payload;
    }
    return token;
}

export default combineReducers({
    token: tokenReducer,

})