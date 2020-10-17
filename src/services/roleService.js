import cookie from "react-cookies";
import { config } from "../config";

export const roleService = {
    getAllRoles,
    addNewRol,
    getCapacities
};

async function getAllRoles() {
    const configuration = {
        method: "POST",
        headers: {
            "x-access-token": cookie.load("userToken"),
        },
    };

    const requestResponse = await fetch(config.serverRoute + "getAddRoles", configuration);
    const responseJson = await requestResponse.json();
    return responseJson;
}

async function addNewRol(rol) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(rol),
    };

    const requestResponse = await fetch(config.serverRoute + "addRol", configuration);
    const responseJson = await requestResponse.json();
    return responseJson;
}


async function getCapacities() {
    const configuration = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        }
    };

    const requestResponse = await fetch(config.serverRoute + "getRolCapacities", configuration);
    const responseJson = await requestResponse.json();
    return responseJson;
}
