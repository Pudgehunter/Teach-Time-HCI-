import p5 from 'p5';

import IProcessingActividad from '../types/IProcessingActivity';
import INavegacionAction from "../../Navegacion/types/INavegacionAction";

import ProcessingView from '../view';

import "./index.scss";

class Processing implements INavegacionAction {

    app: p5;
    canvas?: p5.Renderer;
    main?: IProcessingActividad;
    container: HTMLDivElement;

    pantalla?: ProcessingView;

    isDestroy = false;

    sizeInit = {
        width: 1280,
        height: 720
    }

    exeInit = {
        preload: false,
        setup: false
    }

    constructor() {
        this.app = new p5(() => { });
        this.container = document.createElement("div");
        this.container.classList.add("Processing");
    }

    initProcessing() {

        console.log("Processing inicializado")
        /*
        this.app.preload = () => {
            this.onPreload();
        }

        this.app.setup = () => {
            this.onSetup();
        }
        */

        this.app.draw = () => {
            if (this.isDestroy === false) {
                this.onDraw();
            }
        }

        this.app.mouseClicked = () => {
            if (this.isDestroy === false) {
                this.onMouseClicked();
            }
        }

        this.app.mousePressed = () => {
            if (this.isDestroy === false) {
                this.onMousePressed();
            }
        }

        this.app.mouseReleased = () => {
            if (this.isDestroy === false) {
                this.onMouseReleased();
            }
        }

        this.app.mouseMoved = () => {
            if (this.isDestroy === false) {
                this.onMouseMoved();
            }
        }

        this.app.mouseDragged = () => {
            if (this.isDestroy === false) {
                this.onMouseDragged();
            }
        }

        this.app.keyPressed = () => {
            if (this.isDestroy === false) {
                this.onKeyPressed();
            }
        }

        this.app.keyReleased = () => {
            if (this.isDestroy === false) {
                this.onKeyReleased();
            }
        }


        return this.app;
    }

    size(width: number, height: number) {
        this.sizeInit = {
            width, height
        }
    }

    setMain(main: IProcessingActividad) {
        this.main = main;
    }

    onPreload() {
        if (this.main && this.main.preload) {
            this.main.preload(this.app);
        }
    }

    onSetup() {
        if (this.app) {
            this.canvas = this.app.createCanvas(this.sizeInit.width, this.sizeInit.height);
        }

        if (this.canvas) {
            this.canvas.parent(this.container);

            this.canvas.style("visibility", "visible");
            this.canvas.attribute("data-hidden", "false");
            this.canvas.show();
        }

        if (this.main && this.main.setup) {
            this.main.setup(this.app);
        }
    }

    onDraw() {

        if (!this.exeInit.preload) {
            this.exeInit.preload = true;
            this.onPreload();
        }

        if (!this.exeInit.setup) {
            this.exeInit.setup = true;
            this.onSetup();
        }

        if (this.main && this.main.draw) {
            this.main.draw(this.app);
        }

        if (this.pantalla) {

            if (!this.pantalla.exeInit.preload) {
                this.pantalla.exeInit.preload = true;
                if (this.pantalla.pantalla.preload) {
                    this.pantalla.pantalla.preload(this.app);
                }
            }

            if (!this.pantalla.exeInit.setup) {
                this.pantalla.exeInit.setup = true;
                if (this.pantalla.pantalla.setup) {
                    this.pantalla.pantalla.setup(this.app);
                }
            }

            if (this.pantalla.pantalla.draw) {
                this.pantalla.pantalla.draw(this.app);
            }

        }
    }

    onMouseClicked() {
        if (this.main && this.main.mouseClicked) {
            this.main.mouseClicked(this.app);
        }
        if (this.pantalla && this.pantalla.pantalla.mouseClicked) {
            this.pantalla.pantalla.mouseClicked(this.app);
        }
    }


    onMouseMoved() {
        if (this.main && this.main.mouseMoved) {
            this.main.mouseMoved(this.app);
        }
        if (this.pantalla && this.pantalla.pantalla.mouseMoved) {
            this.pantalla.pantalla.mouseMoved(this.app);
        }
    }


    onMousePressed() {
        if (this.main && this.main.mousePressed) {
            this.main.mousePressed(this.app);
        }
        if (this.pantalla && this.pantalla.pantalla.mousePressed) {
            this.pantalla.pantalla.mousePressed(this.app);
        }
    }

    onMouseReleased() {
        if (this.main && this.main.mouseReleased) {
            this.main.mouseReleased(this.app);
        }
        if (this.pantalla && this.pantalla.pantalla.mouseReleased) {
            this.pantalla.pantalla.mouseReleased(this.app);
        }
    }

    onMouseDragged() {
        if (this.main && this.main.mouseDragged) {
            this.main.mouseDragged(this.app);
        }
        if (this.pantalla && this.pantalla.pantalla.mouseDragged) {
            this.pantalla.pantalla.mouseDragged(this.app);
        }
    }

    onKeyPressed() {
        if (this.main && this.main.keyPressed) {
            this.main.keyPressed(this.app);
        }
        if (this.pantalla && this.pantalla.pantalla.keyPressed) {
            this.pantalla.pantalla.keyPressed(this.app);
        }
    }

    onKeyReleased() {
        if (this.main && this.main.keyReleased) {
            this.main.keyReleased(this.app);
        }
        if (this.pantalla && this.pantalla.pantalla.keyReleased) {
            this.pantalla.pantalla.keyReleased(this.app);
        }
    }

    setPantalla(pantalla?: ProcessingView) {

        if (this.pantalla) {
            this.pantalla.elementsHTML.forEach(e => {
                if (e.parentNode === this.container) {
                    this.container.removeChild(e);
                }
            })
        }

        this.pantalla = pantalla;

        if (this.pantalla) {
            this.pantalla.elementsHTML.forEach(e => {
                this.container.append(e);
            })
        }

    }

    getContainer() {
        return this.container;
    }

    getApp() {
        return this.app;
    }

    onDestroy() {
        this.app.noLoop();
        this.app.removeElements();
        this.app.noCanvas();
        this.isDestroy = true;
    }

}

export default Processing;





