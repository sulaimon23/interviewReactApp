import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/actions/userAction';
export const AddUser = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState({
        name: false,
        username: false,
        email: false,
        city: false,
    })
    function isEmpty(obj) {
        return obj.name.length <= 0 || obj.email.length <= 0;
    }
    const [submit, setIsSubmitting] = useState(false)
    const onSubmit = data => {
        setIsSubmitting(true)
        setError(data)
        setTimeout(() => {
            setIsSubmitting(false)
        }, 1500);
        if (isEmpty(data)) {
            return false
        } else {
            dispatch(addUser(data))
        }
    };
    return <div className="mt-8" >
        <div className="rounded-lg shadow-md border">
            <div className="flex items-start justify-between p-3 border-b" >
                <h2 className="text-lg font-semibold" >Form</h2>
                <Link to="/" >
                    <button className="submitButton  active:bg-red-600" style={{ marginTop: 0 }} >Back</button>
                </Link>
            </div>
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
                                        {...register("name")}
                                    />
                                    {
                                        submit && !error.name && (<span className="text-[10px] text-red-700 italic" ><sup>*</sup>Name is required</span>)
                                    }
                                </div>
                                <div>
                                    <label className="formLabel"
                                    >Username</label >
                                    <input name="username" className={
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
                                    <input className={
                                        submit && !error.email ? "formError" : "formInput"
                                    }
                                        {...register("email")}
                                        type="email"
                                    />
                                    {
                                        submit && !error.email && (<span className="text-[10px] text-red-700 italic" ><sup>*</sup>Email is required</span>)
                                    }
                                </div>
                                <div>
                                    <label className="formLabel"
                                    >City</label>
                                    <input name="city" className={
                                        submit && !error.city ? "formError" : "formInput"
                                    }
                                        {...register("city")}
                                    />
                                    {
                                        submit && !error.city && (<span className="text-[10px] text-red-700 italic" ><sup>*</sup>City is required</span>)
                                    }
                                </div>
                                <button className="submitButton active:bg-red-600" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};
