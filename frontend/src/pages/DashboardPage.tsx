import React, {useContext, useEffect, useState} from "react";
import {Page} from "../components/Page";
import {getMyUser} from "../api";
import {AppContext} from "../context";

export const DashboardPage = () => {
    const [user, setUser] = useState<{ username: string; }>();
    const context = useContext(AppContext);

    useEffect(() => {
        getMyUser()
            .then(setUser)
            .catch(e => {
                console.error(e);
                console.log("Token:" + context.authToken);
                context.setAuthToken("");
            });
    }, []);

    return (
        <Page title="auth-app">
            {user && <p>You are signed in as {user.username}. <a href="#" onClick={context.logout}>Sign out</a></p>}
        </Page>
    );
};
