import ViewPantalla from '../view/index';
import "./index.scss";

class HTMLDisplay {

    pantalla?: ViewPantalla;
    container: HTMLElement;

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("HTML");
    }

    setPantalla(pantalla?: ViewPantalla) {

        this.pantalla = pantalla;

        if (pantalla) {
            this.container.appendChild(pantalla.HTML);
        }
        
    }

    getContainer() {
        return this.container;
    }

}

export default HTMLDisplay;