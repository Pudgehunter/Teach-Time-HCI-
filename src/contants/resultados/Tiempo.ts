class Tiempo {

    tiempo: number;

    intervalo?: NodeJS.Timeout;

    constructor(tiempo?: number) {
        this.tiempo = tiempo ? tiempo : 0;
    }

    start() {
        this.intervalo = setInterval(() => {
            this.tiempo += 100;

        }, 100);
    }


    stop() {
        if (this.intervalo) {
            clearInterval(this.intervalo);
        }
    }
}

export default Tiempo;