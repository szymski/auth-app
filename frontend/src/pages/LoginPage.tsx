import React, {useContext, useState} from "react";
import {Page} from "../components/Page";
import "./LoginPage.css"
import {authenticate} from "../api";
import {AppContext} from "../context";

export const LoginPage = () => {
    const context = useContext(AppContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const [error, setError] = useState();

    const handleSubmit = async () => {
        setLoggingIn(true);

        try {
            const data = await authenticate(username, password);
            context.setAuthToken(data.token);
            setError("");
        }
        catch(e) {
            console.error(e);
            setError("Wrong username or password");
        }

        setLoggingIn(false);
    };

    return (
        <Page className="login-page" title="Please sign in">
            <form className="login-form" onSubmit={handleSubmit}>
                <input disabled={loggingIn} placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                <input disabled={loggingIn} placeholder="Password" onChange={e => setPassword(e.target.value)} type="password"/>
                <input
                    type="submit"
                    value={loggingIn ? "Signing in..." : "Sign in"}
                    disabled={loggingIn || !username || !password}
                    onClick={handleSubmit}
                />
                {error && <p className="error-message">{error}</p>}
            </form>
        </Page>
    );
};
