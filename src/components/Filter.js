import React from "react"
import "./Filter.scss"

const Filter = ({header, options, onItemClick}) => {
    return (
        <>
            <div className="filter-container">
                <h1>{header}</h1>
                {options.map((item) => <span onClick={() => onItemClick(item.label)}>{item.label} ({item.count})</span>)}
            </div>
        </>
    )
}

export default Filter