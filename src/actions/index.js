import apiKey from '../api_key'; // your private Giphy API Key
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

    // saving the images by their ID makes it easy to access them from the container
    json.data.forEach(d => {
        images[d.id] = {
            id: d.id,
            previewUrl: d.images.fixed_height.url,
            mp4: d.images.original_mp4.mp4,
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
    // let redux know the request has started
    dispatch(requestGifs());

    // the last dispatch lets redux know that gifs are received and the request is done
    return fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
        .then(response => response.json())
        .then(json => dispatch(receiveGifs(json)));
};
