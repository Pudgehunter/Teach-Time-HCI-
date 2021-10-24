import React, { useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import createContext, { IPropsState } from "../../Context";
import SliderActivityContext, { SliderActivityContextExist } from "../../SliderActivity/SliderActivityContext";
import ActividadTS from "./ActividadTS";

interface IPropsContext {
    useActividad: IPropsState<ActividadTS>
    useJSX: IPropsState<JSX.Element>
    refContainer: React.MutableRefObject<any>;
}

const { Provider, Consumer } = createContext<IPropsContext>();

export const ActividadContextProvider = (props: React.Props<any>) => {

    const SliderContext = SliderActivityContextExist();
    const nextActivity = SliderContext ? SliderContext.nextActivity : () => { };

    const observer = SliderContext ? SliderActivityContext().useObserver()[0] : undefined;

    const useActividad = useState(new ActividadTS(observer))
    const [actividad] = useActividad;



    const useJSX = useState(<></>)
    const refContainer = useRef<HTMLElement | any>()

    const [JSX, setJSX] = useJSX;


    useEffect(() => {
        const HTMLContainer = refContainer.current;
        if (HTMLContainer !== undefined) {
            actividad.setContainer(HTMLContainer)
        }

        actividad.setFinish(() => {
            nextActivity()
        })

        actividad.initJSX(setJSX)

        actividad.config.init(actividad.nameInitDefaul);

        return () => {
            actividad.onDestroy();
        }

    }, [])


    const value = useMemo(() => {

        return {
            useActividad: () => useActividad,
            useJSX: () => useJSX,
            refContainer
        }

    }, [
        actividad,
        JSX
    ])

    return <Provider value={value}>
        <div className="Actividad">
            <div ref={refContainer}>
                {Array.isArray(props.children) ? props.children.map(c => { return c }) : props.children}
            </div>
            {JSX}
        </div>
    </Provider>
}

const ActividadContext = Consumer;

export default ActividadContext;