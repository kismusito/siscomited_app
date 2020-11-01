import React, { Component } from "react";
import { connect } from "react-redux";
import { HighlightOff, EditOutlined , StarBorder , Star} from "@material-ui/icons";
import { searchActions, appreticeActions } from "../../../_actions";
import "./selectAppretices.css";

class SelectAppretices extends Component {
    constructor() {
        super();
        this.state = {
            startSearch: {
                status: false,
                value: "",
            },
            showAppreticesSearch: true,
            showModalInfoAppretice: false,
            appreticesSelected: [],
            showModalAppreticeInfo: false,
            spokeMan: ""
        };
    }

    eHandleTypeSearch(search) {
        let credentials = {
            searchValue: search,
        };
        const validateIfIsDocument = search.match(/^([0-9])*$/);
        if (validateIfIsDocument) {
            credentials.type = "document";
            this.setState({
                startSearch: {
                    status: true,
                    value: "Documento",
                },
            });
        } else {
            credentials.type = "user";
            this.setState({
                startSearch: {
                    status: true,
                    value: "Nombre",
                },
            });
        }

        return credentials;
    }

    eHandleSearch = (e) => {
        e.preventDefault();
        const getSearch = this.eHandleTypeSearch(this.searchAppretice.value);
        this.props.searchAppretice(getSearch);
    };

    showAppreticeSelect = (appreticeID, name, lastName) => {
        let getActualSelected = this.state.appreticesSelected;

        let addApretice = true;
        getActualSelected.map((app) => {
            if (app.appreticeID === appreticeID) {
                addApretice = false;
            }
            return true;
        });

        if (addApretice) {
            getActualSelected.push({
                appreticeID,
                name,
                lastName,
                attemded: false
            });

            this.setState({
                appreticesSelected: getActualSelected,
            });
        }
    };

    deleteSelectedAppretice = (appreticeID) => {
        let getActualSelected = this.state.appreticesSelected;
        const newArr = getActualSelected.filter((ele) => {
            return ele.appreticeID !== appreticeID;
        });
        this.setState({
            appreticesSelected: newArr,
        });
    };

    editAppreticeInfo = (appreticeID) => {
        this.setState({
            showModalAppreticeInfo: true,
        });
        this.props.appreticeInfo(appreticeID);
    };

    saveAppreticeInfo = (_) => {
        const appreticeInfo = {
            appreticeID: this.props.getAppreticeInfoReducer.appretice._id,
            email: this.eHandleAppreticeEmail.value,
            phone: this.eHandleAppreticePhone.value,
        };
        this.props.saveAppretice(appreticeInfo);
    };

    eHandleHideModal = (_) => {
        this.setState({
            showModalAppreticeInfo: false,
        });
    };

    setAppreticeSpokeMan = appreticeID => {
        this.setState({
            spokeMan: appreticeID
        })
    }

