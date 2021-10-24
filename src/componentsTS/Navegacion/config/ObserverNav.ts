import Registro from "../../../contants/resultados/Registro";
import ListGeneral from "../../../contants/simulations/ListGeneral";
import InteractionStructure from "../../../contants/simulations/types/InteractionStructure";


interface IInteractionTest {
    UID: string;
    UIDActivity: string;
    interaccion: InteractionStructure;
    props: Object;
    config: Object;
}

interface IInteractionTestFirebase {
    UID: string;
    UIDActivity: string;
    props: Object;
    config: Object;
}

class ObserverNav {

    interacciones: IInteractionTest[];
    index: number;
    currentInteraction?: IInteractionTest;
    registro: Registro;

    constructor() {
        this.interacciones = [];
        this.index = -1;
        this.registro = new Registro("");
    }

    onNext(): IInteractionTest | undefined {
        this.index++
        const index = this.index;
        const interaccion = this.interacciones[index];
        this.currentInteraction = interaccion;
        return this.currentInteraction;
    }

    onBack() {

    }

    loadInformationTest(allData: IInteractionTestFirebase[]) {

        allData.forEach((data) => {

            const interacion = Object.assign({}, ListGeneral.get(data.UIDActivity));

            if (interacion) {
                const actividad: IInteractionTest = { ...data, interaccion: interacion }
                this.interacciones.push(actividad);
            }
        })

        console.log("LAS INTERACCION", this.interacciones)

    }



}

export default ObserverNav;