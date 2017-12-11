import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGifs, selectGiphy, filterGiphys } from '../actions';
import FeaturedTile from '../components/FeaturedTile';
import Tiles from '../components/Tiles';

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
        e.preventDefault();
        const img = this.props.images[e.target.id];
        this.props.dispatch(selectGiphy(img));
    };

    render() {
        const { selectedGiphy, searchTerm, images } = this.props;
        return (
            <div>
                <FeaturedTile {...selectedGiphy} />
                <div className="app-body" onClick={this.handleClick}>
                    <input className="search-bar" onChange={this.handleSearch} />
                    <Tiles images={images} searchTerm={searchTerm} />
                </div>
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
