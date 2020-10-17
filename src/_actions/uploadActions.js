import { uploadConstants } from "../_constants";
import { uploadService } from "../services";

export const uploadActions = {
    uploadApprentices,
    hideAlert,
    uploadInstructors,
};

function uploadApprentices(form) {
    return (dispatch) => {
        dispatch(request());

        uploadService
            .uploadAppretices(form)
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
        return { type: uploadConstants.APPRENTICESUPLOAD_REQUEST };
    }
    function success(response) {
        return { type: uploadConstants.APPRENTICESUPLOAD_SUCCESS, response };
    }
    function failure(response) {
        return { type: uploadConstants.APPRENTICESUPLOAD_FAILURE, response };
    }
}

function uploadInstructors(form) {
    return (dispatch) => {
        dispatch(request());

        uploadService
            .uploadInstructors(form)
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
        return { type: uploadConstants.APPRENTICESUPLOAD_REQUEST };
    }
    function success(response) {
        return { type: uploadConstants.APPRENTICESUPLOAD_SUCCESS, response };
    }
    function failure(response) {
        return { type: uploadConstants.APPRENTICESUPLOAD_FAILURE, response };
    }
}

function hideAlert() {
    return (dispatch) => {
        dispatch(hideAlert());
    };

    function hideAlert() {
        return { type: uploadConstants.UPLOADALERT_HIDE };
    }
}
