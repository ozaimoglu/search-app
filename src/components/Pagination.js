import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import "./Pagination.scss"

const Pagination = ({totalPage, setPageNumber, backPage, nextPage}) => {

    const renderPageButtons = () => {
        const items = []
        for (let i = 0; i < totalPage; i++) {
            items.push(
                <button className="page-button" onClick={() => setPageNumber(i+1)}>{i+1}</button>
            )
        }
        return items
    }

    return(
        <>
            <div className="pagination-container">
                <button onClick={backPage} className="page-button"><FontAwesomeIcon icon={faArrowLeft}/></button>
                {renderPageButtons()}
                <button onClick={nextPage} className="page-button"><FontAwesomeIcon icon={faArrowRight}/></button>
            </div>
        </>
    )
}

export default Pagination
