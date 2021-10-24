import { ResultadoInteraction, ResultadoPuntuacion } from "./types";

class Registro {

    UIDUser?: string;
    UIDTest?: string;
    IDLocal: string;

    nav: { index: number } 

    time = {
        inicial: -1,
        final: -1
    }

    userInformation: ResultadoPuntuacion[] = [];
    datos: Map<string, ResultadoInteraction>;

    resultados: ResultadoPuntuacion[] = [];
    maximos: ResultadoPuntuacion[] = [];
    porcentaje: ResultadoPuntuacion[] = []

    constructor(IDLocal: string) {
        this.nav = { index: 0 }
        this.IDLocal = IDLocal;
        this.datos = new Map();

        this.time.inicial = (new Date()).getTime();

        const data = localStorage.getItem(this.IDLocal);
        if (data) {
            this.loadJSON(JSON.parse(data))
        }
    }

    finish() {
        this.time.final = (new Date()).getTime();

        const UIDTest = this.UIDTest;
        const UIDUser = this.UIDUser;
     

    }

    addResult(data: ResultadoInteraction) {
        this.datos.set(data.UID, data)

        

    }

    calculateMaximo() {

        var resultMax = new Map<string, number>();

        this.datos.forEach(({ maximos }) => {
            maximos.forEach(({ id, value }) => {
                var result = resultMax.get(id);

                if (result === undefined) {
                    resultMax.set(id, 0);
                    result = resultMax.get(id);
                }

                if (result) {
                    const valueResult = result + value;
                    resultMax.set(id, valueResult)
                }
            })
        })

        this.maximos = [];
        resultMax.forEach((value, key) => {
            this.maximos.push({ id: key, value })
        })
    }


    calculatePonderado() {

        var resultMax = new Map<string, number>();

        this.datos.forEach(({ resultados }) => {
            resultados.forEach(({ id, value }) => {
                var result = resultMax.get(id);

                if (result === undefined) {
                    resultMax.set(id, 0);
                    result = resultMax.get(id);
                }

                if (result) {
                    const valueResult = result + value;
                    resultMax.set(id, valueResult)
                }
            })
        })

        this.resultados = [];
        resultMax.forEach((value, key) => {
            this.resultados.push({ id: key, value })
        })
    }

    calculatePorcentaje() {

        var resultados = new Map<string, number>();
        var maximos = new Map<string, number>();
        var porcentaje = new Map<string, number>();

        this.resultados.forEach(({ id, value }) => {
            resultados.set(id, value);
        })

        this.maximos.forEach(({ id, value }) => {
            maximos.set(id, value);
        })

        resultados.forEach((value, key) => {
            const resultado = resultados.get(key);
            const maximo = maximos.get(key);

            if (resultado !== undefined && maximo !== undefined) {
                porcentaje.set(key, resultado / maximo)
            }
        })

        this.porcentaje = [];
        porcentaje.forEach((value, key) => {
            this.porcentaje.push({ id: key, value })
        })


    }

    clearAll() {
        localStorage.clear();
    }

    save() {
        const data = this.toJSON();
        localStorage.setItem(this.IDLocal, JSON.stringify(data))
    }

    toJSON() {

        const time = this.time;
        const nav = this.nav;
        const UIDUser = this.UIDUser;
        const UIDTest = this.UIDTest;

        const datos: { key: string, value: ResultadoInteraction }[] = []
        this.datos.forEach((value, key) => {
            datos.push({ value, key })
        })

        const userInformation = this.userInformation;
        const resultados = this.resultados;
        const maximos = this.maximos;
        const porcentaje = this.porcentaje;

        return {
            UIDTest,
            UIDUser,
            time,
            nav,
            userInformation,
            datos,
            resultados,
            maximos,
            porcentaje
        }
    }

    loadJSON(data: {
        UIDTest: string | undefined;
        UIDUser: string | undefined;
        time: {
            inicial: number;
            final: number;
        };
        nav: {
            index: number;
        };
        userInformation: ResultadoPuntuacion[];
        datos: {
            key: string;
            value: ResultadoInteraction;
        }[];
        resultados: ResultadoPuntuacion[];
        maximos: ResultadoPuntuacion[];
        porcentaje: ResultadoPuntuacion[];
    }) {

        this.UIDTest = data.UIDTest;
        this.UIDUser = data.UIDUser;
        this.nav = data.nav;
        this.time = data.time;
        this.userInformation = data.userInformation;

        this.resultados = data.resultados;
        this.maximos = data.maximos;
        this.porcentaje = data.porcentaje;

        this.datos = new Map();
        data.datos.forEach(({ value, key }, index) => {
            this.datos.set(key, value)
        })

    }

}

export default Registro;