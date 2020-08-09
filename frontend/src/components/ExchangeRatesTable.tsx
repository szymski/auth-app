import React from "react";
import {CurrencyExchangeRate, ExchangeRates} from "../api";
import "./ExchangeRatesTable.css";

const renderRow = (key: string, data: CurrencyExchangeRate) => (
    <tr>
        <td>{key} ({data.symbol})</td>
        <td>{data.buy}</td>
        <td>{data.sell}</td>
        <td>{data["15m"]}</td>
    </tr>
);

export const ExchangeRatesTable = (props: { items: ExchangeRates }) => (
    <table className="exchange-rates-table">
        <thead>
        <tr>
            <th>Currency</th>
            <th>Buy rate</th>
            <th>Sell rate</th>
            <th>Last</th>
        </tr>
        </thead>
        <tbody>
            {Object.keys(props.items).map(x => renderRow(x, props.items[x]))}
        </tbody>
    </table>
);
