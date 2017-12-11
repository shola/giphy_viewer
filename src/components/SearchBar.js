import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onChange }) => (
    <div>
        <label for="search">Search: </label>
        <input className="search-bar" id="search" onChange={onChange} />
    </div>
);

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default SearchBar;
