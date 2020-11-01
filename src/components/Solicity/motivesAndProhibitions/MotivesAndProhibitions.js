import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar } from "../../../components";
import { Add, HighlightOff, EditOutlined, DeleteOutlined } from "@material-ui/icons";
import { TextareaAutosize } from "@material-ui/core";
import { solicityActions } from "../../../_actions";
import "./motivesAndProhibitions.css";

class MotivesAndProhibitions extends Component {
    constructor(props) {
        super();

        this.state = {
            showModalRoleNew: false,
            allRoles: [],
        };
    }

    componentDidMount() {
        this.props.getMotivesOrProhibitions();
    }

    addNewRoleModal = (_) => {
        this.setState({
            showModalRoleNew: true,
        });
    };

    closeNewRoleModal = (_) => {
        this.setState({
            showModalRoleNew: false,
        });
    };

    addNewMotiveOrProhibitions = (e) => {
        e.preventDefault();
        const data = {
            title: this.motiveOrProhibitionTitle.value,
            description: this.motiveOrProhibitionDescription.value,
        };
        e.target.reset();
        this.props.saveMotivesOrProhibition(data);
    };

    render() {
        const { getMotivesOrProhibitionsReducer, saveMotiveOrProhibitionReducer } = this.props;

        return (
            <div className="background_login">
                <Navbar />
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        <div className="container_white_edit min_height min_height_mobile show_overflow">
                            <div className="role_container">
                                <div className="roleList">
                                    <div className="title">Motivos y prohibiciones</div>
                                    <div className="subtitle">
                                        Edita y añade motivos o prohibiciones, estos apareseran en
                                        la seccion de generar solicitud de los intructores.
                                    </div>

                                    <ul className="roles_list">
                                        {getMotivesOrProhibitionsReducer.status &&
                                            getMotivesOrProhibitionsReducer.motiverOrProhibions.map(
                                                (element) => (
                                                    <li
                                                        className="roles_list_item"
                                                        key={element._id}
                                                    >
                                                        <div className="role_name">
                                                            {element.title}
                                                        </div>
                                                        <div className="role_actions">
                                                            <div className="edit_trigger ">
                                                                <EditOutlined />
                                                            </div>
                                                            <div className="delete_trigger">
                                                                <DeleteOutlined />
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                    </ul>
                                </div>
                                <div className="role_actions">
                                    <div className="add_new_role" onClick={this.addNewRoleModal}>
                                        <Add />
                                        <div>Añadir nuevo</div>
                                    </div>
                                </div>
                            </div>

                            {this.state.showModalRoleNew && (
                                <div className="modal_overlay_role total_height center_elements">
                                    <div className="close_modal" onClick={this.closeNewRoleModal}>
                                        <HighlightOff />
                                    </div>

                                    <div className="padding_15">
                                        <form
                                            method="POST"
                                            onSubmit={this.addNewMotiveOrProhibitions}
                                        >
                                            <div className="title leftMargin bottomMargin2">
                                                Añadir motivo o prohibicion
                                            </div>
                                            <div className="form_group">
                                                <input
                                                    type="text"
                                                    name="motiveOrProhibitionTitle"
                                                    ref={(input) =>
                                                        (this.motiveOrProhibitionTitle = input)
                                                    }
                                                    className="form_control"
                                                    placeholder="Título"
                                                    required={true}
                                                />
                                            </div>

                                            <div className="form_group">
                                                <TextareaAutosize
                                                    className="text_area_custom"
                                                    rowsMin={3}
                                                    ref={(input) =>
                                                        (this.motiveOrProhibitionDescription = input)
                                                    }
                                                    name="motiveOrProhibitionDescription"
                                                    placeholder="Descripción"
                                                    required={true}
                                                />
                                            </div>

                                            <button className="btn btn_big btn_orange">
                                                Añadir
                                            </button>

                                            {saveMotiveOrProhibitionReducer.status && (
                                                <div className="leftMargin edit_trigger">
                                                    {saveMotiveOrProhibitionReducer.message}
                                                </div>
                                            )}

                                            {!saveMotiveOrProhibitionReducer.status && (
                                                <div className="leftMargin delete_trigger">
                                                    {saveMotiveOrProhibitionReducer.message}
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authReducer, getMotivesOrProhibitionsReducer, saveMotiveOrProhibitionReducer } = state;
    return { authReducer, getMotivesOrProhibitionsReducer, saveMotiveOrProhibitionReducer };
}

const actionCreator = {
    getMotivesOrProhibitions: solicityActions.getMotiveOrProhibitions,
    saveMotivesOrProhibition: solicityActions.saveMotiveOrProhibitions,
};

const motivesAndProhibitionsComponent = connect(
    mapStateToProps,
    actionCreator
)(MotivesAndProhibitions);
export { motivesAndProhibitionsComponent as MotivesAndProhibitions };
