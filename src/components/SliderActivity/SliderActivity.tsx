import { useEffect, useState } from "react";
import InteractionStructure from "../../contants/simulations/types/InteractionStructure";
import SliderActivityContext, { SliderActivityContextProvider } from "./SliderActivityContext";


const SliderActivity = () => {
    return <SliderActivityContextProvider>
        <SliderActivityLoad />
    </SliderActivityContextProvider>
}


const SliderActivityLoad = () => {

    const { useActivity, nextActivity, useLoader } = SliderActivityContext();
    const [loader] = useLoader()
    const [currentActivity, setCurrentActivity] = useActivity()

    useEffect(() => {
        if (loader === true){
            nextActivity()
        } 
    }, [loader])

    return <div className="SliderActivitys">
        <h1>SliderActivity</h1>
        {currentActivity}
    </div>
}

export default SliderActivity;