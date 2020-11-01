import cookie from "react-cookies";
import { config } from "../config";

export const solicityService = {
    getDrawSolicity,
    getMotivesOrProhibitions,
    saveMotivesOrProhibitions,
    saveSolicity,
    getSolicites,
    changeSolicityStatus,
    getSolicityDetails
};

async function getDrawSolicity() {
    const configuration = {
        method: "GET",
        headers: {
            "x-access-token": cookie.load("userToken"),
        },
    };

    const sendRequest = await fetch(config.serverRoute + "getDrawSolicity", configuration);
    const convertRequest = await sendRequest.json();
    return convertRequest;
}

async function getMotivesOrProhibitions() {
    const configuration = {
        method: "GET",
        headers: {
            "x-access-token": cookie.load("userToken"),
        },
    };

    const sendRequest = await fetch(config.serverRoute + "getMotiverOrProhibitions", configuration);
    const convertRequest = await sendRequest.json();
    return convertRequest;
}

async function saveMotivesOrProhibitions(data) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(data)
    };

    const sendRequest = await fetch(config.serverRoute + "saveMotiveOrProhibition", configuration);
    const convertRequest = await sendRequest.json();
    return convertRequest;
}

async function saveSolicity(data) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(data)
    };

    const sendRequest = await fetch(config.serverRoute + "saveSolicity", configuration);
    const convertRequest = await sendRequest.json();
    return convertRequest;
}

async function getSolicites() {
    const configuration = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
    };

    const sendRequest = await fetch(config.serverRoute + "getSolicities", configuration);
    const convertRequest = await sendRequest.json();
    return convertRequest;
}

async function changeSolicityStatus(data) {
    const configuration = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(data)
    };

    const sendRequest = await fetch(config.serverRoute + "changeSolicityStatus", configuration);
    const convertRequest = await sendRequest.json();
    return convertRequest;
}

async function getSolicityDetails(id) {
    const configuration = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": cookie.load("userToken"),
        }
    };

    const sendRequest = await fetch(config.serverRoute + "getSolicityDetails/" + id, configuration);
    const convertRequest = await sendRequest.json();
    return convertRequest;
}
