import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGifs, selectGiphy, filterGiphys } from '../actions';
import FeaturedTile from '../components/FeaturedTile';
import Tiles from '../components/Tiles';
import SearchBar from '../components/SearchBar';

class App extends Component {
    static propTypes = {
        isFetchingGifs: PropTypes.bool.isRequired,
        images: PropTypes.object,
        dispatch: PropTypes.func.isRequired,
        selectedGiphy: PropTypes.object
    };

    componentDidMount() {
        this.props.dispatch(fetchGifs());
    }

    componentWillReceiveProps(nextProps) {}

    handleSearch = e => {
        const searchTerm = e.target.value;
        this.props.dispatch(filterGiphys(searchTerm));
    };

    handleClick = e => {
        // an onclick listener on the entire body is needed, to facilitate hiding and showing the featuredTile
        e.preventDefault();

        const videoClicked = e.target.nodeName === 'VIDEO';
        if (videoClicked) {
            // don't dispatch an action, just use the video node's controls
        } else {
            const img = this.props.images[e.target.id];
            const y = e.target.y;
            this.props.dispatch(selectGiphy({ ...img, y }));
        }
    };

    render() {
        const { selectedGiphy, searchTerm, images } = this.props;
        return (
            <div>
                <div className="app-body" onClick={this.handleClick}>
                    <FeaturedTile {...selectedGiphy} />
                    <SearchBar onChange={this.handleSearch.bind(this)} />
                    <Tiles images={images} searchTerm={searchTerm} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // Whenever the store changes, update the props that are sent to the container
    const { selectedGiphy, searchTerm, giphyAPI } = state;
    const { images = {}, isFetchingGifs } = giphyAPI;

    return {
        selectedGiphy,
        images,
        isFetchingGifs,
        searchTerm
    };
};

// connect this redux store to the app.
// now App must be wrapped in a <Provider store={store}> node
export default connect(mapStateToProps)(App);
