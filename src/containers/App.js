import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGifs, selectGiphy, filterGiphys } from '../actions';
import Tile from '../components/Tile';
import FeaturedTile from '../components/FeaturedTile';

class App extends Component {
    static propTypes = {
        isFetchingGifs: PropTypes.bool.isRequired,
        images: PropTypes.Object,
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

    handleGifClick = e => {
        e.preventDefault();

        const img = this.props.images[e.target.id];
        this.props.dispatch(selectGiphy(img));
    };

    render() {
        const { selectedGiphy, searchTerm, images } = this.props;
        return (
            <div>
                {selectedGiphy.id ? (
                    <FeaturedTile
                        {...selectedGiphy}
                        id={selectedGiphy.id}
                        url={selectedGiphy.previewUrl}
                    />
                ) : (
                    <div />
                )}
                <input onChange={this.handleSearch} />
                {Object.values(images).map(img => {
                    if (!searchTerm || img.title.indexOf(searchTerm) >= 0) {
                        return (
                            <Tile
                                key={img.id}
                                {...img}
                                onClick={this.handleGifClick.bind(this)}
                            />
                        );
                    }
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { selectedGiphy, searchTerm, giphy } = state;
    const { images = {}, isFetchingGifs } = giphy;

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
