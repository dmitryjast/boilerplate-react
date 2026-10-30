import './Hero.scss';

interface HeroPageProps {
    title: string;
}

export default function HeroPage({ title }: HeroPageProps) {
    return(
        <section className='page-hero-section'>
            <div className='container'>
                <div className='section-inner'>
                    <h1>{title}</h1>
                </div>
            </div>
        </section>
    )
}