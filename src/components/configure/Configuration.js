import React, { Component } from "react";
import { connect } from "react-redux";
import { NavbarSidebar } from "../";
import "./Configuration.css";
import { userActions } from "../../_actions";

class Configuration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eHandleError: false,
            errorMessage: "",
        };
    }

    eHandleValidatePassword(data) {
        console.log(data);
        if (data.newPassword === data.confirmPassword) {
            if (data.newPassword.length > 5) {
                this.setState({
                    eHandleError: false,
                    message: "",
                });

                this.props.updatePassword(data);
            } else {
                this.setState({
                    eHandleError: true,
                    message: "La nueva contraseña debe tener 5 caracteres",
                });
                return false;
            }
        } else {
            this.setState({
                eHandleError: true,
                message: "Las contraseñas no coninciden",
            });
            return false;
        }
    }

    eHandleSubmit = (e) => {
        e.preventDefault();
        const user = {
            currentPassword: this.currentPassword.value,
            newPassword: this.newPassword.value,
            confirmPassword: this.newPassword.value,
        };

        if (this.eHandleValidatePassword(user)) {
        } else {
        }
    };

    eHandleResetForm = _ => {
        setTimeout(_ => {
            this.changePasswordForm.reset();
        } , 1000)
    };

    render() {
        const { chagePasswordReducer } = this.props;

        return (
            <div className="background_login">
                <NavbarSidebar />
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        <div className="container_white_edit">
                            <h3>Cambiar contraseña</h3>
                            <form
                                method="POST"
                                onSubmit={this.eHandleSubmit}
                                ref={(input) => (this.changePasswordForm = input)}
                            >
                                <div className="form_group">
                                    <label htmlFor="current-password" className="labelText">
                                        Contraseña actual
                                    </label>
                                    <input
                                        type="password"
                                        className="form_control"
                                        placeholder="Contraseña actual"
                                        name="current-password"
                                        ref={(input) => (this.currentPassword = input)}
                                    />
                                </div>

                                <div className="form_group">
                                    <label htmlFor="new-password" className="labelText">
                                        Nueva contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form_control"
                                        placeholder="Nueva contraseña"
                                        name="new-password"
                                        ref={(input) => (this.newPassword = input)}
                                    />
                                </div>

                                <div className="form_group">
                                    <label htmlFor="repeat-password" className="labelText">
                                        Repetir contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form_control"
                                        placeholder="Repetir contraseña"
                                        name="repeat-password"
                                        ref={(input) => (this.confirmPassword = input)}
                                    />

                                    {this.state.eHandleError && (
                                        <div className="alert_error_edit" style={{ marginTop: 15 }}>
                                            {this.state.message}
                                        </div>
                                    )}

                                    {!chagePasswordReducer.status && (
                                        <div className="alert_error_edit" style={{ marginTop: 15 }}>
                                            {chagePasswordReducer.message}
                                        </div>
                                    )}

                                    {chagePasswordReducer.status && (
                                        <div
                                            className="alert_success_edit"
                                            style={{ marginTop: 15 }}
                                        >
                                            {this.eHandleResetForm()}
                                            {chagePasswordReducer.message}
                                        </div>
                                    )}
                                </div>

                                <button className="btn btn_big btn_orange">
                                    Cambiar contraseña
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authReducer, chagePasswordReducer } = state;
    return { authReducer, chagePasswordReducer };
}

const actionCreator = {
    updatePassword: userActions.updatePassword,
};

const configurationComponent = connect(mapStateToProps, actionCreator)(Configuration);
export { configurationComponent as Configuration };