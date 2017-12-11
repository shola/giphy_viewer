import { combineReducers } from 'redux';
import { FILTER_GIPHYS, RECEIVE_GIFS, REQUEST_GIFS, SELECT_GIPHY } from '../actions';

const selectedGiphy = (state = {}, action) => {
    switch (action.type) {
        case SELECT_GIPHY:
            return action.img ? action.img : {};
        default:
            return state;
    }
};

const giphy = (
    state = {
        isFetchingGifs: false,
        images: {}
    },
    action
) => {
    switch (action.type) {
        case REQUEST_GIFS:
            return { ...state, isFetchingGifs: true };
        case RECEIVE_GIFS:
            return { ...state, isFetchingGifs: false, images: action.images };
        default:
            return state;
    }
};

const searchTerm = (state = '', action) => {
    switch (action.type) {
        case FILTER_GIPHYS:
            return action.searchTerm;
        default:
            return state;
    }
};

// By convention, these reducers should map directly to state attributes.
// However, mapToProps ultimately decides how the container component will
// receive the props from the store.
const rootReducer = combineReducers({
    giphy,
    selectedGiphy,
    searchTerm
});

export default rootReducer;
