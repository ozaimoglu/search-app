import React, {useState} from "react"
import {useDispatch} from "react-redux";
import "./ProductCard.scss"
import {setCartSize} from "../store/storeSlice";

const ProductCard = ({product}) => {
    const [isClicked, setIsClicked] = useState(false)
    const dispatch = useDispatch()

    const cardOnClick = () => {
        setIsClicked(!isClicked)
    }

    return (
        <>
            <div onClick={() => {
                cardOnClick()
            }} className="card-container">
                <img src={product.imgUrl}/>
                <div className="card-description">
                    <h1>{product.name}</h1>
                    {!isClicked ?
                        (<>
                            <div><span>Marka:</span> {product.brand}</div>
                            <div><span>Renk:</span> {product.color}</div>
                            <div className="price">{product.price} TL</div>
                            <div className="old-price-row">
                                <span className="old-price">{product.oldPrice} TL</span>
                                <span
                                    className="sale">{100 - Math.round(product.price * 100 / product.oldPrice)}%</span>
                            </div>
                        </>) : !localStorage.getItem("cart") || Object.keys(JSON.parse(localStorage.getItem("cart"))).indexOf(product.id) < 0 ? (
                            <>
                                <button onClick={() => {
                                    let arr = JSON.parse(localStorage.getItem("cart"))
                                    if (arr === null) {
                                        arr = {}
                                    }
                                    if (!arr[product.id]) {
                                        arr[product.id] = product
                                        arr[product.id].cartDate = Date.now()
                                        dispatch(setCartSize(Object.keys(arr).length))
                                        localStorage.setItem("cart", JSON.stringify(arr))
                                    }
                                }} className={"add-button"}>Sepete Ekle
                                </button>
                            </>
                        ) : (
                            <>
                                <button className={"remove-button"}>Bu ürünü sepete ekleyemezsiniz
                                </button>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ProductCard
