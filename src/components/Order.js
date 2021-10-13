import React, {useState} from "react"
import "./Order.scss"

const Order = ({title, optionOnClick}) => {
    const [showContent, setShowContent] = useState(false)

    return (
        <>
            <div className="order-container">
                <button onClick={() => setShowContent(!showContent)} className="order-button">{title}</button>
                {showContent && <div id="myOrder" className="order-content">
                    <div onClick={() => {
                        setShowContent(false)
                        optionOnClick("low")
                    }} className="order-item">En Düşük Fiyat
                    </div>
                    <div onClick={() => {
                        setShowContent(false)
                        optionOnClick("high")
                    }} className="order-item">En Yüksek Fiyat
                    </div>
                    <div onClick={() => {
                        setShowContent(false)
                        optionOnClick("new")
                    }} className="order-item">En Yeniler(A>Z)
                    </div>
                    <div onClick={() => {
                        setShowContent(false)
                        optionOnClick("old")
                    }} className="order-item">En Yeniler(Z>A)
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Order
