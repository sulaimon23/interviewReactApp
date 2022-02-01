import React, { useState } from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage, setPostPerPage }) => {
    const pageNumbers = [];
    const [activePage, setActivePage] = useState(1)
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    const setPageNumbers = (number) => {
        paginate(number)
        setActivePage(number)
    }
    const setPrev = () => {
        if (activePage > 1) {
            paginate(activePage - 1)
            setActivePage(activePage - 1)
        }
    }
    const setNext = () => {
        if (activePage < Math.ceil(totalPosts / postsPerPage)) {
            paginate(activePage + 1)
            setActivePage(activePage + 1)
        }
    }
    return (
        <div className="p-3 flex justify-between items-center">
            <div className="flex justify-between" >
                <select onChange={(e) => setPostPerPage(parseInt(e.target.value))} defaultValue={postsPerPage} className='focus:outline-none border p-0.5 mr-1 rounded' >
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                </select>
                <p className="text-gray-500">{activePage} of {Math.ceil(totalPosts / postsPerPage)}</p>
            </div>
            <ul className="flex items-center ">
                <li>
                    <a onClick={() => setPrev()} className="block mr-2 py-1.5 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </a>
                </li>
                <li className="rounded-lg overflow-hidden border w-full border-gray-700 flex justify-between h-full " >
                    {pageNumbers.map(number => (
                        <a key={number} onClick={() => setPageNumbers(number)} className={`${currentPage === number ? "" : "dark:bg-gray-800"} w-full py-2 h-full px-3  text-gray-500 bg-white  border-gray-300  hover:text-gray-700  dark:border-gray-700 dark:text-gray-400  dark:hover:text-gray-700`}>{number}</a>
                    ))}
                </li>
                <li>
                    <a onClick={() => setNext()} className="block ml-2 py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;