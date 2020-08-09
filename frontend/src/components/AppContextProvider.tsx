import React, {useEffect, useState} from "react";
import {AppContext} from "../context";
import {setApiAuthToken} from "../api";

export const AppContextProvider = (props: { children: React.ReactNode; }) => {
    const [state, setState] = useState({
        authToken: "",
    });

    const context: AppContext = {
        authToken: state.authToken,
        setAuthToken: token => {
            localStorage.token = token;
            setApiAuthToken(token);
            setState({
                authToken: token,
            });
        },
        logout() {
            context.setAuthToken("");
        }
    };

    useEffect(() => {
        if (localStorage.token)
            context.setAuthToken(localStorage.token);
    }, []);

    return (
        <AppContext.Provider value={context}>
            {props.children}
        </AppContext.Provider>
    );
};
