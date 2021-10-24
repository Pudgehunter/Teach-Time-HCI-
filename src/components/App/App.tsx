import AppContext from "./AppContext";
import Router from "../Router/Router";
import { useEffect } from "react";
import EstadoManager from "../../componentsTS/Estados/EstadoManager";

const App = () => {

    const { useStyle } = AppContext();

    useEffect(() => {
        
    }, [])

    return <div className="App">
        <Router />
    </div>
}

export default App;