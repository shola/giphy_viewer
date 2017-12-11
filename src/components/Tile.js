import React from 'react';
import PropTypes from 'prop-types';
import './Tile.css';

const Tile = props => {
    if (!props.searchTerm || props.title.indexOf(props.searchTerm) >= 0) {
        return (
            <img
                className="tile"
                key={props.id}
                id={props.id}
                src={props.previewUrl}
                alt={props.title}
            />
        );
    } else {
        return <img alt={''} />;
    }
};

Tile.propTypes = {
    id: PropTypes.string.isRequired,
    mp4: PropTypes.string,
    previewUrl: PropTypes.string.isRequired,
    sourceUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trending_datetime: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    searchTerm: PropTypes.string
};

export default Tile;
