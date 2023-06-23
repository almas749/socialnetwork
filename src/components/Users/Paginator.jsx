import { useState, useEffect } from 'react';
import './Users.css';

const Paginator = ({ totalUsersCount, pageSize, currentPage, onChangePage, portionSize = 10 }) => {

    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let index = 1; index <= pagesCount; index++) {
        pages.push(index);
    }

    const activePage = "page-num page-num--selected";
    const normalPage = "page-num";

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    let slicedPages = pages
        .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber);

    useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage]);

    return (
        <div className="users-page-changer">
            {
                portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>
            }
            {
                slicedPages.map((page, i) => (
                    <span
                        key={i}
                        className={currentPage === page ? activePage : normalPage}
                        onClick={() => onChangePage(page)}>
                        {page} </span>
                ))
            }
            {
                portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>
            }
        </div>
    );

}

export default Paginator;