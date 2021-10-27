import { finished } from "stream";
import imgUtil from "./utilImg";

class JuegoVirtual {

    // Atributos de pantalla.
    totalWidth = 1280;
    totalHeight = 720;

    //puntajes del profesor.
    puntajesProfe = 0;

    //nota del estudiante.

    //pantalla
    preguntas = 0;
    pantallaFeedbacks = null;
    notaPantalla = 0;
    notaEstudiante = [3];

    nivelrp = [3];

    //Para validar que se puede clickear esa vaina
    responderBoolean = false;

    responderEstudiante1 = false;
    responderEstudiante2 = false;
    responderEstudiante3 = false;

    //Para evitar errores


    constructor(actividad) {
        this.actividad = actividad;
    }

    preload(app) {
        //Load images
        //First page
        //Background
        this.pages = 0;
        this.bg = app.loadImage(imgUtil.inicio);

        //UNABLE
        this.unable = app.loadImage(imgUtil.unable);
        //Nivel 1
        this.nivel = app.loadImage(imgUtil.nivel1);
        //Nivel 1: Feedbacks
        this.nivelstart = app.loadImage(imgUtil.nivel1start);
        this.nivelfbs = app.loadImage(imgUtil.nivel1fbs);
        //Nivel 1: Respuestas del profesor

        this.nivelrp[0] = null;
        this.nivelrp[1] = null;
        this.nivelrp[2] = null;

        //Nivel 1: Respuestas del estudiante
        this.nivelrs1 = null;
        this.nivelrs2 = null;
        this.nivelrs3 = null;

    }



    setup(app) {
        app.createCanvas(this.totalWidth, this.totalHeight);
        this.notaEstudiante[0] = 0;
        this.notaEstudiante[1] = 0;
        this.notaEstudiante[2] = 0;
    }

