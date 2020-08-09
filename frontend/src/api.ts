import axios from "axios";

const baseUrl = "http://localhost:3000";

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
