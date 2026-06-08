import "./Hero.scss";

interface HeroPageProps {
    title: string;
    background?: string; 
}

export default function HeroPage({ title, background }: HeroPageProps) {
    return(
        <section className="page-hero-section" style={background ? { backgroundImage: `url(${background})` } : undefined}>
            <div className="container">
                <div className="section-inner">
                    <h1>{title}</h1>
                </div>
            </div>
        </section>
    )
}