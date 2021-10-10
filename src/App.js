import Header from "./components/Header"
import './App.scss';
import logo from "./assets/hepsiburada-logo.png"
import {useEffect, useState} from "react";
import Filter from "./components/Filter";
import ProductCard from "./components/ProductCard";

const prodcuts = [{
    id: "1",
    name: "iphone 12 pro max",
    price: "11000",
    imgUrl: "ip11Red.jpeg",
    brand: "apple",
    color: "black",
    oldPrice: "12000"
}, {
    id: "2",
    name: "iphone 13 pro max",
    price: "14000",
    imgUrl: "ip12Pink.jpeg",
    brand: "apple",
    color: "black",
    oldPrice: "15000"
}, {
    id: "3",
    name: "iphone 13 pro max",
    price: "14000",
    imgUrl: "ip11Blck.jpeg",
    brand: "apple",
    color: "beyaz",
    oldPrice: "15000"
},
    {
        id: "4",
        name: "iphone 12 pro max",
        price: "11000",
        imgUrl: "ip12Pink.jpeg",
        brand: "apple",
        color: "pembe",
        oldPrice: "15000"
    },]

const App = () => {
    const [colors, setColors] = useState([])
    const [brands, setBrands] = useState([])

    const getColors = () => {
        const arr = []
        prodcuts.forEach((item) => {
            if (arr.filter((x) => x.label === item.color).length === 0) {
                arr.push({label: item.color, count: 1})
            } else {
                arr.filter((x) => x.label === item.color)[0].count++
            }
        })
        setColors(arr)
    }

    const getBrands = () => {
        const arr = []
        prodcuts.forEach((item) => {
            if (arr.filter((x) => x.label === item.brand).length === 0) {
                arr.push({label: item.brand, count: 1})
            } else {
                arr.filter((x) => x.label === item.brand)[0].count++
            }
        })
        setBrands(arr)
    }

    const onItemClick = (label) => {
        console.log(label)
    }

    useEffect(() => {
        getColors()
        getBrands()
    }, [])

    return (
        <div className="App">
            <Header logo={logo}/>
            <div className="content-container">
                <div className="content-header-row">
                    <div className="content-header-title">
                        <h1>TİTLE</h1>
                        <h2>Aranan Kelime: <span>ihopne 11</span></h2>
                    </div>
                    <div className="content-header-order">ORDER</div>
                </div>
                <div className="content-body">
                    <div className="content-left">
                        <Filter onItemClick={(label) => onItemClick(label)} options={colors} header="Renk" />
                        <Filter onItemClick={(label) => onItemClick(label)} options={brands} header="Marka" />
                    </div>
                    <div className="content-items">
                        {prodcuts.map(item => <ProductCard product={item}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
