import React, { Component } from "react";
import { connect } from "react-redux";
import { NavbarSidebar } from "../components";
import "./Home.css";
import { Link } from "react-router-dom";
import { userActions } from "../_actions";

class Home extends Component {
    componentDidMount() {
        this.props.getRoleInfo(this.props.authReducer.userInfo.user_role);
    }

    render() {
        const { getRolInfoReducer } = this.props;

        return (
            <div className="background_login">
                <NavbarSidebar />
                <div className="custom_background_sidebar">
                    <div className="custom_background_apps">
                        <ul className="apps_items_list">
                            {getRolInfoReducer.status &&
                                getRolInfoReducer.rolInfo.capacity === "admin" && (
                                    <li className="list_item_apps">
                                        <Link className="list_item_apps_link" to="/addUser">
                                            <div>
                                                <img
                                                    src="/assets/img/icon_edit_user.png"
                                                    alt="add user new"
                                                />
                                            </div>
                                            <div className="title">Usuarios</div>
                                            <div className="subtitle">
                                                Una forma sencilla de agregar nuevos usuarios.
                                            </div>
                                        </Link>
                                    </li>
                                )}
                            {getRolInfoReducer.status &&
                                getRolInfoReducer.rolInfo.capacity === "admin" && (
                                    <li className="list_item_apps">
                                        <Link className="list_item_apps_link" to="/editUsers">
                                            <div>
                                                <img
                                                    src="/assets/img/edit_users.png"
                                                    alt="edit user "
                                                />
                                            </div>
                                            <div className="title">Editar usuarios</div>
                                            <div className="subtitle">
                                                Esta herramienta te permite buscar usuarios y editar
                                                sus atributos.
                                            </div>
                                        </Link>
                                    </li>
                                )}

                            {getRolInfoReducer.status &&
                                getRolInfoReducer.rolInfo.capacity === "admin" && (
                                    <li className="list_item_apps">
                                        <Link className="list_item_apps_link" to="/roles">
                                            <div>
                                                <img
                                                    src="/assets/img/icon_user_rol.png"
                                                    alt="edit roles"
                                                />
                                            </div>
                                            <div className="title">Editar roles</div>
                                            <div className="subtitle">
                                                Con esta herramienta podrás editar los roles de los
                                                usuarios y agregar nuevos.
                                            </div>
                                        </Link>
                                    </li>
                                )}

                            {getRolInfoReducer.status &&
                                getRolInfoReducer.rolInfo.capacity === "admin" && (
                                    <li className="list_item_apps">
                                        <Link
                                            className="list_item_apps_link"
                                            to="/uploadApprentices"
                                        >
                                            <div>
                                                <img
                                                    src="/assets/img/upload_students.png"
                                                    alt="edit roles"
                                                />
                                            </div>
                                            <div className="title">Subir aprendizes</div>
                                            <div className="subtitle">
                                                Con esta herramienta podrás subir masivamente todos
                                                los aprendices desde un archivo XML.
                                            </div>
                                        </Link>
                                    </li>
                                )}

                            {getRolInfoReducer.status &&
                                getRolInfoReducer.rolInfo.capacity === "admin" && (
                                    <li className="list_item_apps">
                                        <Link className="list_item_apps_link" to="/uploadInstructors">
                                            <div>
                                                <img
                                                    src="/assets/img/upload_teacher.png"
                                                    alt="edit roles"
                                                />
                                            </div>
                                            <div className="title">Subir instructores</div>
                                            <div className="subtitle">
                                                Con esta herramienta podrás subir masivamente todos
                                                los instructores desde un archivo XML.
                                            </div>
                                        </Link>
                                    </li>
                                )}

                            <li className="list_item_apps">
                                <Link className="list_item_apps_link" to="/searchAppretices">
                                    <div>
                                        <img src="/assets/img/search_user.png" alt="edit roles" />
                                    </div>
                                    <div className="title">Buscar aprendiz</div>
                                    <div className="subtitle">
                                        Una forma fácil y sencilla de buscar la información de
                                        cualquier aprendiz.
                                    </div>
                                </Link>
                            </li>

                            {getRolInfoReducer.status &&
                                getRolInfoReducer.rolInfo.capacity === "admin" && (
                                    <li className="list_item_apps">
                                        <Link className="list_item_apps_link" to="/roles">
                                            <div>
                                                <img
                                                    src="/assets/img/search_intructor.png"
                                                    alt="edit roles"
                                                />
                                            </div>
                                            <div className="title">Buscar instructor</div>
                                            <div className="subtitle">
                                                Una forma fácil y sencilla de buscar la información
                                                de cualquier instructor.
                                            </div>
                                        </Link>
                                    </li>
                                )}

                            {getRolInfoReducer.status &&
                                getRolInfoReducer.rolInfo.capacity === "admin" && (
                                    <li className="list_item_apps">
                                        <Link className="list_item_apps_link" to="/myCitations">
                                            <div>
                                                <img
                                                    src="/assets/img/icon_add_file.png"
                                                    alt="edit roles"
                                                />
                                            </div>
                                            <div className="title">Mis citaciones</div>
                                            <div className="subtitle">
                                                Con esta herramienta podrás administrar todas tus
                                                citaciones, enviarlas y cambiar su estado.
                                            </div>
                                        </Link>
                                    </li>
                                )}

                            {getRolInfoReducer.status &&
                                getRolInfoReducer.rolInfo.capacity === "admin" && (
                                    <li className="list_item_apps">
                                        <Link className="list_item_apps_link" to="/citations">
                                            <div>
                                                <img
                                                    src="/assets/img/icon_add_citation.png"
                                                    alt="edit roles"
                                                />
                                            </div>
                                            <div className="title">Citaciones</div>
                                            <div className="subtitle">
                                                Construye dinámicamente una citación, con esta
                                                herramienta podrás construir citaciones en cuestión
                                                de segundos.
                                            </div>
                                        </Link>
                                    </li>
                                )}

                            {getRolInfoReducer.status &&
                                getRolInfoReducer.rolInfo.capacity === "instructor" && (
                                    <li className="list_item_apps">
                                        <Link className="list_item_apps_link" to="/solicities">
                                            <div>
                                                <img
                                                    src="/assets/img/icon_add_citation.png"
                                                    alt="edit roles"
                                                />
                                            </div>
                                            <div className="title">Solicitudes</div>
                                            <div className="subtitle">
                                                Construye dinámicamente una citación, con esta
                                                herramienta podrás construir citaciones en cuestión
                                                de segundos.
                                            </div>
                                        </Link>
                                    </li>
                                )}

                            {getRolInfoReducer.status &&
                                getRolInfoReducer.rolInfo.capacity === "instructor" && (
                                    <li className="list_item_apps">
                                        <Link className="list_item_apps_link" to="/solicities">
                                            <div>
                                                <img
                                                    src="/assets/img/icon_add_citation.png"
                                                    alt="edit roles"
                                                />
                                            </div>
                                            <div className="title">Crear solicitud</div>
                                            <div className="subtitle">
                                                Construye dinámicamente una citación, con esta
                                                herramienta podrás construir citaciones en cuestión
                                                de segundos.
                                            </div>
                                        </Link>
                                    </li>
                                )}

                            {getRolInfoReducer.status &&
                                getRolInfoReducer.rolInfo.capacity === "admin" && (
                                    <li className="list_item_apps">
                                        <Link className="list_item_apps_link" to="/generateMinutes">
                                            <div>
                                                <img
                                                    src="/assets/img/icon_add_citation.png"
                                                    alt="edit roles"
                                                />
                                            </div>
                                            <div className="title">Actas</div>
                                            <div className="subtitle">
                                                Construye dinámicamente tus actas, con esta
                                                herramienta podrás construir actas en cuestión de
                                                segundos.
                                            </div>
                                        </Link>
                                    </li>
                                )}

                            {getRolInfoReducer.status &&
                                getRolInfoReducer.rolInfo.capacity === "admin" && (
                                    <li className="list_item_apps">
                                        <Link className="list_item_apps_link" to="/generateMinutes">
                                            <div>
                                                <img
                                                    src="/assets/img/email_icon.png"
                                                    alt="edit roles"
                                                />
                                            </div>
                                            <div className="title">Emails</div>
                                            <div className="subtitle">
                                                Envia emails emails masivos a todos los aprendices
                                                que selecciones.
                                            </div>
                                        </Link>
                                    </li>
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
