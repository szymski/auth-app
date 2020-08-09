import React from 'react';
import logo from './logo.svg';
import './App.css';
import {LoginPage} from "./pages/LoginPage";
import {AppContextProvider} from "./components/AppContextProvider";

function App() {
    return (
        <AppContextProvider>
            <div className="App">
                <LoginPage/>
            </div>
        </AppContextProvider>
    );
}

export default App;
