import { BrowserRouter, Switch, Route } from "react-router-dom"
import Preload from "../../pages/Preload"
import AppContext from "../App/AppContext";
import LINK from "./Routes";
import Actividad from "../Actividad/Actividad";

const Router = () => { 

    const { usePreload } = AppContext();
    const [preload, setPreload] = usePreload();

    return <BrowserRouter>
        <Switch>
            {preload === "Loading" ?
                <Preload />
                :
                <>
                    <Route exact path={LINK.INDEX} component={Actividad} />
                </>
            }
        </Switch>
    </BrowserRouter>
}

export default Router;