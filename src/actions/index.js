export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export const selectSubreddit = subreddit => ({
    type: SELECT_SUBREDDIT,
    subreddit
});

export const invalidateSubreddit = subreddit => ({
    type: INVALIDATE_SUBREDDIT,
    subreddit
});

export const requestPosts = subreddit => ({
    type: REQUEST_POSTS,
    subreddit
});

export const receivePosts = (subreddit, json) => ({
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
});

// Async action creator
// - function that takes a piece of the state, and dispatch function
const fetchPosts = subreddit => dispatch => {
    // dispatch a sync action, telling redux that an async action will start next
    debugger;
    dispatch(requestPosts(subreddit));
    debugger;
    // return a promise that, upon resolving, dispatches a sync action to redux
    // letting it know that the async work is done
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(subreddit, json)));
};

const shouldFetchPosts = (state, subreddit) => {
    const posts = state.postsBySubreddit[subreddit];
    if (!posts) {
        return true;
    }
    if (posts.isFetching) {
        return false;
    }
    return posts.didInvalidate;
};

// why does this async action creator also have a getState function?
export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
    debugger;
    if (shouldFetchPosts(getState(), subreddit)) {
        // what is the value that is returned by dispatch? why is it returned?
        return dispatch(fetchPosts(subreddit));
    }
};
