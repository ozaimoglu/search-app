import React from "react"
import PropTypes from "prop-types"
import "./Header.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SearchBar from "./SearchBar";

const Header = ({logo, cartButtonOnClick, cartCount, searchPlaceholder}) => {
    return (
        <>
            <div className="header-container">
                <div className="header-logo-container">
                    <img src={logo} alt=""/>
                </div>
                <div className="header-search-container">
                    <SearchBar placeholder={searchPlaceholder} icon={<FontAwesomeIcon icon={faSearch}/>} />
                </div>
                <div className="header-cart-container">
                    <button onClick={cartButtonOnClick}>Sepet</button>
                </div>
            </div>
        </>
    )
}

Header.propTypes = {
    logo: PropTypes.string,
    cartButtonOnClick: PropTypes.string,
    cartCount: PropTypes.string,
    searchPlaceholder: PropTypes.string,
}

Header.defaultProps = {
    logo: "",
    cartButtonOnClick: "",
    cartCount: "",
    searchPlaceholder: "25 milyon’dan fazla ürün içerisinde ara"
}

export default Header