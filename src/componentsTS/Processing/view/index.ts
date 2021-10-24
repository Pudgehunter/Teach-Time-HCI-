import TSNavegador from '../../Navegacion/navegador';
import { IPantallaModule } from '../../Navegacion/types/INavegacionPantalla';
import IProcessingActividad from '../types/IProcessingActivity';

class ProcessingView implements IPantallaModule {

    navegador: TSNavegador;
    pantalla: IProcessingActividad;
    exeInit = {
        preload: false,
        setup: false
    }

    elementsHTML: HTMLElement[]
    HTML?: JSX.Element;

    constructor(navegador: TSNavegador, pantalla: IProcessingActividad, HTML?: JSX.Element) {
        this.navegador = navegador;
        this.pantalla = pantalla;
        this.elementsHTML = [];
        this.HTML = HTML;
    }

    iniciar() {

        const { JSX, processing, container } = this.navegador;

        if (processing) {

            if (this.HTML && JSX) {
                JSX.setPantallaProcessing(this);
            }

            processing.setPantalla(this);
            container.append(processing.getContainer());

        }

    }

    finalizar() {

        var { JSX, processing, container } = this.navegador;

        if (processing) {
            var parent = processing.getContainer().parentNode;
            if (parent && parent === container) {
                container.removeChild(processing.getContainer());
            }
        }

        if (processing) {
            processing.setPantalla(undefined);
        }

        if (this.HTML !== undefined && JSX) {
            JSX.setPantalla(undefined);
        }

    }

}

export default ProcessingView;