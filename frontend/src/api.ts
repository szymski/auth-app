import axios from "axios";

const baseUrl = "http://localhost:3000";

export interface SavedExchangeRates {
    savedAt: Date;
    data: ExchangeRates
}

export type ExchangeRates = { [currency: string]: CurrencyExchangeRate };

export interface CurrencyExchangeRate {
    ['15m']: number;
    last: number;
    buy: number;
    sell: number;
    symbol: string;
}

export const API = axios.create({
    baseURL: baseUrl,
});

export function setApiAuthToken(token: string) {
    API.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export async function authenticate(username: string, password: string): Promise<{ token: string; }> {
    const response = await API.post("/auth/login/password", {
        username,
        password,
    });
    return response.data;
}

export async function getMyUser(): Promise<{ username: string; }> {
    const response = await API.get("/auth/my-user")
    return response.data;
}

export async function getData(): Promise<SavedExchangeRates> {
    const response = await API.get("/dashboard")
    return response.data;
}

export async function refreshData(): Promise<SavedExchangeRates> {
    const response = await API.post("/dashboard/update")
    return response.data;
}
