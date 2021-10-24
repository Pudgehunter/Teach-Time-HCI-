import Navegador from "../../../componentsTS/Navegacion/config";
import EstadoManager from "../../../componentsTS/Estados/EstadoManager";
import ObserverNav from "../../../componentsTS/Navegacion/config/ObserverNav";
import { ResultadoPuntuacion } from "../../../contants/resultados/types";

class ActividadTS extends Navegador {

    medicion = new EstadoManager()
    private fOnFinish?: Function;

    observerNav?: ObserverNav;
    resultados: ResultadoPuntuacion[] = [];
    maximos: ResultadoPuntuacion[] = [];

    constructor(observerNav?: ObserverNav) {
        super();
        this.observerNav = observerNav;

        if (observerNav && observerNav.currentInteraction) {
            this.maximos = observerNav.currentInteraction.interaccion.defaultMaximos;
        }
    }

    init(name?: string | number) {
        this.nameInitDefaul = name;
        this.medicion.initTime();
    }

    getState(key: string) {
        return this.medicion.useState(key)
    }

    addState(key: string, valor: string | number) {
        this.medicion.addState(key, valor)
    }

    addResultMaximo(maximo: ResultadoPuntuacion[]) {
        var maximoTemp = new Map<string, number>()
        maximo.forEach(({ id, value }) => {
            maximoTemp.set(id, value);
        });

        var maximoResult: ResultadoPuntuacion[] = []
        maximoTemp.forEach((value, key) => {
            maximoResult.push({ id: key, value })
        })
        this.maximos = maximoResult;
    }

    addResult(resultados: ResultadoPuntuacion[]) {
        var resultadoTemp = new Map<string, number>()
        resultados.forEach(({ id, value }) => {
            resultadoTemp.set(id, value);
        });

        var resultadoResult: ResultadoPuntuacion[] = []
        resultadoTemp.forEach((value, key) => {
            resultadoResult.push({ id: key, value })
        })
        this.resultados = resultadoResult;
    }

    setFinish(fOnFinish: Function) {
        this.fOnFinish = fOnFinish;
    }

    finish() {
        if (this.fOnFinish) {
            this.fOnFinish()
        }

        if (this.observerNav && this.observerNav.currentInteraction) {
            const { UID, UIDActivity } = this.observerNav.currentInteraction;
            const data = this.medicion.toJSON();
            const resultados = this.resultados;
            const maximos = this.maximos;

            this.observerNav.registro.addResult({
                UID,
                UIDActivity,
                data,
                resultados,
                maximos
            })

        }
    }

}

export default ActividadTS;