import HeroPage from "../../../components/Hero/HeroPage";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

import "./Forgot.scss"

import heroBackground from "../../../assets/img/demo-background.jpg"

export default function Forgot() {

    const title = "Forgot";

    return(
        <>
            <HeroPage 
                title={title}
                background={heroBackground}    
            />
            <Breadcrumbs 
            items={[
                {label: "Home", link: "/"},
                {label: title},
            ]} 
            />
        </>
    )
}