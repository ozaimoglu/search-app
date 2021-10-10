import React, {useEffect, useState} from "react"
import "./ProductCard.scss"

const ProductCard = ({product, isAdded}) => {
    const [image, setImage] = useState("")
    const [isClicked, setIsClicked] = useState(false)

    const setImg = () => {
        import("../assets/" + product.imgUrl).then(res => {
            setImage(res.default)
        })
    }

    const cardOnClick = () => {
        setIsClicked(!isClicked)
    }

    useEffect(() => {
        setImg()
    }, [])

    return(
        <>
            <div onClick={() => {cardOnClick()}} className="card-container">
                <img src={image}/>
                <div className="card-description">
                    <h1>{product.name}</h1>
                    {!isClicked ?
                        (<>
                            <div><span>Marka:</span> {product.brand}</div>
                            <div><span>Renk:</span> {product.color}</div>
                            <div className="price">{product.price} TL</div>
                            <div className="old-price-row">
                                <span className="old-price">{product.oldPrice} TL</span>
                                <span className="sale">{100 - Math.round(product.price * 100 / product.oldPrice)}%</span>
                            </div>
                        </>) : (
                            <>
                                <button className={"add-button"}>Sepete Ekle</button>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ProductCard