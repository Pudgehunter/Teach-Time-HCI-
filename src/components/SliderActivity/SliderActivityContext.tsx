import React, { useEffect, useMemo, useState } from "react";
import { Redirect } from "react-router";
import ObserverNav from "../../componentsTS/Navegacion/config/ObserverNav";
import Registro from "../../contants/resultados/Registro";
import createContext, { IPropsState } from "../Context";
import LINK from "../Router/Routes";



interface IPropsContext {
    nextActivity: () => void,
    useActivity: IPropsState<JSX.Element>,
    useObserver: IPropsState<ObserverNav>,
    useLoader: IPropsState<boolean | undefined>
}

const { Provider, Consumer, useCondicional } = createContext<IPropsContext>();


export const SliderActivityContextProvider = (props: React.Props<any>) => {

    const useLoader = useState<boolean | undefined>(undefined);
    const [loader, setLoader] = useLoader;

    const useObserver = useState(new ObserverNav());
    const [observerNav, setObserverNav] = useObserver;

    const useActivity = useState<JSX.Element>(<h1>Esperando</h1>)
    const [currentActivity, setCurrentActivity] = useActivity;

    const nextActivity = () => {

        const interaction = observerNav.onNext();
        const index = observerNav.index;

        if (interaction) {
            const { config, interaccion } = interaction;
            var configProps = { ...config, observerNav }
            setCurrentActivity(<interaccion.actividad key={index} {...configProps} />)
        }

    }

    useEffect(() => {

        const pathname = window.location.pathname;

        console.log("pathname", window.location, LINK.TEST, pathname.includes(LINK.TEST))

        if (pathname.includes(LINK.TEST)) {
            observerNav.loadInformationTest([
                { UID: "a", UIDActivity: "1", props: {}, config: {} }
            ]);

            if(pathname.length > LINK.TEST.length){
                setLoader(true);
            }else{
                setLoader(false)
            }
            
        } else {
            setLoader(false)
        }

    }, [])


    const value = useMemo(() => {
        return {
            useLoader: () => useLoader,
            useObserver: () => useObserver,
            useActivity: () => useActivity,
            nextActivity
        }
    }, [currentActivity, observerNav, loader])

    return loader === undefined ? <><h1>ESPERANDO</h1></> :
        loader === false ? <Redirect to={LINK.INDEX} /> : <Provider value={value} {...props} />
}

const SliderActivityContext = Consumer;
export const SliderActivityContextExist = useCondicional;

export default SliderActivityContext;