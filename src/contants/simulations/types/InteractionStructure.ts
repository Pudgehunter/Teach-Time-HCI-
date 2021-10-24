import { ResultadoPuntuacion } from "../../resultados/types";

interface InteractionStructure {
    UID: string;
    UIDUnity?: string
    title: string;
    image: string;
    actividad: () => JSX.Element;
    tags: string[];
    defaultMaximos: ResultadoPuntuacion[]
}

export default InteractionStructure;


