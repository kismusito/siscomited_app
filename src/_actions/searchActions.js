import { searchConstants } from "../_constants";
import { searchService } from "../services";

export const searchActions = {
    searchAppretices,
    searchAppretice,
    hideModalSearched,
};

function searchAppretices(searchData) {
    return (dispatch) => {
        dispatch(request());

        searchService
            .searchAppretices(searchData)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: searchConstants.SEARCHAPPRETICE_REQUEST };
    }
    function success(response) {
        return { type: searchConstants.SEARCHAPPRETICE_SUCCESS, response };
    }
    function failure(response) {
        return { type: searchConstants.SEARCHAPPRETICE_SUCCESS, response };
    }
}

function searchAppretice(appreticeID) {
    return (dispatch) => {
        dispatch(request());

        searchService
            .searchAppretice(appreticeID)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: searchConstants.SEARCHONEAPRETICE_REQUEST };
    }
    function success(response) {
        return { type: searchConstants.SEARCHONEAPRETICE_SUCCESS, response };
    }
    function failure(response) {
        return { type: searchConstants.SEARCHONEAPRETICE_FAILURE, response };
    }
}

function hideModalSearched() {
    return (dispatch) => {
        dispatch(hide());
    };

    function hide() {
        return { type: searchConstants.HIDESEARCHEDMODAL };
    }
}
