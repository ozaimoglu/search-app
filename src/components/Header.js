import React from "react"
import PropTypes from "prop-types"
import "./Header.scss"
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import {setSearchText} from "../store/storeSlice";

const Header = ({id, logo, searchPlaceholder}) => {
    const dispatch = useDispatch()
    return (
        <>
            <div id={id} className="header-container">
                <div className="header-logo-container">
                    <img src={logo} alt=""/>
                </div>
                <div className="header-search-container">
                    <SearchBar onChange={(e) => {
                        dispatch(setSearchText(e.target.value))
                    }} placeholder={searchPlaceholder} icon={<FontAwesomeIcon icon={faSearch}/>}/>
                </div>
                <div className="header-cart-container">
                    <Dropdown title="Sepet"/>
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
