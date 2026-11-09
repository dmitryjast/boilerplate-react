import type { ReactNode } from 'react';

import './Hero.scss';

interface HeroHomeProps {
    badge?: string;
    title: string;
    description?: string;
    actions?: ReactNode;
    children?: ReactNode;
}

export default function HeroHome({ badge, title, description, actions, children }: HeroHomeProps) {
    return(
        <section className='home-hero-section'>
            <div className='container'>
                <div className='section-inner'>
                    <div className='content-wrapper'>
                        {badge && (
                            <span className='badge'>{badge}</span>
                        )}
                        <h1>{title}</h1>
                        {description && (
                            <p>{description}</p>
                        )}
                        {actions && (
                            <div className='actions-wrapper'>{actions}</div>
                        )}
                    </div>
                    {children && (
                        <div className='preview-wrapper'>{children}</div>
                    )}
                </div>
            </div>
        </section>
    )
}
