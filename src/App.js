import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux"
import Header from "./components/Header"
import './App.scss';
import logo from "./assets/hepsiburada-logo.png"
import {useDispatch} from "react-redux";
import Filter from "./components/Filter";
import ProductCard from "./components/ProductCard";
import Order from "./components/Order";
import Pagination from "./components/Pagination";
import {setFilter, setOrder} from "./store/storeSlice";
import {PRODUCTS} from "./products";


const App = () => {
    const dispatch = useDispatch()
    const {
        store,
    } = useSelector((state) => state)
    const [colors, setColors] = useState([])
    const [brands, setBrands] = useState([])
    const [productList, setProductList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [renderList, setRenderList] = useState([])
    const [selectedPage, setSelectedPage] = useState(1)

    const getColors = (list) => {
        const arr = []
        list.forEach((item) => {
            if (arr.filter((x) => x.label === item.color).length === 0) {
                arr.push({label: item.color, count: 1})
            } else {
                arr.filter((x) => x.label === item.color)[0].count++
            }
        })
        setColors(arr)
    }

    const getBrands = (list) => {
        const arr = []
        list.forEach((item) => {
            if (arr.filter((x) => x.label === item.brand).length === 0) {
                arr.push({label: item.brand, count: 1})
            } else {
                arr.filter((x) => x.label === item.brand)[0].count++
            }
        })
        setBrands(arr)
    }

    const onFilterItemClick = (label, key) => {
        if (key === "color") {
            dispatch(setFilter({color: label === store.filter.color ? "" : label, brand: store.filter.brand}))
        } else {
            dispatch(setFilter({color: store.filter.color, brand: label === store.filter.brand ? "" : label}))
        }
    }

    const scrollToTop = () => {
        const el = document.getElementById("myHeader")
        if (el) {
            el.scrollIntoView({
                inline: "center",
                behavior: "smooth",
                block: "center",
            })
        }
    }

    const makeOrder = (orderText) => {
        let arr = []
        if (filteredList.length > 0) {
            arr = [...filteredList]
        } else {
            arr = [...productList]

        }
        if (orderText === "new") {
            arr = arr.sort((a, b) => (new Date(a.date) >= new Date(b.date)) ? -1 : 1)
            setProductList(arr)
        } else if (orderText === "old") {
            arr = arr.sort((a, b) => (new Date(a.date) >= new Date(b.date)) ? 1 : -1)
            setProductList(arr)
        } else if (orderText === "low") {
            arr = arr.sort((a, b) => (parseInt(a.price) - parseInt(b.price)))
            setProductList(arr)
        } else if (orderText === "high") {
            arr = arr.sort((a, b) => (parseInt(b.price) - parseInt(a.price)))
            setProductList(arr)
        }
    }

    useEffect(() => {
        let arr = []
        if (filteredList.length > 0) {
            arr = [...filteredList]
        } else {
            arr = [...productList]

        }
        if (store.filter.color !== "") {
            arr = arr.filter((x) => x.color === store.filter.color)
        } else {
            arr = [...productList]
            arr = arr.filter((x) => x.brand === store.filter.brand)
        }
        if (store.filter.brand !== "") {
            arr = arr.filter((x) => x.brand === store.filter.brand)
        } else {
            arr = [...productList]
            arr = arr.filter((x) => x.color === store.filter.color)
        }
        setFilteredList(arr)
    }, [store.filter]);


    useEffect(() => {
        if (filteredList.length > 0) {
            setRenderList(filteredList.slice((selectedPage - 1) * 12, selectedPage * 12))
            getColors(filteredList)
            getBrands(filteredList)
        } else if (productList.length > 0) {
            setRenderList(productList.slice((selectedPage - 1) * 12, selectedPage * 12))
            getColors(productList)
            getBrands(productList)
        }
    }, [filteredList])

    useEffect(() => {
        if (productList.length > 0) {
            setRenderList(productList.slice((selectedPage - 1) * 12, selectedPage * 12))
        }
    }, [productList])

    useEffect(() => {
        if (store.searchText.length > 2) {
            let arr = [...productList]
            arr = arr.filter((x) => x.name.includes(store.searchText))
            if (arr.length > 0) {
                setFilteredList(arr)
            } else {
                setRenderList([])
            }
        } else if (renderList.length === 0) {
            setFilteredList([])
        }

    }, [store.searchText])

    useEffect(() => {
        makeOrder(store.order)
    }, [store.order])

    useEffect(() => {
        let arr = []
        if (filteredList.length > 0) {
            arr = [...filteredList]
        } else {
            arr = [...productList]
        }
        arr = arr.slice((selectedPage - 1) * 12, selectedPage * 12)
        setRenderList(arr)
        scrollToTop()
    }, [selectedPage])

    useEffect(() => {
        if (store.searchText.length > 2) {
            dispatch(setFilter({color: "", brand: ""}))
        }
    }, [store.searchText]);


    useEffect(() => {
        if (!localStorage.getItem("products")) {
            localStorage.setItem("products", JSON.stringify(PRODUCTS))
        }
        setProductList(JSON.parse(localStorage.getItem("products")))

        getColors(JSON.parse(localStorage.getItem("products")))
        getBrands(JSON.parse(localStorage.getItem("products")))
        setRenderList(productList.slice((selectedPage - 1) * 12, selectedPage * 12))
    }, [])

    return (
        <div className="App">
            <Header id="myHeader" logo={logo}/>
            <div className="content-container">
                <div className="content-header-row">
                    <div className="content-header-title">
                        <h1>Title</h1>
                        <h2>Aranan Kelime: <span>{store.searchText.length > 2 && store.searchText}</span></h2>
                    </div>
                    <Order optionOnClick={(order) => {
                        dispatch(setOrder(order))
                    }} title={store.order}/>
                </div>
                <div className="content-body">
                    <div className="content-left">
                        <Filter key="color" onItemClick={(label) => onFilterItemClick(label, "color")} options={colors}
                                header="Renk"/>
                        <Filter key="brand" onItemClick={(label) => onFilterItemClick(label, "brand")} options={brands}
                                header="Marka"/>
                        <div className="filter-container">
                            <h1>Sırala</h1>
                            {["low", "high", "new", "old"].map((item) => <span
                                style={{textDecoration: store.order === item && "underline"}}
                                onClick={() => dispatch(setOrder(item))}>{item}</span>)}
                        </div>
                    </div>
                    <div className="content">
                        <div className="content-items">
                            {renderList.map(item => <ProductCard product={item}/>)}
                        </div>
                        <Pagination
                            setPageNumber={(page) => setSelectedPage(page)}
                            totalPage={renderList.length === 0 ? 0 : (filteredList.length > 0 ? parseInt(filteredList.length / 12) + 1 : parseInt(productList.length / 12) + 1)}
                            nextPage={() => {
                                if (selectedPage < (renderList.length === 0 ? 0 : (filteredList.length > 0 ? parseInt(filteredList.length / 12) + 1 : parseInt(productList.length / 12) + 1)))
                                    setSelectedPage(selectedPage + 1)
                            }}
                            backPage={() => {
                                if (selectedPage > 1) {
                                    setSelectedPage(selectedPage - 1)
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
