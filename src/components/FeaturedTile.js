import React from 'react';
import PropTypes from 'prop-types';

const FeaturedTile = props => {
    if (props.id !== undefined) {
        const style = { position: 'absolute', top: props.y };
        return (
            <dialog className="featured-tile" style={style} open>
                <video src={props.mp4} alt={props.title} autoPlay={true} controls />
            </dialog>
        );
    } else {
        return (
            <dialog>
                <video />
            </dialog>
        );
    }
};

FeaturedTile.propTypes = {
    id: PropTypes.string,
    mp4: PropTypes.string,
    previewUrl: PropTypes.string,
    sourceUrl: PropTypes.string,
    title: PropTypes.string,
    trending_datetime: PropTypes.string,
    username: PropTypes.string
};

export default FeaturedTile;
