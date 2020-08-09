import React from "react";

export interface AppContext {
    authToken: string;
    setAuthToken: (token: string) => void;
}

export const AppContext = React.createContext<AppContext>({
    authToken: "",
    setAuthToken: () => {},
});
