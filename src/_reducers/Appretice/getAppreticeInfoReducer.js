import { appreticeConstants } from "../../_constants";

export const getAppreticeInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case appreticeConstants.GETAPPRETICEINFO_REQUEST:
            return {
                loading: true,
            };
        case appreticeConstants.GETAPPRETICEINFO_SUCCESS:
            return {
                status: action.response.status,
                appretice: action.response.appretice,
            };
        case appreticeConstants.GETAPPRETICEINFO_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
