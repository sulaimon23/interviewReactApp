import { GET, GET_FAILED, GET_SUCCESS, EDIT_FAILED, EDIT_SUCCESS, EDIT, DELETE, DELETE_FAILED, DELETE_SUCCESS, ADD, ADD_FAILED, ADD_SUCCESS } from "../types";
import { toast } from 'react-toastify';

// 
const apiUrl = "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
// 
export const getUser = () => async (dispatch) => {
    dispatch({
        type: GET,
    });
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: GET_SUCCESS,
                payload: data
            });
        })
        .catch(error => {
            toast.error("Error getting user")
            dispatch({
                type: GET_FAILED,
            });
        })
};


export const deleteUser = (id) => async (dispatch) => {
    dispatch({
        type: DELETE,
    });
    fetch(apiUrl + `/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            toast.success("User Deleted Successfully")
            dispatch({
                type: DELETE_SUCCESS,
                payload: id
            });
        })
        .catch(error => {
            toast.error("Error deleting user")
            dispatch({
                type: DELETE_FAILED,
            });
        })
};

export const updateUser = (id, data) => async (dispatch) => {
    dispatch({
        type: EDIT,
    });
    let req = {
        "city": data.city,
        "email": data.email,
        "name": data.name,
        "username": data.userName,
    }
    fetch(apiUrl + `/${id}`, {
        method: 'PATCH',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(req)
    })
        .then(response => response.json())
        .then(res => {
            toast.success("User updated Successfully")
            dispatch({
                type: EDIT_SUCCESS,
                payload: res
            });
        })
        .catch(error => {
            toast.error("Error updating user")
            dispatch({
                type: EDIT_FAILED,
            });
        })
};


export const addUser = (data) => async (dispatch) => {
    dispatch({
        type: ADD,
    });
    let req = {
        "city": data.city,
        "email": data.email,
        "name": data.name,
        "username": data.userName,
    }
    fetch(apiUrl, {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(req)
    })
        .then(response => response.json())
        .then(res => {
            toast.success("User added Successfully")
            dispatch({
                type: ADD_SUCCESS,
                payload: res
            });
        })
        .catch(error => {
            toast.error("Error adding user")
            dispatch({
                type: ADD_FAILED,
            });
        })
};
