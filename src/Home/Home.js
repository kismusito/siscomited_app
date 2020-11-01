import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar } from "../components";
import "./Home.css";
import { CardComponent } from "./cardComponent";
import { userActions } from "../_actions";

class Home extends Component {
    componentDidMount() {
        this.props.getRoleInfo(this.props.authReducer.userInfo.user_role);
    }

    showComponent(rols = []) {
        const userRol = this.props.getRolInfoReducer.rolInfo.capacity;
        const searhRol = rols.indexOf(userRol);
        if (searhRol === -1) {
            return false;
        }

        return true;
    }

    render() {
        const { getRolInfoReducer } = this.props;

        return (
            <div className="background_login">
                <Navbar />
                <div className="custom_background_sidebar">
                    <div className="custom_background_apps">
                        <ul className="apps_items_list">
                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Usuarios"
                                    subtitle="Una forma sencilla de agregar nuevos usuarios."
                                    redirect="addUser"
                                    image="icon_edit_user.png"
                                    alt="Add new user"
                                />
                            )}
                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Editar usuarios"
                                    subtitle="Esta herramienta te permite buscar usuarios y editar sus atributos."
                                    redirect="editUsers"
                                    image="edit_users.png"
                                    alt="Edit user"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Editar roles"
                                    subtitle="Con esta herramienta podrás editar los roles de los usuarios y agregar nuevos."
                                    redirect="roles"
                                    image="icon_user_rol.png"
                                    alt="Manage roles"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Subir aprendizes"
                                    subtitle="Con esta herramienta podrás subir masivamente todos los aprendices desde un archivo XML."
                                    redirect="uploadApprentices"
                                    image="upload_students.png"
                                    alt="Upload appretices"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Subir instructores"
                                    subtitle="Con esta herramienta podrás subir masivamente todos los instructores desde un archivo XML."
                                    redirect="uploadInstructors"
                                    image="upload_teacher.png"
                                    alt="Upload teachers"
                                />
                            )}

                            {getRolInfoReducer.status &&
                                this.showComponent(["admin", "instructor"]) && (
                                    <CardComponent
                                        title="Buscar aprendiz"
                                        subtitle="Una forma fácil y sencilla de buscar la información de cualquier aprendiz."
                                        redirect="searchAppretices"
                                        image="search_user.png"
                                        alt="Search appretices"
                                    />
                                )}

                            {getRolInfoReducer.status &&
                                this.showComponent(["admin", "director"]) && (
                                    <CardComponent
                                        title="Buscar instructor"
                                        subtitle="Una forma fácil y sencilla de buscar la información de cualquier instructor."
                                        redirect="roles"
                                        image="search_intructor.png"
                                        alt="Search instructors"
                                    />
                                )}

                            {getRolInfoReducer.status &&
                                this.showComponent(["admin", "director", "instructor"]) && (
                                    <CardComponent
                                        title="Solicitudes"
                                        subtitle="Construye dinámicamente una citación, con esta herramienta podrás construir citaciones en cuestión de segundos."
                                        redirect="solicities"
                                        image="icon_add_citation.png"
                                        alt="Solicities"
                                    />
                                )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Citaciones"
                                    subtitle="Con esta herramienta podrás administrar todas tus citaciones, enviarlas y cambiar su estado."
                                    redirect="citations"
                                    image="icon_add_file.png"
                                    alt="Citations"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["instructor"]) && (
                                <CardComponent
                                    title="Crear solicitud"
                                    subtitle="Construye dinámicamente una citación, con esta herramienta podrás construir citaciones en cuestión de segundos."
                                    redirect="createSolicitiy"
                                    image="icon_add_citation.png"
                                    alt="Add citations"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Actas"
                                    subtitle="Construye dinámicamente tus actas, con esta herramienta podrás construir actas en cuestión de segundos."
                                    redirect="generateMinutes"
                                    image="icon_add_citation.png"
                                    alt="Minutes"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Emails"
                                    subtitle="Envia emails emails masivos a todos los aprendices que selecciones."
                                    redirect="generateMinutes"
                                    image="email_icon.png"
                                    alt="Emails"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Motivos o prohibiciones"
                                    subtitle="Envia emails emails masivos a todos los aprendices que selecciones."
                                    redirect="motivesAndProhibitions"
                                    image="email_icon.png"
                                    alt="Motives or prohibitions"
                                />
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authReducer, getRolInfoReducer } = state;
    return { authReducer, getRolInfoReducer };
}

const actionCreator = {
    getRoleInfo: userActions.getRoleInfo,
};

const homeComponent = connect(mapStateToProps, actionCreator)(Home);
export { homeComponent as Home };
