import { Link } from "react-router-dom";

import HeroHome from "../../components/Hero/HeroHome";

import "./Home.scss";

import heroBackground1 from "../../assets/img/demo-background.jpg"
import heroBackground2 from "../../assets/img/demo-background-2.jpg"
import heroBackground3 from "../../assets/img/demo-background-3.jpg"

export default function Home() {
    return(
        <>
            <HeroHome 
                items={[
                    {
                        title: "Slide 1",
                        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.",
                        background: heroBackground1,
                        actions: <div className="actions-wrapper">
                                    <Link to="/" className="button btn-primary">Get Started</Link>
                                    <Link to="/" className="button">Learn More</Link>
                                </div>,
                    },
                    {
                        title: "Slide 2",
                        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.",
                        background: heroBackground2,
                        actions: <div className="actions-wrapper">
                                    <Link to="/" className="button btn-primary">Get Started</Link>
                                    <Link to="/" className="button">Learn More</Link>
                                </div>,
                    },
                    {
                        title: "Slide 3",
                        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.",
                        background: heroBackground3,
                        actions: <div className="actions-wrapper">
                                    <Link to="/" className="button btn-primary">Get Started</Link>
                                    <Link to="/" className="button">Learn More</Link>
                                </div>,
                    }
                ]}
            autoplay={false}
            autoplayTiming={3000}
            pagination={true}
            
            />
            <h1>Home</h1>
        </>
    )
}