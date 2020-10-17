import { rolConstant, userConstants } from "../_constants";
import { roleService, userService } from "../services";

export const userActions = {
    getAllRoles,
    addRol,
    registerUser,
    getRoleInfo,
    searchUser,
    searchedUser,
    editUser,
    getCitaions,
    getSelectedCitaion,
    hideModalSelectedCitation,
    uploadCitationStatus,
    hideModalNewChange,
    updatePassword,
    getCapacities
};

function getAllRoles() {
    return (dispatch) => {
        dispatch(request());

        roleService
            .getAllRoles()
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
        return { type: rolConstant.GETROLES_REQUEST };
    }
    function success(response) {
        return { type: rolConstant.GETROLES_SUCCESS, response };
    }
    function failure(response) {
        return { type: rolConstant.GETROLES_FAILURE, response };
    }
}


function getCapacities() {
    return (dispatch) => {
        dispatch(request());

        roleService
            .getCapacities()
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
        return { type: rolConstant.GETROLCAPACITIES_REQUEST };
    }
    function success(response) {
        return { type: rolConstant.GETROLCAPACITIES_SUCCESS, response };
    }
    function failure(response) {
        return { type: rolConstant.GETROLCAPACITIES_FAILURE, response };
    }
}

function addRol(rolData) {
    return (dispatch) => {
        dispatch(request());

        roleService
            .addNewRol(rolData)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    roleService
                        .getAllRoles()
                        .then((response) => {
                            if (response.status) {
                                dispatch(successRoles(response));
                                setTimeout((_) => {
                                    dispatch(request());
                                }, 1500);
                            } else {
                                dispatch(failureRoles(response));
                                setTimeout((_) => {
                                    dispatch(request());
                                }, 1500);
                            }
                        })
                        .catch((err) => {
                            dispatch(failureRoles(err));
                            setTimeout((_) => {
                                dispatch(request());
                            }, 1500);
                        });
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: rolConstant.ADDROLES_REQUEST };
    }
    function success(response) {
        return { type: rolConstant.ADDROLES_SUCCESS, response };
    }
    function failure(response) {
        return { type: rolConstant.ADDROLES_FAILURE, response };
    }
    function successRoles(response) {
        return { type: rolConstant.GETROLES_SUCCESS, response };
    }
    function failureRoles(response) {
        return { type: rolConstant.GETROLES_FAILURE, response };
    }
}

function registerUser(user) {
    return (dispatch) => {
        dispatch(request());

        userService
            .registerUser(user)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    setTimeout((_) => {
                        dispatch(
                            success({
                                status: false,
                                message: "",
                            })
                        );
                    }, 1500);
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: userConstants.USERREGISTER_REQUEST };
    }
    function success(response) {
        return { type: userConstants.USERREGISTER_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.USERREGISTER_FAILURE, response };
    }
}

function getRoleInfo(roleID) {
    return (dispatch) => {
        dispatch(request());

        userService
            .getUserRole(roleID)
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
        return { type: rolConstant.GETROLINFO_REQUEST };
    }
    function success(response) {
        return { type: rolConstant.GETROLINFO_SUCCESS, response };
    }
    function failure(response) {
        return { type: rolConstant.GETROLINFO_FAILURE, response };
    }
}

function searchUser(search) {
    return (dispatch) => {
        dispatch(request());

        userService
            .searchUsers(search)
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
        return { type: userConstants.SEARCHUSER_REQUEST };
    }
    function success(response) {
        return { type: userConstants.SEARCHUSER_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.SEARCHUSER_FAILURE, response };
    }
}

function searchedUser(userID) {
    return (dispatch) => {
        dispatch(request());

        userService
            .searchedUser(userID)
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
        return { type: userConstants.GETSEARCHEDUSER_REQUEST };
    }
    function success(response) {
        return { type: userConstants.GETSEARCHEDUSER_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.GETSEARCHEDUSER_FAILURE, response };
    }
}

function editUser(user) {
    return (dispatch) => {
        dispatch(request());

        userService
            .editUser(user)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    setTimeout((_) => {
                        dispatch(request());
                    }, 2000);
                } else {
                    dispatch(failure(response));
                    setTimeout((_) => {
                        dispatch(request());
                    }, 2000);
                }
            })
            .catch((err) => {
                dispatch(failure(err));
                setTimeout((_) => {
                    dispatch(request());
                }, 2000);
            });
    };

    function request() {
        return { type: userConstants.EDITSEARCHEDUSER_REQUEST };
    }
    function success(response) {
        return { type: userConstants.EDITSEARCHEDUSER_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.EDITSEARCHEDUSER_FAILURE, response };
    }
}

function getCitaions() {
    return (dispatch) => {
        dispatch(request());

        userService
            .getMyCitations()
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
        return { type: userConstants.GETMYCITATIONS_REQUEST };
    }
    function success(response) {
        return { type: userConstants.GETMYCITATIONS_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.GETSEARCHEDUSER_FAILURE, response };
    }
}

function getSelectedCitaion(citationID) {
    return (dispatch) => {
        dispatch(request());

        userService
            .getSelectedCitation(citationID)
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
        return { type: userConstants.GETSELECTEDCITATION_REQUEST };
    }
    function success(response) {
        return { type: userConstants.GETSELECTEDCITATION_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.GETSELECTEDCITATION_FAILURE, response };
    }
}

function hideModalSelectedCitation() {
    return (dispatch) => {
        dispatch(hideModal());
    };
    function hideModal() {
        return { type: userConstants.GETSELECTEDCITATION_HIDEMODAL };
    }
}

function uploadCitationStatus(citationID, form) {
    return (dispatch) => {
        dispatch(request());

        userService
            .uploadNewCitationStatus(citationID, form)
            .then((response) => {
                if (response.status) {
                    userService
                        .getSelectedCitation(citationID)
                        .then((response) => {
                            if (response.status) {
                                dispatch(successAfter(response));
                            } else {
                                dispatch(failureAfter(response));
                            }
                        })
                        .catch((err) => {
                            dispatch(failure(err));
                        });
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
        return { type: userConstants.UPLOADNEWCITATIONSTATUS_REQUEST };
    }
    function success(response) {
        return { type: userConstants.UPLOADNEWCITATIONSTATUS_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.UPLOADNEWCITATIONSTATUS_FAILURE, response };
    }
    function successAfter(response) {
        return { type: userConstants.GETSELECTEDCITATION_SUCCESS, response };
    }
    function failureAfter(response) {
        return { type: userConstants.GETSELECTEDCITATION_FAILURE, response };
    }
}

function hideModalNewChange() {
    return (dispatch) => {
        dispatch(hideModal());
    };
    function hideModal() {
        return { type: userConstants.UPLOADNEWCITATIONSTATUS_HIDEMODAL };
    }
}

function updatePassword(data) {
    return (dispatch) => {
        dispatch(request());

        userService
            .updatePassword(data)
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
        return { type: userConstants.USERUPDATEPASSWORD_REQUEST };
    }
    function success(response) {
        return { type: userConstants.USERUPDATEPASSWORD_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.USERUPDATEPASSWORD_FAILURE, response };
    }
}