    render() {
        const { searchReducer, getAppreticeInfoReducer, saveAppreticeInfoReducer } = this.props;
        return (
            <div>
                <div className="form_group_search cmp">
                    <input
                        type="text"
                        name="searchAppretice"
                        ref={(input) => (this.searchAppretice = input)}
                        onChange={this.eHandleSearch}
                        placeholder="Nombre o documento"
                        className="form_control"
                    />
                    <input
                        type="hidden"
                        name="appreticesSelected"
                        ref={(input) => (this.appreticesSelected = input)}
                        value={JSON.stringify(this.state.appreticesSelected)}
                        placeholder="Nombre o documento"
                        className="form_control"
                    />

                    {this.state.startSearch.status && (
                        <div className="search_criter_input">{this.state.startSearch.value}</div>
                    )}
                </div>

                <div className="appretices_selected_container">
                    {this.state.appreticesSelected.map((appretices) => (
                        <div className="container_selected_appretice" key={appretices.appreticeID}>
                            <div className="text_appretice_selected">
                                {appretices.name + " " + appretices.lastName}
                            </div>
                            <div className="appreticesAreaContainer">
                                <div
                                    className="icon_delete_selected"
                                    onClick={() => this.setAppreticeSpokeMan(appretices.appreticeID)}
                                >
                                    {this.state.spokeMan === appretices.appreticeID &&
                                        <Star />
                                    }
                                    {this.state.spokeMan !== appretices.appreticeID &&
                                        <StarBorder />
                                    }
                                    
                                    
                                </div>
                                <div
                                    className="icon_delete_selected"
                                    onClick={() => this.editAppreticeInfo(appretices.appreticeID)}
                                >
                                    <EditOutlined />
                                </div>
                                <div
                                    className="icon_delete_selected"
                                    onClick={() =>
                                        this.deleteSelectedAppretice(appretices.appreticeID)
                                    }
                                >
                                    <HighlightOff />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <input type="hidden" name="appreticeSpokeMan" id="appreticeSpokeMan" value={this.state.spokeMan} ref={input => this.spokeMan = input} />

                {this.state.showModalAppreticeInfo && (
                    <div className="showOverlayUpdateInfo center_elements">
                        <div className="editContainerAppreticeInfo">
                            <div className="close_modal" onClick={this.eHandleHideModal}>
                                <HighlightOff />
                            </div>
                            <div className="editAppreticeNoForm">
                                <div className="form_group">
                                    <input
                                        type="text"
                                        name="appreticeEmail"
                                        ref={(input) => (this.eHandleAppreticeEmail = input)}
                                        defaultValue={
                                            getAppreticeInfoReducer.status
                                                ? getAppreticeInfoReducer.appretice.email
                                                : ""
                                        }
                                        placeholder="Email"
                                        className="form_control"
                                        required
                                    />
                                </div>

                                <div className="form_group">
                                    <input
                                        type="text"
                                        name="appreticePhone"
                                        ref={(input) => (this.eHandleAppreticePhone = input)}
                                        defaultValue={
                                            getAppreticeInfoReducer.status
                                                ? getAppreticeInfoReducer.appretice.phone
                                                : ""
                                        }
                                        placeholder="Teléfono"
                                        className="form_control"
                                        required
                                    />
                                </div>
                                <div className="form_group">
                                    <button
                                        className="btn btn_big btn_teal"
                                        onClick={this.saveAppreticeInfo}
                                    >
                                        Guardar
                                    </button>
                                </div>
                                {getAppreticeInfoReducer.loading && (
                                    <div className="loading_file">
                                        <div className="text_loading_new">
                                            Estamos buscando al aprendiz
                                        </div>
                                        <div className="loader_upload"></div>
                                    </div>
                                )}
                                {saveAppreticeInfoReducer.loading && (
                                    <div className="loading_file">
                                        <div className="text_loading_new">
                                            Estamos procesando tu solicitud
                                        </div>
                                        <div className="loader_upload"></div>
                                    </div>
                                )}
                                {saveAppreticeInfoReducer.status && (
                                    <div className="alert_success_edit">
                                        {saveAppreticeInfoReducer.message}
                                    </div>
                                )}
                                {!saveAppreticeInfoReducer.status && (
                                    <div className="alert_error_edit">
                                        {saveAppreticeInfoReducer.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {searchReducer.status && this.state.showAppreticesSearch && (
                    <div className="search_container">
                        <ul className="search_list">
                            {searchReducer.appretices.map((appretice) => (
                                <li
                                    className="search_list_item"
                                    key={appretice._id}
                                    onClick={() =>
                                        this.showAppreticeSelect(
                                            appretice._id,
                                            appretice.nombre,
                                            appretice.primer_apellido
                                        )
                                    }
                                >
                                    <div className="two_colums_search">
                                        <div className="search_info_user">
                                            <div className="title_search">
                                                {appretice.nombre + " " + appretice.primer_apellido}
                                            </div>
                                            <div className="subtitle">
                                                {appretice.numero_documento}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { searchReducer, getAppreticeInfoReducer, saveAppreticeInfoReducer } = state;
    return { searchReducer, getAppreticeInfoReducer, saveAppreticeInfoReducer };
}

const actionCreator = {
    searchAppretice: searchActions.searchAppretices,
    appreticeInfo: appreticeActions.getAppreticeInfo,
    saveAppretice: appreticeActions.saveAppreticeInfo,
};

const selectAppreticesComponent = connect(mapStateToProps, actionCreator)(SelectAppretices);
export { selectAppreticesComponent as SelectAppretices };
