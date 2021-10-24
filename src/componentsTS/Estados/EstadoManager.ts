import Tiempo from "./Timer";

interface IEstado {
    index: number;
    time: number;
    value: number | string;
}

interface IMedicion {
    index: number,
    estados: IEstado[]
}

export interface IMedicionUnity {
    lastIndex: number;
    estados: {
        key: string;
        values: IEstado[];
    }[];
}

class EstadoManager<T = string> {

    timer: Tiempo;
    estados: Map<T, IEstado[]> = new Map();
    index = -1;
    lastIndex = -1;

    constructor() {
        this.timer = new Tiempo();
    }

    initTime() {
        this.timer.start();
    }

    resetTime(load?: () => void) {
        load && load();
    }

    useState(key: T): [() => string | number | undefined, (valor: number | string) => void] {

        const getState = () => {
            return this.getLastState(key)
        }

        const setState = (valor: number | string) => {
            this.addState(key, valor)
        }

        return [getState.bind(this), setState.bind(this)]
    }

    getLastState(key: T) {
        var value: (number | string) | undefined = undefined;
        var mapState = this.estados.get(key) as IEstado[];
        if (mapState) {
            const lastState = mapState[mapState.length - 1]
            if (lastState) {
                value = lastState.value;
            }
        }
        return value;
    }

    addState(key: T, valor: number | string) {
        const value = valor;

        var mapState = this.estados.get(key) as IEstado[];
        if (mapState === undefined) {
            this.estados.set(key, []);
            mapState = this.estados.get(key) as IEstado[];
        }

        const lastState = mapState[mapState.length - 1]

        const time = this.timer.tiempo;

        if (lastState === undefined || lastState.value !== value) {
            this.index++;

            const estado: IEstado = {
                index: this.index + 0,
                time,
                value
            }

            this.lastIndex = this.index;

            mapState.push(estado)
        }

    }

    stopTime() {
        this.timer.stop();
    }

    getMapArray(filter?: string[]) {
        const { lastIndex, estados } = this.toJSON()
        return EstadoManager.getArrayMap(lastIndex, estados, filter)
    }

    static getArrayMap(lastIndex: number, estados: { key: string, values: IEstado[] }[], filter?: string[]) {

        var titulares: string[] = [];
        var values: (string | number)[][] = [];
        var index = 0;

        var mapEstados = new Map<string, IMedicion>();

        estados.forEach(({ values, key }, index) => {

            var findStateFilter = false;
            if (filter !== undefined) {
                filter.forEach((filtro) => {
                    if (filtro === key) {
                        findStateFilter = true;
                    }
                })
            } else {
                findStateFilter = true;
            }

            if (findStateFilter) {
                titulares.push(key);
                mapEstados.set(key, {
                    index: 0,
                    estados: values
                });
            }

        });

        var buscando = true;

        var currentObjectState: undefined | IEstado;
        var nextObjectState: undefined | IEstado;

        while (buscando) {

            var isFindObjectState = index < lastIndex;

            while (isFindObjectState) {

                titulares.forEach((titular) => {
                    var estadoArray = mapEstados.get(titular) as IMedicion;
                    var lastState = estadoArray.estados[estadoArray.index];

                    if (currentObjectState === undefined && lastState.index === index) {
                        currentObjectState = lastState;
                    }

                    if (currentObjectState !== undefined && nextObjectState === undefined) {
                        var nFindNextState = false;

                        const nIndex = index + 1
                        if (lastState.index === nIndex && currentObjectState.index !== lastState.index) {
                            nextObjectState = lastState;
                            nFindNextState = true;
                        }

                        if (nFindNextState === false) {
                            const nextIndex = estadoArray.index + 1;
                            if (nextIndex < estadoArray.estados.length) {
                                var nextState = estadoArray.estados[nextIndex];
                                if (nextState.index === nIndex && currentObjectState.index !== nextState.index) {
                                    nextObjectState = nextState;
                                }
                            }
                        }
                    }


                })

                if ((currentObjectState === undefined || nextObjectState === undefined) && index + 1 < lastIndex) {
                    index++;
                } else if (currentObjectState !== undefined && nextObjectState !== undefined) {
                    isFindObjectState = false
                } else {
                    isFindObjectState = false;
                }

            }

            let valoresCount = [] as (string | number)[]
            titulares.forEach((titular) => {

                let estadoArray = mapEstados.get(titular) as IMedicion;
                let lastState = estadoArray.estados[estadoArray.index];
                const nextIndex = estadoArray.index + 1;

                if (lastState.index <= index) {
                    valoresCount.push(lastState.value)
                } else {
                    valoresCount.push("")
                }

                if (nextObjectState && nextIndex < estadoArray.estados.length) {
                    var nextState = estadoArray.estados[nextIndex];

                    if (nextState.time <= nextObjectState.time && nextState.index <= nextObjectState.index) {
                        estadoArray.index++
                    }

                }


            });

            const isChangeTime =
                (currentObjectState !== undefined && nextObjectState !== undefined
                    && currentObjectState.time !== nextObjectState.time) || nextObjectState === undefined
                    ? "VERDADERO" : "";

            const lastTimeObject = currentObjectState ? currentObjectState.time : -1

            currentObjectState = nextObjectState;
            if (currentObjectState) {
                index = currentObjectState.index;
            }
            nextObjectState = undefined;

            if (currentObjectState === undefined && nextObjectState === undefined) {
                buscando = false;
            }

            const isLastState = buscando === true ? "" : "VERDADERO";

            values.push([isLastState, isChangeTime, lastTimeObject, ...valoresCount]);

        }

        titulares = ["LAST STATE", "LAST TIME", "TIEMPO P.", ...titulares] as string[];

        return { titulares, values }
    }

    toJSON() {
        var estados: { key: string, values: IEstado[] }[] = [];
        this.estados.forEach((estado, index) => {
            var key = index as any;
            estados.push({ key, values: estado })
        })
        const lastIndex = this.lastIndex;
        return {
            lastIndex,
            estados
        };
    }


}

export default EstadoManager;