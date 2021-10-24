import React from 'react';
import ProcessingView from '../../Processing/view';
import ViewPantalla from '../view/index';

import ViewJSX from '../view/index';


import "./index.scss";

class JSXElemento {

    pantalla?: ViewJSX | ProcessingView;
    container: HTMLElement;
    fsetJSX?: (elemento: JSX.Element) => void;

    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("JSX");
    }

    setPantalla(pantalla?: ViewJSX) {

        this.pantalla = pantalla;
        if (this.pantalla && this.fsetJSX) {
            this.container.innerHTML = "";
            this.fsetJSX(this.pantalla.HTML);
        } else {

            var HTMLVacio = <></>;
            if (this.fsetJSX) {
                this.fsetJSX(HTMLVacio);
            }
            this.pantalla = undefined;
        }
    }


    setPantallaProcessing(pantalla?: ProcessingView) {

        this.pantalla = pantalla;
        if (this.pantalla && this.pantalla.HTML && this.fsetJSX) {
            this.fsetJSX(this.pantalla.HTML);
        } else {
            var HTMLVacio = <></>;
            if (this.fsetJSX) {
                this.fsetJSX(HTMLVacio);
            }
            this.pantalla = undefined;
            // this.container.innerHTML = "";
        }
    }

    setStatePantalla(setJSX: (elemento: JSX.Element) => void) {
        this.fsetJSX = setJSX;
    }

    getContainer() {
        return this.container;
    }

}

export default JSXElemento;