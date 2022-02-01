import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../redux/actions/userAction';
import { Loader } from '../loader';
export const Modal = ({ user, setModalState }) => {
    const updatedUser = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const reference = useRef();
    const [submit, isSubmitting] = useState(false);

    useEffect(() => {
        if (updatedUser.updated) {
            setTimeout(() => {
                setModalState(false)
            }, 1500)
        }
    }, [submit])

    const closeModal = (event) => {
        if (reference.current && !reference.current.contains(event.target)) {
            setModalState(false)
        }
    }

    function deleteUserData(id) {
        isSubmitting(true)
        dispatch(deleteUser(id))
    }

    return (
        <div onClick={(event) => closeModal(event)} id="modal" className="flex overflow-hidden h-full items-center justify-center absolute top-0 bottom-0 left-0 right-0 bg-opacity-60 bg-black" >
            <div
                className="justify-center w-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative  w-full my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div ref={reference} className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Delete
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            >
                                <span onClick={() => setModalState(false)} className=" text-black 5 h-6 w-6 text-3xl block outline-none ">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-center text-blueGray-500 text-lg leading-relaxed">
                                Confirm you want to delete data ?
                            </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="bg-gray-600 active:bg-gray-500 text-white background-transparent font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setModalState(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => deleteUserData(user.id)}
                                disabled={updatedUser.loading}
                            >
                                {
                                    updatedUser.loading === true ? (
                                        <Loader />
                                    ) : (
                                        "Delete"
                                    )
                                }

                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    );
};
