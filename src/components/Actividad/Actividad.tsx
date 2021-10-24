import { useEffect } from "react";
import "./Actividad.scss";
import ActividadContext, { ActividadContextProvider } from "./config/ActividadContext";
import MEDIA from "./config/Routes";
import JuegoVirtual from "./src/JuegoVirtual";


const Actividad = () => {
    return <ActividadContextProvider>
        <ActividadLoad />
    </ActividadContextProvider>
}

const ActividadLoad = () => {
    const { useActividad } = ActividadContext();
    const [actividad] = useActividad();

    useEffect(() => {

      actividad.addPROCESSING(new JuegoVirtual(actividad));

    }, [])


    return <></>


}

export default Actividad;


