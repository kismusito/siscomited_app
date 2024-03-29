import { uploadConstants } from "../../_constants";

export const uploadReducer = (state = {}, action) => {
    switch (action.type) {
        case uploadConstants.APPRENTICESUPLOAD_REQUEST:
            return {
                loading: true,
            };
        case uploadConstants.APPRENTICESUPLOAD_SUCCESS:
            return {
                status: action.response.status,
                total: action.response.total,
                message: action.response.message,
            };
        case uploadConstants.APPRENTICESUPLOAD_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case uploadConstants.UPLOADALERT_HIDE:
            return {
                status: false,
            };
        default:
            return state;
    }
};
