import React, {useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import {LoginPage} from "./pages/LoginPage";
import {AppContextProvider} from "./components/AppContextProvider";
import {AppContext} from "./context";
import {DashboardPage} from "./pages/DashboardPage";

function App() {
    const context = useContext(AppContext);

    return (
        <div className="App">
            {context.authToken
                ? <DashboardPage/>
                : <LoginPage/>}
        </div>
    );
}

export default App;
