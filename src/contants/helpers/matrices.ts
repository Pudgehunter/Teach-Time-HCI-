/*--------------------------------------------------------------
## Interfaz Posicion

# Caracteriticas de un vector con coordenadas y un tamaño definido
--------------------------------------------------------------*/


interface Posicion {
    x: number;
    y: number;
    width: number;
    height: number;
}

/*--------------------------------------------------------------
## metodo crearMatrix

#crea un arreglo con posiciones (x, y) con un tamaño definido
--------------------------------------------------------------*/

export function crearMatrix(columas_inicial: number, filas_inicial: number, width_inicial: number, height_inicial: number) {

    //Inicializacion de las variables
    let columnas_total = columas_inicial;
    let filas_total = filas_inicial;
    let width = width_inicial;
    let height = height_inicial;
    let columna = 0;
    let fila = 0;

    //Tamaño total del numero de bloques
    let length = columnas_total * filas_total;
    let arreglo: Array<Posicion> = new Array();

    //Distribucion de las posiciones
    for (let i = 0; i < length; i++) {

        //Asignacion de la coordenada en X
        let posx = columna * width;
        //Asignacion de la coordenada en Y
        let posy = fila;

        //Creación de un vector de posicion (x, y) con el Tamaño
        let pos = { x: posx, y: posy, width: width, height: height };

        //Se alamacena el vector creado
        arreglo.push(pos);

        //Asignacion de la secuecia
        columna++;
        //Reseteo de la secuencia cuando llega a los bordes
        if (columna == columnas_total) {
            columna = 0;
            fila += height;
        }
       
    }
    return arreglo;
}

/*--------------------------------------------------------------
## metodo matrixImagen

#A partir de una imagen puede dividirla en fragmentos de la misma en cuadrados de un tamaño definido
#Devuelve una arreglo de imagenes fragmentos de la original SIN coordenadas (x,y)
--------------------------------------------------------------*/

export function matrixImagen(url: string, width: number, height: number, columnas: number, filas: number) {

    //Inicializacion de las variables
    let imagenes = new Array<HTMLElement>();
    let columna = 0;
    let fila = 0;
    let image = document.createElement("div");

    // Cargar la imagen base de la division
    image.style.backgroundImage = `url(${url})`;
    // Asignacion del tamaño de los fragmentos
    image.style.width = width + "px";
    image.style.height = height + "px";
    image.style.position = "absolute";

    //Tamaño total del numero de bloques
    let length = filas * columnas;

    //Creacion de los fragmentos
    for (let i = 0; i < length; i++) {

        //Creacion del contenedor base que contiene el fragmento
        let contenedor = document.createElement('div');
        contenedor.style.position = "relative";
        contenedor.style.width = (width + 1) + "px";
        contenedor.style.height = (height + 1) + "px";
        contenedor.style.overflow = "hidden";

        //Se clona el original para señalar uno mas especifico
        let fragmentoImg: HTMLElement = <HTMLElement>image.cloneNode();

        //Posicion del nuevo fragmento
        fragmentoImg.style.backgroundPositionX = -(columna * width) + "px";
        fragmentoImg.style.backgroundPositionY = fila + "px";

        contenedor.append(fragmentoImg);
        imagenes.push(contenedor);

        //Asignacion de la secuecia
        columna++;
        //Reseteo de la secuencia cuando llega a los bordes
        if (columna == columnas) {
            columna = 0;
            fila -= height;
        }
    }

    return imagenes;
}

/*--------------------------------------------------------------
## metodo matrixFija

#A partir de una imagen puede dividirla en fragmentos de la misma en cuadrados de un tamaño definido con posiciones definidas
#Devuelve una arreglo de imagenes fragmentos de la original CON coordenadas (x,y)
--------------------------------------------------------------*/

export function matrixFija(url: string, width: number, height: number, columnas: number, filas: number) {
    let matrix = crearMatrix(columnas, filas, width, height);

    let imagenes = new Array<HTMLElement>();
    let columna = 0;
    let fila = 0;

    let image = document.createElement("div");
    // Cargar la imagen base de la division
    image.style.backgroundImage = `url(${url})`;

    image.style.width = width + "px";
    image.style.height = height + "px";
    image.style.position = "absolute";

    //Tamaño total del numero de bloques
    let length = filas * columnas;

    //Creacion de los fragmentos
    for (let i = 0; i < length; i++) {

        let contenedor = document.createElement('div');
        contenedor.style.position = "absolute";
        contenedor.style.overflow = "hidden";

        //Se clona el original para señalar uno mas especifico
        let fragmentoImg: HTMLElement = <HTMLElement>image.cloneNode();

        //Posicion del nuevo fragmento
        fragmentoImg.style.backgroundPositionX = -(columna * width) + "px";
        fragmentoImg.style.backgroundPositionY = fila + "px";

        //Posicion estatica del contenedor
        contenedor.style.left = matrix[i].x + "px";
        contenedor.style.top = matrix[i].y + "px";
        contenedor.style.width = matrix[i].width + "px";
        contenedor.style.height = matrix[i].height + "px";

        contenedor.append(fragmentoImg);
        imagenes.push(contenedor);

        //Asignacion de la secuecia
        columna++;
        //Reseteo de la secuencia cuando llega a los bordes
        if (columna == columnas) {
            columna = 0;
            fila -= height;
        }
    }

    return imagenes;
}