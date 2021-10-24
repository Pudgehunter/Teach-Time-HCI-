import "./index.scss"
import AppContext from "../../components/App/AppContext";
import { useEffect } from "react";

const Preload = () => {

    const { usePreload } = AppContext();
    const [preload, setPreload] = usePreload();

    useEffect(() => {
        setPreload("Complete")
    }, [])

    return <div className="Preload">
        <h1>Pagina de precarga</h1>
    </div>
}

export default Preload;