    draw(app) {

        app.image(this.bg, 0, 0);

        //console.log(app.mouseX, app.mouseY);

        //Validando esa vaina del profesor
        switch (this.pantallaFeedbacks) {
            case 0:
                app.image(this.nivelstart, 249, 135);
                break;
            case 1:
                app.image(this.nivelfbs, 260, 89);
                break;
            case 2:
                //Preguntas?
                switch (this.preguntas) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        //Se pinta las preguntas aqui
                        app.text(this.puntajesProfe, 83, 50);
                        app.text(this.notaEstudiante[0], 425, 415);
                        app.text(this.notaEstudiante[1], 649, 371);
                        app.text(this.notaEstudiante[2], 866, 409);
                        app.image(this.nivel, 53, 539);
                        app.image(this.nivelrp[0], 536, 539);
                        app.image(this.nivelrp[1], 776, 539);
                        app.image(this.nivelrp[2], 1016, 539);
                        break;
                    case 4:
                        app.textSize(48);
                        app.text(this.puntajesProfe*2, 600, 372);
                        break;
                }

                switch (this.notaPantalla) {
                    case 0:
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        app.image(this.nivelrs1, 202, 120);
                        app.image(this.nivelrs2, 590, 33);
                        app.image(this.nivelrs3, 899, 95);
                        break;

                }
                break;
        }


    }

    //Función: Para cambiar el imagen de las preguntas
    pintarPregunta(nulaNivel1, nulaNivel2, ruta2, ruta3, ruta4, app) {
        this.nivelrp[nulaNivel1] = app.loadImage(imgUtil.unable);
        this.nivelrp[nulaNivel2] = app.loadImage(imgUtil.unable);
        //Los estudiantes preguntan.
        this.nivelrs1 = app.loadImage(ruta2);
        this.nivelrs2 = app.loadImage(ruta3);
        this.nivelrs3 = app.loadImage(ruta4);
    }

    //Función: Para cambiar la imagen de las respuestas del profe
    pintarRespuestasProfe(ruta1, ruta2, ruta3, app) {
        this.nivelrp[0] = app.loadImage(ruta1);
        this.nivelrp[1] = app.loadImage(ruta2);
        this.nivelrp[2] = app.loadImage(ruta3);
    }

    //Función: Para cambiar el imagen de Feedback
    pintarFeedbacks(ruta1, ruta2, app) {
        this.nivelstart = app.loadImage(ruta1);
        this.nivelfbs = app.loadImage(ruta2);
    }

    mouseClicked(app) {

        //Opciones de preguntas
        //Page 0: Para ir a Inicio
        switch (this.pages) {
            case 0:
                if (app.mouseX > 399 && app.mouseX <= 399 + 482 && app.mouseY > 317 && app.mouseY <= 317 + 77) {
                    this.bg = app.loadImage(imgUtil.instrucciones);
                    this.pages = 1;
                }
                break;
            case 1:
                if (app.mouseX > 540 && app.mouseX <= 540 + 200 && app.mouseY > 425 && app.mouseY <= 425 + 63) {
                    this.bg = app.loadImage(imgUtil.instrucciones1);
                    this.pages = 2;
                }
                break;
            case 2:
                if (app.mouseX > 539 && app.mouseX <= 539 + 200 && app.mouseY > 447 && app.mouseY <= 447 + 63) {
                    this.bg = app.loadImage(imgUtil.instrucciones2);
                    this.pages = 3;
                }
                break;
            case 3:
                if (app.mouseX > 540 && app.mouseX <= 540 + 200 && app.mouseY > 447 && app.mouseY <= 447 + 63) {
                    this.bg = app.loadImage(imgUtil.instrucciones3);
                    this.pages = 4;
                }
                break;
            case 4:
                if (app.mouseX > 540 && app.mouseX <= 540 + 200 && app.mouseY > 447 && app.mouseY <= 447 + 63) {
                    this.bg = app.loadImage(imgUtil.instrucciones4);
                    this.pages = 5;
                }
                break;
            case 5:
                if (app.mouseX > 540 && app.mouseX <= 540 + 200 && app.mouseY > 447 && app.mouseY <= 447 + 63) {
                    this.bg = app.loadImage(imgUtil.bg);
                    this.pages = 10;
                    this.pantallaFeedbacks = 0;
                }
                break;
        }

        //Feedbacks?
        //Feedbacks del nivel 1?
        if (app.mouseX > 538 && app.mouseX <= 538 + 213 && app.mouseY > 345 && app.mouseY <= 345 + 40 && this.pantallaFeedbacks == 0) {
            this.pantallaFeedbacks = 1;
        }
        if (app.mouseX > 486 && app.mouseX <= 486 + 213 && app.mouseY > 366 && app.mouseY <= 366 + 40 && this.pantallaFeedbacks == 1) {
            console.log("Funciono");

            this.pantallaFeedbacks = 2;
            switch (this.preguntas) {
                case 0:
                    this.nivelrp[0] = app.loadImage(imgUtil.nivel1rp1);
                    this.nivelrp[1] = app.loadImage(imgUtil.nivel1rp2);
                    this.nivelrp[2] = app.loadImage(imgUtil.nivel1rp3);
                    break;
                case 1:
                    this.nivelrp[0] = app.loadImage(imgUtil.nivel2rp1);
                    this.nivelrp[1] = app.loadImage(imgUtil.nivel2rp2);
                    this.nivelrp[2] = app.loadImage(imgUtil.nivel2rp3);
                    break;
                case 2:
                    this.nivelrp[0] = app.loadImage(imgUtil.nivel3rp1);
                    this.nivelrp[1] = app.loadImage(imgUtil.nivel3rp2);
                    this.nivelrp[2] = app.loadImage(imgUtil.nivel3rp3);
                    break;
                case 3:
                    this.nivelrp[0] = app.loadImage(imgUtil.nivel4rp1);
                    this.nivelrp[1] = app.loadImage(imgUtil.nivel4rp2);
                    this.nivelrp[2] = app.loadImage(imgUtil.nivel4rp3);
                    break;
                case 4:

                    break;
            }
        }





        //1er opción del personaje
        //Menor a Mayor
        switch (this.preguntas) {
            case 0:
                //Incorrecta: 1era opción del personaje
                if (app.mouseX > 621 && app.mouseX <= 621 + 52 && app.mouseY > 662 && app.mouseY <= 662 + 25 && this.responderBoolean == false && this.pages == 10 && this.pantallaFeedbacks == 2) {
                    console.log("1er opción");

                    //Feedbacks al usuario
                    this.pintarPregunta(1, 2, imgUtil.nivel1rs1, imgUtil.nivel1rs2, imgUtil.nivel1rs3, app);
                    this.notaPantalla = 1;
                    this.responderBoolean = true;
                }
                //Correcta: 2da opción del personaje
                if (app.mouseX > 861 && app.mouseX <= 861 + 52 && app.mouseY > 662 && app.mouseY <= 662 + 25 && this.responderBoolean == false && this.pages == 10 && this.pantallaFeedbacks == 2) {
                    console.log("2do opción");
                    this.puntajesProfe = this.puntajesProfe + 10;

                    //Feedbacks al usuario
                    this.pintarPregunta(0, 2, imgUtil.nivel1rs1, imgUtil.nivel1rs2, imgUtil.nivel1rs3, app);
                    this.notaPantalla = 1;
                    this.responderBoolean = true;
                }
                //Incorrecta: 3er opción del personaje
                if (app.mouseX > 1101 && app.mouseX <= 1101 + 52 && app.mouseY > 662 && app.mouseY <= 662 + 25 && this.responderBoolean == false && this.pages == 10 && this.pantallaFeedbacks == 2) {
                    console.log("3er opción");

                    //Feedbacks al usuario
                    this.pintarPregunta(0, 1, imgUtil.nivel1rs1, imgUtil.nivel1rs2, imgUtil.nivel1rs3, app);
                    this.notaPantalla = 1;
                    this.responderBoolean = true;
                }
                break;

            case 1:
                //Incorrecta: 1era opción del personaje
                if (app.mouseX > 621 && app.mouseX <= 621 + 52 && app.mouseY > 662 && app.mouseY <= 662 + 25 && this.responderBoolean == false && this.pages == 10 && this.pantallaFeedbacks == 2) {
                    console.log("1er opción");
                    //Feedbacks al usuario
                    this.pintarPregunta(1, 2, imgUtil.nivel2rs1, imgUtil.nivel2rs2, imgUtil.nivel2rs3, app);
                    this.notaPantalla = 2;
                    this.responderBoolean = true;
                }
                //Incorrecta: 2da opción del personaje
                if (app.mouseX > 861 && app.mouseX <= 861 + 52 && app.mouseY > 662 && app.mouseY <= 662 + 25 && this.responderBoolean == false && this.pages == 10 && this.pantallaFeedbacks == 2) {
                    console.log("2do opción");

                    //Feedbacks al usuario
                    this.pintarPregunta(0, 2, imgUtil.nivel2rs1, imgUtil.nivel2rs2, imgUtil.nivel2rs3, app);
                    this.notaPantalla = 2;
                    this.responderBoolean = true;
                }
                //Correcta: 3er opción del personaje
                if (app.mouseX > 1101 && app.mouseX <= 1101 + 52 && app.mouseY > 662 && app.mouseY <= 662 + 25 && this.responderBoolean == false && this.pages == 10 && this.pantallaFeedbacks == 2) {
                    console.log("3er opción");
                    this.puntajesProfe = this.puntajesProfe + 10;

                    //Feedbacks al usuario
                    this.pintarPregunta(0, 1, imgUtil.nivel2rs1, imgUtil.nivel2rs2, imgUtil.nivel2rs3, app);
                    this.notaPantalla = 2;
                    this.responderBoolean = true;
                }
                break;

            case 2:
                //Correcta: 1era opción del personaje
                if (app.mouseX > 621 && app.mouseX <= 621 + 52 && app.mouseY > 662 && app.mouseY <= 662 + 25 && this.responderBoolean == false && this.pages == 10 && this.pantallaFeedbacks == 2) {
                    console.log("1er opción");
                    this.puntajesProfe = this.puntajesProfe + 10;
                    //Feedbacks al usuario
                    this.pintarPregunta(1, 2, imgUtil.nivel3rs1, imgUtil.nivel3rs2, imgUtil.nivel3rs3, app);
                    this.notaPantalla = 3;
                    this.responderBoolean = true;
                }
                //Incorrecta: 2da opción del personaje
                if (app.mouseX > 861 && app.mouseX <= 861 + 52 && app.mouseY > 662 && app.mouseY <= 662 + 25 && this.responderBoolean == false && this.pages == 10 && this.pantallaFeedbacks == 2) {
                    console.log("2do opción");

                    //Feedbacks al usuario
                    this.pintarPregunta(0, 2, imgUtil.nivel3rs1, imgUtil.nivel3rs2, imgUtil.nivel3rs3, app);
                    this.notaPantalla = 3;
                    this.responderBoolean = true;
                }
                //Incorrecta: 3er opción del personaje
                if (app.mouseX > 1101 && app.mouseX <= 1101 + 52 && app.mouseY > 662 && app.mouseY <= 662 + 25 && this.responderBoolean == false && this.pages == 10 && this.pantallaFeedbacks == 2) {
                    console.log("3er opción");

                    //Feedbacks al usuario
                    this.pintarPregunta(0, 1, imgUtil.nivel3rs1, imgUtil.nivel3rs2, imgUtil.nivel3rs3, app);
                    this.notaPantalla = 3;
                    this.responderBoolean = true;
                }
                break;

            case 3:
                //Incorrecta: 1era opción del personaje
                if (app.mouseX > 621 && app.mouseX <= 621 + 52 && app.mouseY > 662 && app.mouseY <= 662 + 25 && this.responderBoolean == false && this.pages == 10 && this.pantallaFeedbacks == 2) {
                    console.log("1er opción");
                    //Feedbacks al usuario
                    this.pintarPregunta(1, 2, imgUtil.nivel4rs1, imgUtil.nivel4rs2, imgUtil.nivel4rs3, app);
                    this.notaPantalla = 4;
                    this.responderBoolean = true;
                }
                //Incorrecta: 2da opción del personaje
                if (app.mouseX > 861 && app.mouseX <= 861 + 52 && app.mouseY > 662 && app.mouseY <= 662 + 25 && this.responderBoolean == false && this.pages == 10 && this.pantallaFeedbacks == 2) {
                    console.log("2do opción");

                    //Feedbacks al usuario
                    this.pintarPregunta(0, 2, imgUtil.nivel4rs1, imgUtil.nivel4rs2, imgUtil.nivel4rs3, app);
                    this.notaPantalla = 4;
                    this.responderBoolean = true;
                }
                //Correcta: 3er opción del personaje
                if (app.mouseX > 1101 && app.mouseX <= 1101 + 52 && app.mouseY > 662 && app.mouseY <= 662 + 25 && this.responderBoolean == false && this.pages == 10 && this.pantallaFeedbacks == 2) {
                    console.log("3er opción");
                    this.puntajesProfe = this.puntajesProfe + 10;

                    //Feedbacks al usuario
                    this.pintarPregunta(0, 1, imgUtil.nivel4rs1, imgUtil.nivel4rs2, imgUtil.nivel4rs3, app);
                    this.notaPantalla = 4;
                    this.responderBoolean = true;
                }
                break;
                case 4:
                    if (app.mouseX > 529 && app.mouseX <= 529 + 200 && app.mouseY > 400 && app.mouseY <= 400 + 63 && this.responderBoolean == false && this.pages == 10){
                        console.log("funciono para apagar");
                        this.actividad.addResult([{id:"LICENCIATURA", value: this.puntajesProfe*2}]);
                        this.actividad.addState("estadoDePaciente","true");
                        this.actividad.finish();
                    }
                    break;
        }

        //Los click para las notas
        //El yes del primer usuario

        switch (this.notaPantalla) {
            case 1:
            case 2:
            case 3:
            case 4:
                //Estudiante 1
                //Yes
                if (app.mouseX > 238 && app.mouseX <= 290 && app.mouseY > 233 && app.mouseY <= 259 && this.responderBoolean == true && this.responderEstudiante1 == false) {

                    this.responderEstudiante1 = true;
                    switch (this.notaPantalla) {
                        //INCORRECTA
                        case 1:
                            this.puntajesProfe = this.puntajesProfe - 5;
                            break;
                        //INCORRECTA
                        case 2:
                            this.puntajesProfe = this.puntajesProfe - 5;
                            break;
                        //CORRECTA
                        case 3:
                            this.puntajesProfe = this.puntajesProfe + 5;
                            break;
                        //INCORRECTA
                        case 4:
                            this.puntajesProfe = this.puntajesProfe - 5;
                            break;
                    }
                    this.notaEstudiante[0] = this.notaEstudiante[0] + 1.25;
                    this.nivelrs1 = app.loadImage(imgUtil.r1Unable);
                }//NO
                if (app.mouseX > 317 && app.mouseX <= 367 && app.mouseY > 233 && app.mouseY <= 259 && this.responderBoolean == true && this.responderEstudiante1 == false) {
                    //console.log("Funciona esta vaina");
                    switch (this.notaPantalla) {
                        //CORRECTA
                        case 1:
                            this.puntajesProfe = this.puntajesProfe + 5;
                            break;
                        //CORRECTA
                        case 2:
                            this.puntajesProfe = this.puntajesProfe + 5;
                            break;
                        //INCORRECTA
                        case 3:
                            this.puntajesProfe = this.puntajesProfe - 5;
                            break;
                        //CORRECTA
                        case 4:
                            this.puntajesProfe = this.puntajesProfe + 5;
                            break;
                    }
                    this.responderEstudiante1 = true;
                    this.nivelrs1 = app.loadImage(imgUtil.r1Unable);
                }
                //Estudiante 2
                //Yes
                if (app.mouseX > 625 && app.mouseX <= 677 && app.mouseY > 148 && app.mouseY <= 168 && this.responderBoolean == true && this.responderEstudiante2 == false) {
                    this.responderEstudiante2 = true;
                    switch (this.notaPantalla) {
                        //CORRECTA
                        case 1:
                            this.puntajesProfe = this.puntajesProfe + 5;
                            break;
                        //CORRECTA
                        case 2:
                            this.puntajesProfe = this.puntajesProfe + 5;
                            break;
                        case 3:
                            //INCORRECTA
                            this.puntajesProfe = this.puntajesProfe - 5;
                            break;
                        //INCORRECTA
                        case 4:
                            this.puntajesProfe = this.puntajesProfe - 5;
                            break;
                    }
                    this.notaEstudiante[1] = this.notaEstudiante[1] + 1.25;
                    this.nivelrs2 = app.loadImage(imgUtil.r1Unable);
                }//NO
                if (app.mouseX > 704 && app.mouseX <= 755 && app.mouseY > 148 && app.mouseY <= 168 && this.responderBoolean == true && this.responderEstudiante2 == false) {
                    this.responderEstudiante2 = true;
                    switch (this.notaPantalla) {
                        //INCORRECTA
                        case 1:
                            this.puntajesProfe = this.puntajesProfe - 5;
                            break;
                        //INCORRECTA
                        case 2:
                            this.puntajesProfe = this.puntajesProfe - 5;
                            break;
                        //CORRECTA
                        case 3:
                            this.puntajesProfe = this.puntajesProfe + 5;
                            break;
                        //CORRECTA
                        case 4:
                            this.puntajesProfe = this.puntajesProfe + 5;
                            break;
                    }
                    this.nivelrs2 = app.loadImage(imgUtil.r1Unable);
                }
                //Estudiante 3
                //Yes
                if (app.mouseX > 936 && app.mouseX <= 986 && app.mouseY > 207 && app.mouseY <= 231 && this.responderBoolean == true && this.responderEstudiante3 == false) {
                    this.responderEstudiante3 = true;
                    switch (this.notaPantalla) {
                        //CORRECTA
                        case 1:
                            this.puntajesProfe = this.puntajesProfe + 5;
                            break;
                        //INCORRECTA
                        case 2:
                            this.puntajesProfe = this.puntajesProfe - 5;
                            break;
                        //CORRECTA
                        case 3:
                            this.puntajesProfe = this.puntajesProfe + 5;
                            break;
                        //CORRECTA
                        case 4:
                            this.puntajesProfe = this.puntajesProfe + 5;
                            break;
                    }
                    this.notaEstudiante[2] = this.notaEstudiante[2] + 1.25;
                    this.nivelrs3 = app.loadImage(imgUtil.r2Unable);
                } //No
                if (app.mouseX > 1014 && app.mouseX <= 1066 && app.mouseY > 207 && app.mouseY <= 231 && this.responderBoolean == true && this.responderEstudiante3 == false) {
                    this.responderEstudiante3 = true;
                    switch (this.notaPantalla) {
                        //INCORRECTA
                        case 1:
                            this.puntajesProfe = this.puntajesProfe - 5;
                            break;
                        //CORRECTA
                        case 2:
                            this.puntajesProfe = this.puntajesProfe + 5;
                            break;
                        //INCORRECTA
                        case 3:
                            this.puntajesProfe = this.puntajesProfe - 5;
                            break;
                        //INCORRECTA
                        case 4:
                            this.puntajesProfe = this.puntajesProfe - 5;
                            break;
                    }
                    this.nivelrs3 = app.loadImage(imgUtil.r2Unable);
                }
                break;
        }

        if (this.responderEstudiante1 == true && this.responderEstudiante2 == true && this.responderEstudiante3 == true) {
            switch (this.notaPantalla) {
                case 1:
                    console.log("pinto nivel 2");
                    this.preguntas = 1;
                    this.nivel = app.loadImage(imgUtil.nivel2);
                    this.pintarFeedbacks(imgUtil.nivel2start, imgUtil.nivel2fbs, app);
                    this.pantallaFeedbacks = 0;
                    break;
                case 2:
                    console.log("pinto nivel 3");
                    this.preguntas = 2;
                    this.nivel = app.loadImage(imgUtil.nivel3);
                    this.pintarFeedbacks(imgUtil.nivel3start, imgUtil.nivel3fbs, app);
                    this.pantallaFeedbacks = 0;
                    break;
                case 3:
                    this.preguntas = 3;
                    console.log("pinto nivel 4");
                    this.nivel = app.loadImage(imgUtil.nivel4);
                    this.pintarFeedbacks(imgUtil.nivel4start, imgUtil.nivel4fbs, app);
                    this.pantallaFeedbacks = 0;
                    break;
                case 4:
                    this.preguntas = 4;
                    
                    this.bg = app.loadImage(imgUtil.end);
                    break;
            }

            this.notaPantalla = 0;
            this.responderBoolean = false;
            this.responderEstudiante1 = false;
            this.responderEstudiante2 = false;
            this.responderEstudiante3 = false;
        }

    }

}



export default JuegoVirtual;