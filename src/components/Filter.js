import React from "react"
import "./Filter.scss"
import {useSelector} from "react-redux";

const Filter = ({header, options, onItemClick}) => {
    const {
        store,
    } = useSelector((state) => state)

    const state = header === "Renk" ? store.filter.color : store.filter.brand

    return (
        <>
            <div className="filter-container">
                <h1>{header}</h1>
                {options.map((item) => <span style={{textDecoration: state === item.label && "underline"}}
                                             onClick={() => onItemClick(item.label)}>{item.label} ({item.count})</span>)}
            </div>
        </>
    )
}

export default Filter
