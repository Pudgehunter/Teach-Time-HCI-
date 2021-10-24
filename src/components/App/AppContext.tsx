import React, { useMemo } from "react";
import { useState } from "react";
import createContext, { IPropsState } from "../Context";

interface IStyle {
    header: {
        type: string
    }
}

interface IPropsContext {
    useStyle: IPropsState<IStyle>;
    usePreload: IPropsState<"Loading" | "Complete">;
}

const { Provider, Consumer } = createContext<IPropsContext>();

export const AppContextProvider = (props: React.Props<any>) => {

    const usePreload = useState<"Loading" | "Complete">("Loading");
    const [preload] = usePreload;

    const useStyle = useState<IStyle>({ header: { type: "default" } });
    const [style] = useStyle;

    const value = useMemo(() => {

        return {
            usePreload: () => usePreload,
            useStyle: () => useStyle,
        }

    }, [
        style,
        preload
    ])

    return <Provider value={value} {...props} />
}

const AppContext = Consumer;

export default AppContext;