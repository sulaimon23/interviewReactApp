import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../loader';
import { updateUser } from '../../redux/actions/userAction';
// 
export const EditUser = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user)
    const [submit, setIsSubmitting] = useState(false)
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState({
        name: false,
        username: false,
        email: false,
        city: false,
    })
    const [userDetail, setUserDetail] = useState(null)
    useEffect(() => {
        let url = window.location.pathname.split('').slice(-1)[0]
        let user = users.user.filter((user) => user.id == url)
        if (user.length > 0) {
            setUserDetail(user[0])
        } else {
            navigate('/')
        }
    }, [])

    function isEmpty(obj) {
        return obj.name.length <= 0 || obj.email.length <= 0;
    }

    const onSubmit = data => {
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
        }, 1500);
        setError(data)
        if (isEmpty(data)) {
            return false
        } else {
            dispatch(updateUser(userDetail.id, data))
        }
    };

    // 
    return (
        <div className="mt-8" >
            <div className="rounded-lg shadow-md border">
                <div className="flex items-start justify-between p-3 border-b" >
                    <h2 className="text-lg font-semibold" >Edit user</h2>
                    <Link to="/" >
                        <button className="submitButton  active:bg-red-600" style={{ marginTop: 0 }} >Back</button>
                    </Link>
                </div>
                {
                    userDetail && (
                        <div className="flex flex-col p-3">
                            <div className="overflow-x-auto  ">
                                <div className="inline-block h-full min-w-full ">
                                    <div className="h-full overflow-hidden">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div>
                                                <label className="formLabel"
                                                >Name</label >
                                                <input name="name" className={
                                                    submit && !error.name ? "formError" : "formInput"
                                                }
                                                    defaultValue={userDetail.name}
                                                    {...register("name")}
                                                />
                                                {
                                                    submit && !error.name && (<span className="text-[10px] text-red-700 italic" ><sup>*</sup>Name is required</span>)
                                                }
                                            </div>
                                            <div>
                                                <label className="formLabel"
                                                >Username</label >
                                                <input name="username"
                                                    defaultValue={userDetail.username}
                                                    className={
                                                        submit && !error.userName ? "formError" : "formInput"
                                                    }
                                                    {...register("userName")}
                                                />
                                                {
                                                    submit && !error.userName && (<span className="text-[10px] text-red-700 italic" ><sup>*</sup>Username is required</span>)
                                                }
                                            </div>
                                            <div>
                                                <label className="formLabel"
                                                >Email</label>
                                                <input
                                                    defaultValue={userDetail.email}
                                                    className={
                                                        submit && !error.email ? "formError" : "formInput"
                                                    }
                                                    {...register("email")}
                                                />
                                                {
                                                    submit && !error.email && (<span className="text-[10px] text-red-700 italic" ><sup>*</sup>Email is required</span>)
                                                }
                                            </div>
                                            <div>
                                                <label className="formLabel"
                                                >City</label>
                                                <input name="city"
                                                    defaultValue={userDetail.address.city}
                                                    className={
                                                        submit && !error.city ? "formError" : "formInput"
                                                    }
                                                    {...register("city")}
                                                />
                                                {
                                                    submit && !error.city && (<span className="text-[10px] text-red-700 italic" ><sup>*</sup>City is required</span>)
                                                }
                                            </div>
                                            <button className="submitButton" type="submit" disabled={users.loading}
                                            >
                                                {
                                                    users.loading === true ? (
                                                        <Loader />
                                                    ) : (
                                                        "Submit"
                                                    )
                                                }
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
};
