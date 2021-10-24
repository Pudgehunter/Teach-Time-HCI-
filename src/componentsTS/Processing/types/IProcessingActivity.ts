import p5 from "p5";

interface IProcessingActividad {

    preload?: (app: p5) => void;

    setup?: (app: p5) => void;

    draw?: (app: p5) => void;

    mouseClicked?: (app: p5) => void;

    mousePressed?: (app: p5) => void;

    mouseReleased?: (app: p5) => void;

    mouseMoved?: (app: p5) => void;

    mouseDragged?: (app: p5) => void;

    keyPressed?: (app: p5) => void;

    keyReleased?: (app: p5) => void;
}

export default IProcessingActividad;