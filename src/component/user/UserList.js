import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getUser } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from "react-redux";
import { Modal } from '../modal/Modal';
import Pagination from '../Pagination'

// 
export const UserList = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const [users, setUsers] = useState(user)
    const [userData, setUserData] = useState()
    const [modalState, setModalState] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(5);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = users?.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    useEffect(() => {
        if (user !== null && user?.length !== users?.length) {
            setUsers(user)
        } else {
            setUsers(user)
            if (window.performance) {
                if (performance.navigation.type === 1 && user?.length === 0) {
                    dispatch(getUser())
                }
            }
        }
        if (!user) {
            dispatch(getUser())
        }
    }, [user])
    const showModal = (user) => {
        setUserData(user)
        setModalState(true)
    }

    const sortData = (e) => {
        let sortedData = users.sort(function (a, b) {
            return a.username.toLowerCase().localeCompare(b.username.toLowerCase())
        });
        if (parseInt(e) === 1) {
            let data = [...sortedData]
            setUsers(data)
        } else {
            let data = [...sortedData.reverse()]
            setUsers(data)
        }
    }
    return (
        <div className="mt-8" >
            {
                modalState && (<Modal setModalState={setModalState} user={userData} />)
            }
            <div className="rounded-lg shadow-md border">
                <div className="flex items-start justify-between p-3 border-b" >
                    <h2 className="text-lg font-semibold" >User List</h2>
                    <Link to="/add" >
                        <button className="submitButton  active:bg-red-600" style={{ marginTop: 0 }} >Add new</button>
                    </Link>
                </div>
                <div className="flex flex-col p-3">
                    <div className="overflow-x-auto  ">
                        <div className="inline-block h-full min-w-full ">
                            <div className="h-full overflow-hidden">
                                <table className="min-w-full  border-2 h-full">
                                    <thead className="bg-gray-200 h-20  border-b-8">
                                        <tr>
                                            <th scope="col" className="tableHeader">
                                                Id
                                            </th>
                                            <th scope="col" className="tableHeader">
                                                Name
                                            </th>
                                            <th scope="col" className="tableHeader">
                                                <div className="flex items-center" >
                                                    Username
                                                    <select defaultValue="" onChange={(e) => sortData(e.target.value)} className="ml-1 cursor-pointer rounded" >
                                                        <option value="" disabled ></option>
                                                        <option value="1">A-Z</option>
                                                        <option value="2">Z-A</option>
                                                    </select>
                                                </div>
                                            </th>
                                            <th scope="col" className="tableHeader">
                                                Email
                                            </th>
                                            <th scope="col" className="tableHeader">
                                                City
                                            </th>
                                            <th scope="col" className="tableHeader">
                                                Edit
                                            </th>
                                            <th scope="col" className="tableHeader">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users && currentPosts?.length > 0 && currentPosts.map((user, index) =>
                                                <tr key={index} className="bg-white h-20 border-t-8">
                                                    <td className="tableData">{user.id}</td>
                                                    <td className="tableData">
                                                        {user?.name?.toUpperCase()}
                                                    </td>
                                                    <td className="tableData">
                                                        {user?.username?.toUpperCase()}
                                                    </td>
                                                    <td className="tableData">
                                                        {user?.email?.toUpperCase()}
                                                    </td>
                                                    <td className="tableData">
                                                        {user?.address?.city?.toUpperCase()}
                                                    </td>
                                                    <td className="tableData">
                                                        <Link to={`/user/${user.id}`} >
                                                            <button className="bg-yellow-500 w-20 text-white text-sm rounded p-1  hover:bg-yellow-600" >edit</button>
                                                        </Link>
                                                    </td>
                                                    <td className="tableData">
                                                        <button onClick={() => showModal(user)} className="bg-red-700 w-20 text-white text-sm rounded p-1  hover:bg-red-600">delete</button>
                                                    </td>
                                                </tr>)
                                        }
                                    </tbody>
                                </table>
                                {
                                    users && users.length <= 0 && (
                                        <div className="text-center w-full p-8">
                                            No User in Record
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        postsPerPage={postsPerPage}
                        setPostPerPage={setPostPerPage}
                        totalPosts={users?.length}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    )
};
