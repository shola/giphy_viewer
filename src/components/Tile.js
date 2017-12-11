import React from 'react';
import PropTypes from 'prop-types';
import './Tile.css';

function doShowTile(searchTerm, title) {
    return !searchTerm || title.indexOf(searchTerm) >= 0;
}

const Tile = ({ searchTerm, title, id, previewUrl }) => {
    if (doShowTile(searchTerm, title)) {
        return <img className="tile" key={id} id={id} src={previewUrl} alt={title} />;
    } else {
        return <img alt={''} />;
    }
};

Tile.propTypes = {
    id: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    sourceUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trending_datetime: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    searchTerm: PropTypes.string
};

export default Tile;
