import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar } from "../../../components";
import { searchActions, generatorActions } from "../../../_actions";
import { HighlightOff } from "@material-ui/icons";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import JoditEditor from "jodit-react";
import "./generateMinutes.css";

class GenerateMinutes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startSearch: {
                status: false,
                value: "",
            },
            showAppreticesSearch: true,
            showModalInfoAppretice: false,
            appreticesSelected: [],
            dateSelected: new Date(),
            hourSelected: new Date(),
            content: "",
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

    eHandleSubmit = _ => {
        const citationInfo = {
            appretices: this.state.appreticesSelected,
            date: this.state.dateSelected,
            hour: this.state.hourSelected,
            content: this.state.content,
        };

        this.props.generateMinute(citationInfo);
    }

    eHandleSubmitGenerate = (e) => {
        e.preventDefault();
        this.eHandleSubmit()
    };

    eHandleDateChange = (value) => {
        this.setState({
            dateSelected: value,
        });
    };

    eHandleHourChange = (value) => {
        this.setState({
            hourSelected: value,
        });
    };

    eHandleCitationViews = (_) => {
        this.props.redirectToCitations();
    };

    eHandleEditContent = (contentArea) => {
        this.setState({
            content: contentArea.target.outerHTML,
        });
    };

    resetForm = _ => {
        console.log(this.contentMinute)
        this.setState({
            appreticesSelected: [],
            content: "",
        })
        this.contentMinute.innerHTML = ""
        this.props.resetMinute();
    }

    reintentForm = _ => {
        this.eHandleSubmit()
    }


    render() {
        const { searchReducer, generateConstantReducer } = this.props;

        return (
            <div className="background_login">
                <Navbar />
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        {generateConstantReducer.status && (
                            <div className="show_alert_popUp alert_show">
                                <img
                                    src="assets/img/check_alert.png"
                                    className="image_responsive_popup"
                                    alt="alert popup confirm"
                                />
                                <div className="subtitle">
                                    Revisa el PDF antes de cerrar esta pestaña
                                </div>

                                <div className="btn_section_flex">
                                    <a className="btn mt-5 w50 btn_teal" href={generateConstantReducer.pdfLink} rel="noopener noreferrer" target="_blank">Ver PDF</a>

                                    <button className="btn mt-5 w50 btn_teal" onClick={() => this.resetForm()}>Aceptar</button>

                                    <button className="btn mt-5 w50 btn_orange" onClick={() => this.reintentForm()}>Reintentar</button>
                                </div>
                            </div>
                        )}

                        <div className="container_white_edit no_over_hidden min_width_editor">
                            {generateConstantReducer.loading && (
                                <div className="loading_file">
                                    <div className="text_loading">Estamos procesando los datos</div>
                                    <div className="loader_upload"></div>
                                </div>
                            )}

                            <div className="title">Actas</div>
                            <div className="subtitle mb-4">
                                Para generar una citacion necesitaremos varios datos, puedes
                                utilizar el buscador avanzado de aprendizes, solo busca el aprendiz
                                y dale clic.
                            </div>

                            <form autoComplete="off" ref={input => this.mainForm = input} onSubmit={this.eHandleSubmitGenerate}>
                                <div className="title_search leftMargin">Aprendizes</div>
                                <div className="form_group_search cmp">
                                    <input
                                        type="text"
                                        name="searchAppretice"
                                        ref={(input) => (this.searchAppretice = input)}
                                        onChange={this.eHandleSearch}
                                        placeholder="Nombre o documento"
                                        className="form_control"
                                    />
                                    {this.state.startSearch.status && (
                                        <div className="search_criter_input">
                                            {this.state.startSearch.value}
                                        </div>
                                    )}
                                </div>

                                <div className="appretices_selected_container">
                                    {this.state.appreticesSelected.map((appretices) => (
                                        <div
                                            className="container_selected_appretice"
                                            key={appretices.appreticeID}
                                        >
                                            <div className="text_appretice_selected">
                                                {appretices.name + " " + appretices.lastName}
                                            </div>
                                            <div
                                                className="icon_delete_selected"
                                                onClick={() =>
                                                    this.deleteSelectedAppretice(
                                                        appretices.appreticeID
                                                    )
                                                }
                                            >
                                                <HighlightOff />
                                            </div>
                                        </div>
                                    ))}
                                </div>

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
                                                                {appretice.nombre +
                                                                    " " +
                                                                    appretice.primer_apellido}
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

                                <div className="form_group_search">
                                    <div className="title_search leftMargin mb-2">Fecha y hora</div>

                                    <div className="custom_date_select">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                value={this.state.dateSelected}
                                                onChange={this.eHandleDateChange}
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date",
                                                }}
                                            />
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="time-picker"
                                                value={this.state.hourSelected}
                                                onChange={this.eHandleHourChange}
                                                KeyboardButtonProps={{
                                                    "aria-label": "change time",
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>

                                <div className="form_group_search">
                                    <div className="title_search leftMargin">Contenido</div>
                                    <JoditEditor
                                        value={this.state.content}
                                        ref={(input) => (this.contentMinute = input)}
                                        onBlur={(content) => this.eHandleEditContent(content)}
                                    />
                                </div>

                                <div className="form_group_search">
                                    <button className="btn btn_big btn_orange">Generar acta</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authReducer, searchReducer, generateConstantReducer } = state;
    return { authReducer, searchReducer, generateConstantReducer };
}

const actionCreator = {
    searchAppretice: searchActions.searchAppretices,
    generateMinute: generatorActions.generateMinute,
    resetMinute: generatorActions.resetCitationMinute
};

const generateMinutesComponent = connect(mapStateToProps, actionCreator)(GenerateMinutes);
export { generateMinutesComponent as GenerateMinutes };
