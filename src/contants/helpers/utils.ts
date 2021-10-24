
/*--------------------------------------------------------------
## Funciones Matematicas
--------------------------------------------------------------*/
export function selector(ubicacion: string) {
    let u: any = document.querySelector(ubicacion);
    return u;
}

export function selectorAll(ubicacion: string) {
    let u = document.querySelectorAll(ubicacion);
    return u;
}

// Convierte de grados a radianes
export function radians(degrees: number) {
    return degrees * Math.PI / 180;
};

// Convierte de radianes a grados
export function degrees(radians: number) {
    return radians * 180 / Math.PI;
};

// Desordena una lista de elementos o que este en un objeto de tipo Array
export function shuffle(array: any) {
    array.sort(function () { return Math.random() - 0.5; });
    return array;
}

// Crea un numero ramdon entre un minimo y un maximo 
export function random(minimo: number, maximo: number) {
    return Math.round(Math.random() * (maximo - minimo) + minimo);
}

//Convierte un color en HSV to RGB
export function hsvToRgb(h: any, s: any, v: any) {
    var r, g, b;
    var i;
    var f, p, q, t;

    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));

    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;

    if (s === 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }

    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;

        case 1:
            r = q;
            g = v;
            b = p;
            break;

        case 2:
            r = p;
            g = v;
            b = t;
            break;

        case 3:
            r = p;
            g = q;
            b = v;
            break;

        case 4:
            r = t;
            g = p;
            b = v;
            break;

        default: // case 5:
            r = v;
            g = p;
            b = q;
    }

    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}

export class ControlEvent {

    acciones: Array<any>;

    constructor() {
        this.acciones = [];
    }


    add(accion: Function) {
        this.acciones.push({ accion: accion, ejecucion: false });
        this.ejecutar();
    }

    ejecutar() {

        if (this.acciones.length > 0) {
            if (this.acciones[0].ejecucion === false) {
                this.acciones[0].ejecucion = true;
                this.acciones[0].accion();
                this.ejecutar();
                this.acciones.splice(0, 1);
            }
        }

    }
}