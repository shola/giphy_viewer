import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import './Tiles.css';

const Tiles = ({ images, searchTerm }) => (
    <div className="tiles">
        {Object.values(images).map(img => (
            <Tile key={img.id} {...img} searchTerm={searchTerm} />
        ))}
    </div>
);

Tiles.propTypes = {
    images: PropTypes.object.isRequired,
    searchTerm: PropTypes.string
};

export default Tiles;
