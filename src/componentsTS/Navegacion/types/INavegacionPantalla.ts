export interface IPantallaModule {
    iniciar: () => void;
    finalizar: () => void;
}

interface INavegacionPantalla {
    name: string,
    index: number,
    pantalla: IPantallaModule,
    initSetup: boolean,
    type: "HTML" | "CREATEJS" | "PROCESSING" | "JSX" | "PROCESSING_JSX",
}

export default INavegacionPantalla;