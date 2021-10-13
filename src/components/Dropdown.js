import React, {useState} from "react"
import {useSelector} from "react-redux"
import "./Dropdown.scss"
import {useDispatch} from "react-redux";
import {setCartSize} from "../store/storeSlice";

const Dropdown = ({title}) => {
    const dispatch = useDispatch()
    const {
        store,
    } = useSelector((state) => state)
    const [cartList, setCartList] = useState([])

    const sort = (json) => {
        var sortable = [];
        for (var obj in json) {
            sortable.push(json[obj]);
        }

        return sortable.sort((a, b) => (a.cartDate >= b.cartDate) ? -1 : 1)
    }


    const showDropdown = () => {
        setCartList(sort(JSON.parse(localStorage.getItem("cart"))))
        debugger
        document.getElementById("myDropdown").classList.toggle("show");
        document.getElementById("myButton").classList.toggle("show");
    }

    return (
        <>
            <div className="dropdown-container">
                <span className="count-tag">{store.cartSize}</span>
                <button id="myButton" className="dropdown-button" onClick={() => showDropdown()}>{title}</button>
                <div id="myDropdown" className="dropdown-content">
                    {cartList.map((item, index) => {
                        return (
                            <>
                                <div className="dropdown-content-item-container">
                                    <img className="dropdown-content-item-img" src={item.imgUrl}/>
                                    <div className="dropdown-content-detail-row">
                                        <span className="dropdown-content-detail-name">{item.name}</span>
                                        <button onClick={() => {
                                            let arr = JSON.parse(localStorage.getItem("cart"))
                                            delete arr[item.id]
                                            localStorage.setItem("cart", JSON.stringify(arr))
                                            dispatch(setCartSize(Object.keys(arr).length))
                                            setCartList(sort(JSON.parse(localStorage.getItem("cart"))))
                                        }} className="dropdown-content-detail-button">Kaldır
                                        </button>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Dropdown
