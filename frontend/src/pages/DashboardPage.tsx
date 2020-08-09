import React, {useContext, useEffect, useState} from "react";
import {Page} from "../components/Page";
import {CurrencyExchangeRate, ExchangeRates, getData, getMyUser} from "../api";
import {AppContext} from "../context";
import {ExchangeRatesTable} from "../components/ExchangeRatesTable";
import "./DashboardPage.css";

export const DashboardPage = () => {
    const [user, setUser] = useState<{ username: string; }>();
    const context = useContext(AppContext);

    const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});

    useEffect(() => {
        getMyUser()
            .then(setUser)
            .catch(e => {
                console.error(e);
                console.log("Token:" + context.authToken);
                context.setAuthToken("");
            });
    }, []);

    useEffect(() => {
        getData()
            .then(setExchangeRates);
    }, []);

    return (
        <Page className="dashboard-page" title="auth-app">
            {user && <p>You are signed in as {user.username}. <a href="#" onClick={context.logout}>Sign out</a></p>}
            <div className="table-wrapper">
                <h3>Bitcoin exchange rates</h3>
                <ExchangeRatesTable items={exchangeRates}/>
            </div>
        </Page>
    );
};
