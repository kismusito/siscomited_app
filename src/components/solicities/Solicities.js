import React, { Component } from "react";
import { connect } from "react-redux";
import { NavbarSidebar } from "../";
import "./Solicities.css";

class Solicities extends Component {
    constructor(props) {
       super(props)
    }


    render() {
        
        return (
            <div className="background_login">
                <NavbarSidebar />
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        <div className="container_white_edit show_overflow_on_mobile">
                            <div className="title">Generar solicitudes</div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authReducer } = state;
    return { authReducer };
}

const actionCreator = {
};

const solicitiesComponent = connect(mapStateToProps, actionCreator)(Solicities);
export { solicitiesComponent as Solicities };
