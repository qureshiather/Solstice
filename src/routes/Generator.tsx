import { SocialsDiv } from "../components/SocialsDiv"

import GeneratorDiv from "../components/GeneratorDiv";

export const Generator = () => {

    return <main>
    <SocialsDiv />

    <h1 className="centerTitle glitch"> GENERATOR </h1>



    <GeneratorDiv BACKGROUND_TYPE={1} SHAPE_TYPE={1} SHAPE_BORDER={false} />

    </main>
}