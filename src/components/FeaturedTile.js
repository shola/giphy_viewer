import React from 'react';
import PropTypes from 'prop-types';

const FeaturedTile = props => {
    return (
        <dialog open>
            <video src={props.mp4} alt={props.title} autoPlay={true} controls />
        </dialog>
    );
};

export default FeaturedTile;
