import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

// This component has no state! it's props are handled by redux,
// so there is no need to have state local to the container
class App extends Component {
    // this.props has the entire redux state in it, plus the dispatch method
    // Because of the react-redux connect function?
    static propTypes = {
        selectedSubreddit: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        debugger;
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
            const { dispatch, selectedSubreddit } = nextProps;
            dispatch(fetchPostsIfNeeded(selectedSubreddit));
        }
    }

    handleChange = nextSubreddit => {
        debugger;
        this.props.dispatch(selectSubreddit(nextSubreddit));
    };

    handleRefreshClick = e => {
        debugger;
        e.preventDefault();

        const { dispatch, selectedSubreddit } = this.props;
        dispatch(invalidateSubreddit(selectedSubreddit));
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    };

    render() {
        const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
        const isEmpty = posts.length === 0;
        debugger;
        return (
            <div>
                <Picker
                    value={selectedSubreddit}
                    onChange={this.handleChange}
                    options={['reactjs', 'frontend']}
                />
                <p>
                    {lastUpdated && (
                        <span>
                            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
                        </span>
                    )}
                    {!isFetching && (
                        <button onClick={this.handleRefreshClick}>Refresh</button>
                    )}
                </p>
                {isEmpty ? (
                    isFetching ? (
                        <h2>Loading...</h2>
                    ) : (
                        <h2>Empty.</h2>
                    )
                ) : (
                    <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                        <Posts posts={posts} />
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { selectedSubreddit, postsBySubreddit } = state;
    const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
        selectedSubreddit
    ] || {
        isFetching: true,
        items: []
    };
    debugger;
    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    };
};
debugger;
// connect this redux store to the app.
// now App must be wrapped in a <Provider store={store}> node
export default connect(mapStateToProps)(App);
