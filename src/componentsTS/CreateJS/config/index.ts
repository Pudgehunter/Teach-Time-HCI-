import { Stage, Container } from 'createjs-module';

import "../styles/index.scss";

import "./index.scss";

/*--------------------------------------------------------------
## Interaccion
*Se ocupa de las interacciones hechas en HTML que usan canvas
--------------------------------------------------------------*/

class CreateJS {

    stage: Stage;
    contenedor: Container;
    canvas: HTMLCanvasElement;
    container: HTMLElement;

    constructor() {

        this.canvas = document.createElement("canvas");
        this.stage = new createjs.Stage(this.canvas);
        this.contenedor = new createjs.Container();
        this.stage.addChild(this.contenedor);
        this.container = document.createElement("div");
        this.container.appendChild(this.canvas);
        this.container.classList.add("CreateJS");
        this.size(1280, 720);
    }

    size(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    incluirEn(elemento: HTMLElement) {
        elemento.append(this.canvas);
    }

    getContainer() {
        return this.container;
    }

    update() {
        this.stage.update();
    }

    getCanvas() {
        return this.canvas;
    }

}

export default CreateJS;