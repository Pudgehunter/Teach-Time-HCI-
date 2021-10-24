import TSNavegador from "../../Navegacion/navegador";
import { IPantallaModule } from "../../Navegacion/types/INavegacionPantalla";

class HTMLView implements IPantallaModule {

    navegador: TSNavegador;
    HTML: HTMLElement;

    constructor(navegador: TSNavegador, HTML: HTMLElement) {
        this.navegador = navegador;
        this.HTML = HTML;
    }

    iniciar() {

        const { HTML, container } = this.navegador;

        container.append(HTML.getContainer());
        HTML.setPantalla(this);

    }

    finalizar() {

        var { HTML, container } = this.navegador;

        if (HTML) {
            var containerHTML = HTML.getContainer();

            var containerHTMLTHIS = this.HTML;
            var parentTHIS = containerHTMLTHIS.parentNode;

            if (parentTHIS && parentTHIS === containerHTML) {
                containerHTML.removeChild(containerHTMLTHIS);
            }

            var parent = containerHTML.parentNode;

            if (parent && parent === container) {
                container.removeChild(containerHTML);
            }

            HTML.setPantalla(undefined);
        }

    }

}

export default HTMLView;