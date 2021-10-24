import { CreateJSActividad } from '../../CreateJS/view';
import IProcessingActividad from '../../Processing/types/IProcessingActivity';
import TSNavegador from '../navegador/index';

import "./index.scss";

class Navegador {


    container: HTMLDivElement;
    sizeConfig = { width: 1200, height: 700 };
    config = new TSNavegador();

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("Navegador");
    }

    nameInitDefaul?: string | number;


    init(name?: string | number) {
        this.nameInitDefaul = name;
    }

    initProcessing() {
        return this.config.initProcessing();
    }

    initCreateJS() {
        return this.config.initCreateJS();
    }

    initJSX(setJSX: (elemento: JSX.Element) => void) {
        return this.config.initJSX(setJSX);
    }

    addPROCESSING(pantalla: IProcessingActividad, nombre?: string) {
        this.initProcessing();
        return this.config.addPROCESSING(pantalla, nombre);
    }

    addHTML(pantalla: HTMLElement, nombre?: string) {
        this.config.addHTML(pantalla, nombre);
    }

    addJSX(pantalla: JSX.Element, nombre?: string) {
        this.config.addJSX(pantalla, nombre);
    }

    addJSXAndProcessing(pantalla: JSX.Element, processing: IProcessingActividad, nombre?: string) {
        this.config.addProcessingAndJSX(pantalla, processing, nombre);
    }

    addCREATEJS(pantalla: CreateJSActividad, nombre?: string) {
        this.config.addCREATEJS(pantalla, nombre);
    }

    setContainer(container?: HTMLDivElement) {
        if (container) {
            this.config.setContainer(container);
        }
    }

    onDestroy(){
        this.config.onDestroy()
    }

    next() {
        this.config.next()
    }

    back() {
        this.config.back()
    }

    goTo(index: number) {
        this.config.goTo(index)
    }

    goName(name: string) {
        this.config.goName(name)
    }

}


export default Navegador;