import React, {useContext, useEffect, useState} from "react";
import {Page} from "../components/Page";
import {CurrencyExchangeRate, ExchangeRates, getData, getMyUser, refreshData, SavedExchangeRates} from "../api";
import {AppContext} from "../context";
import {ExchangeRatesTable} from "../components/ExchangeRatesTable";
import "./DashboardPage.css";

export const DashboardPage = () => {
    const [user, setUser] = useState<{ username: string; }>();
    const context = useContext(AppContext);

    const [exchangeRates, setExchangeRates] = useState<SavedExchangeRates | null>(null);

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

    const refreshAndDisplayData = () =>
        refreshData()
            .then(setExchangeRates);

    return (
        <Page className="dashboard-page" title="auth-app">
            {user && <p>You are signed in as {user.username}. <a href="#" onClick={context.logout}>Sign out</a></p>}
            <div className="table-wrapper">
                <h3>Bitcoin exchange rates</h3>
                {exchangeRates && (
                    <>
                        <p>
                            Fetched at: {exchangeRates.savedAt}
                            &nbsp;
                            <a href="#" onClick={() => refreshAndDisplayData()}>Refresh</a>
                        </p>
                        <ExchangeRatesTable items={exchangeRates.data}/>
                    </>
                )}
            </div>
        </Page>
    );
};
