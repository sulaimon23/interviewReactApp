import { PROFILE_SETTINGS, TABS, ACTIVE_USER } from "../types";

const initialState = {
    loading: false,
    profiles: [],
    tab: 1,
    activeUser: {
        user: null,
        id: null,
    },
};

const user = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case PROFILE_SETTINGS.REQUEST:
            return { ...state, loading: true, ...payload };
        case PROFILE_SETTINGS.SUCCESS:
            return { ...state, loading: false, ...payload };

        case PROFILE_SETTINGS.FAILURE:
            return { ...state, loading: false };
        case TABS:
            return { ...state, tab: payload };
        case ACTIVE_USER:
            return {
                ...state,
                activeUser: { user: payload.user, id: payload.id },
            };
        default:
            return state;
    }
};

export default user;