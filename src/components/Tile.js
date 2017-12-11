import React from 'react';
import PropTypes from 'prop-types';

const Tile = props => {
    return (
        <div onClick={props.onClick}>
            <img key={props.id} id={props.id} src={props.previewUrl} alt={props.title} />
        </div>
    );
};

Tile.propTypes = {
    id: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    sourceUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trending_datetime: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

export default Tile;
