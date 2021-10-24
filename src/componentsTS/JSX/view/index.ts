import TSNavegador from "../../Navegacion/navegador";
import { IPantallaModule } from "../../Navegacion/types/INavegacionPantalla";


class JSXView implements IPantallaModule {

    navegador: TSNavegador;
    HTML: JSX.Element;

    constructor(navegador: TSNavegador, HTML: JSX.Element) {
        this.navegador = navegador;
        this.HTML = HTML;
    }

    iniciar() {

        var { JSX, container } = this.navegador;

        if (JSX) {
            JSX.setPantalla(this);
        }

    }

    finalizar() {

        var { JSX, container } = this.navegador;

        if (JSX) {
            JSX.setPantalla(undefined);
        }

        //container.innerHTML = "";

    }

}

export default JSXView;