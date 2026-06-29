import HeroHome from "../../components/Hero/HeroHome";

import "./Home.scss";

export default function Home() {
    return(
        <>
            <HeroHome 
                items={[
                    {
                        title: "Slide 1",
                    },
                    {
                        title: "Slide 2",
                    },
                    {
                        title: "Slide 3",
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