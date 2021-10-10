import React, {useState} from "react"
import PropTypes from "prop-types";
import "./SearchBar.scss"

const SearchBar = ({placeholder, icon, value, onChange}) => {
    return (
        <>
            <div className="searchbar-container">
                {icon}
                <input placeholder={placeholder} className="searchbar-input" value={value} onChange={onChange} />
            </div>
        </>
    )
}

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    icon: PropTypes.node,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

SearchBar.defaultTypes = {
    placeholder: "",
    icon: <></>,
    value: "",
    onChange: () => {}
}

export default SearchBar