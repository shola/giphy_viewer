import React from 'react';
import PropTypes from 'prop-types';

const FeaturedTile = props => {
    return (
        <dialog open>
            <video src={props.mp4} alt={props.title} autoPlay={true} controls />
        </dialog>
    );
};

FeaturedTile.propTypes = {
    id: PropTypes.string.isRequired,
    mp4: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    sourceUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trending_datetime: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

export default FeaturedTile;
