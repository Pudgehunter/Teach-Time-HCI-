class Tiempo {

    interval?: NodeJS.Timeout;

    timeObserves: (() => void)[];

    tiempo: number;

    constructor(tiempo?: number) {
        this.tiempo = tiempo !== undefined ? tiempo : 0;
        this.timeObserves = [];
    }

    addObserver(observer: () => void) {
        this.timeObserves.push(observer);
    }

    start() {
        this.interval = setInterval(() => {
            this.tiempo += 100;

            this.timeObserves.forEach(d => {
                d();
            })

        }, 100);
    }

    temporizador(tiempo: number, load?: () => void) {
        this.tiempo = tiempo;

        this.interval = setInterval(() => {
            this.tiempo -= 100;

            this.timeObserves.forEach(d => {
                d();
            })

            if (this.tiempo <= 0) {
                this.tiempo = 0;

                this.stop();
                load && load();
            }

        }, 100);
    }

    stop(load?: () => void) {
        if (this.interval) {
            clearInterval(this.interval);
            load && load();
        }
    }

    reset() {
        this.stop();
        this.tiempo = 0;
    }

    getTiempoFormat() {
        let minutos = Math.floor(this.tiempo / 60000);
        let segundos = Math.round(this.tiempo / 1000) - (minutos * 60)
        return {
            minutos, segundos
        }
    }

}

export default Tiempo;