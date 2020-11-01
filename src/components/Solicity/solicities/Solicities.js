import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar } from "../../../components";
import { SolicityDetail } from "./solicityDetail";
import { solicityActions } from "../../../_actions";
import moment from "moment";
import "./solicities.css";

class Solicities extends Component {
    componentDidMount() {
        this.props.getSolicities();
    }

    eHandleChangeStatus = (key) => {
        const solicityData = {
            solicityID: key,
            status: this.eHandleStatus.value,
        };

        this.props.changeStatus(solicityData);
    };

    eHandleShowDetails = (key) => {
        this.props.getDetails(key);
    };

    render() {
        const { getSolicitiesReducer, getRolInfoReducer, getSolicityReducer } = this.props;
        return (
            <div className="background_login">
                <Navbar />
                <div className="custom_background_sidebar">
                    {getSolicityReducer.status && (
                        <SolicityDetail />
                    )}
                    <div className="center_container">
                        <div className="container_white_edit show_overflow_on_mobile">
                            <div className="title">Listado de solicitudes</div>
                            <ul className="solicityList">
                                {getSolicitiesReducer.status &&
                                    getSolicitiesReducer.solicities.map((solicity) => (
                                        <li key={solicity._id} className="solicityListItem">
                                            <div className="itemDate">
                                                {moment(solicity.create_at).format("L")}
                                            </div>
                                            <div className="center_elements">
                                                <div className="status">
                                                    {solicity.statusDetail}
                                                </div>

                                                {getRolInfoReducer.status &&
                                                    getRolInfoReducer.rolInfo.capacity ===
                                                        "director" && (
                                                        <select
                                                            className="select_style_solicity"
                                                            defaultValue={solicity.status}
                                                            onChange={() =>
                                                                this.eHandleChangeStatus(
                                                                    solicity._id
                                                                )
                                                            }
                                                            ref={(input) =>
                                                                (this.eHandleStatus = input)
                                                            }
                                                        >
                                                            <option value="approved">
                                                                Aprobar
                                                            </option>
                                                            <option value="pending">
                                                                Pendiente
                                                            </option>
                                                            <option value="reject">
                                                                No aprobar
                                                            </option>
                                                        </select>
                                                    )}
                                                {solicity.status === "approved" &&
                                                    getRolInfoReducer.status &&
                                                    getRolInfoReducer.rolInfo.capacity ===
                                                        "admin" && (
                                                        <div className="button_generate_citation">
                                                            Generar citación
                                                        </div>
                                                    )}
                                                <div
                                                    className="button_generate_citation"
                                                    onClick={() =>
                                                        this.eHandleShowDetails(solicity._id)
                                                    }
                                                >
                                                    Detalles
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        getSolicitiesReducer,
        updateSolicityStatusReducer,
        getRolInfoReducer,
        getSolicityReducer,
    } = state;
    return {
        getSolicitiesReducer,
        updateSolicityStatusReducer,
        getRolInfoReducer,
        getSolicityReducer,
    };
}

const actionCreator = {
    getSolicities: solicityActions.getSolicities,
    changeStatus: solicityActions.changeSolicityStatus,
    getDetails: solicityActions.getSolicityDetails,
};

const solicitiesComponent = connect(mapStateToProps, actionCreator)(Solicities);
export { solicitiesComponent as Solicities };
