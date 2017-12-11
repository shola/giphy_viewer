import apiKey from '../api_key';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const RECEIVE_GIFS = 'RECEIVE_GIFS';
export const SELECT_GIPHY = 'SELECT_GIPHY';
export const FILTER_GIPHYS = 'FILTER_GIPHYS';

export const filterGiphys = searchTerm => ({
    type: FILTER_GIPHYS,
    searchTerm
});

export const selectGiphy = img => ({
    type: SELECT_GIPHY,
    img
});

export const requestGifs = () => ({
    type: REQUEST_GIFS
});

export const receiveGifs = json => {
    const images = {};
    json.data.forEach(d => {
        images[d.id] = {
            id: d.id,
            previewUrl: d.images.preview_gif.url,
            mp4: d.images.original.mp4,
            sourceUrl: d.source_post_url,
            title: d.title,
            trending_datetime: d.trending_datetime,
            username: d.username
        };
    });
    return {
        type: RECEIVE_GIFS,
        images
    };
};

// Async action creator
export const fetchGifs = () => dispatch => {
    dispatch(requestGifs());

    return fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
        .then(response => response.json())
        .then(json => dispatch(receiveGifs(json)));
};
