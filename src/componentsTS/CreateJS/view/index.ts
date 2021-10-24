import TSNavegador from "../../Navegacion/navegador";
import { IPantallaModule } from "../../Navegacion/types/INavegacionPantalla";

class CreateJSView implements IPantallaModule {

    navegador: TSNavegador;
    actividad: CreateJSActividad;

    constructor(navegador: TSNavegador, actividad: CreateJSActividad) {
        this.navegador = navegador;
        this.actividad = actividad;
    }

    iniciar() {

        var { createJS, container } = this.navegador;

        if (createJS) {
            // container.innerHTML = "";
            container.appendChild(createJS.getContainer());

            var stage = createJS.stage;

            stage.removeAllChildren();

            stage.addChild(this.actividad.getContainer());

            if (this.actividad.onStartInit) {
                this.actividad.onStartInit();
            }

            stage.update();
        }



    }

    finalizar() {

        var { createJS, container } = this.navegador;

        if (createJS) {

            //container.innerHTML = "";
            var parent = createJS.getContainer().parentNode;
            if (parent && parent === container) {
                container.removeChild(createJS.getContainer());
            }

            var stage = createJS.stage;

            stage.removeAllChildren();

            stage.update();
        }

    }

}

export interface CreateJSActividad {
    getContainer: () => createjs.Container;
    onStartInit?: () => void;
}


export default CreateJSView;