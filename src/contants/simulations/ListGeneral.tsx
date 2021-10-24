import Actividad from "../../components/Actividad/Actividad";
import InteractionStructure from "./types/InteractionStructure";

const ListGeneral: Map<string, InteractionStructure> = new Map();
const ListGeneralArray: InteractionStructure[] = [];

const prueba1: InteractionStructure = {
    UID: "1",
    title: "Prueba",
    image: "/logo512.png",
    actividad: Actividad,
    tags: ["a", "b"],
    defaultMaximos: [{ id: "x", value: 100 }]
}

ListGeneralArray.push(prueba1)

const prueba2: InteractionStructure = {
    UID: "2",
    title: "Prueba2",
    image: "/logo512.png",
    actividad: Actividad,
    tags: ["a", "b"],
    defaultMaximos: [{ id: "x", value: 100 }]
}

ListGeneralArray.push(prueba2)


ListGeneralArray.map((actividad) => {
    ListGeneral.set(actividad.UID, actividad)
})

export default ListGeneral;