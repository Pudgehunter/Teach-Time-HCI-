import { IMedicionUnity } from "../../componentsTS/Estados/EstadoManager";

export interface ResultadoPuntuacion {
    id: string;
    value: number;
}

export interface ResultadoInteraction {
    UID: string;
    UIDActivity: string;
    resultados: ResultadoPuntuacion[];
    maximos: ResultadoPuntuacion[];
    data: IMedicionUnity;
}