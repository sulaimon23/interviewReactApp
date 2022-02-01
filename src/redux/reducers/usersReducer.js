import { GET, GET_FAILED, GET_SUCCESS, EDIT_FAILED, EDIT_SUCCESS, EDIT, DELETE, DELETE_FAILED, DELETE_SUCCESS, ADD, ADD_FAILED, ADD_SUCCESS } from "../types";

const initialState = {
    loading: false,
    user: null,
    updated: false
};

const user = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload
            };

        case GET_FAILED:
        case ADD_FAILED:
        case EDIT_FAILED:
        case DELETE_FAILED:
            return { ...state, loading: false };
        case EDIT:
        case GET:
        case ADD:
        case DELETE:
            return {
                ...state,
                loading: true
            };
        case DELETE_SUCCESS:
            let userId = payload;
            let updatedUser = state.user.filter((user) => user.id != userId)
            return {
                ...state,
                loading: false,
                user: updatedUser,
                updated: true
            };
        case EDIT_SUCCESS:
            state.user.splice(payload.id - 1, 1, payload)
            return {
                ...state,
                loading: false,
            };
        case ADD_SUCCESS:
            state.user.push(payload)
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default user;