import type { ReactNode } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay, Pagination } from 'swiper/modules'

import './Hero.scss';

interface SliderItem {
    title?: string;
    description?: string;
    actions?: ReactNode;
    background?: string;
}

interface SliderProps {
    items: SliderItem[];
    autoplay: boolean;
    autoplayTiming: number;
    pagination: boolean;
}

export default function HeroHome({items, autoplay, autoplayTiming, pagination}:SliderProps) {
    return(
        <div className='home-hero-section'>
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={autoplay ? { delay: autoplayTiming } : false}
                pagination={pagination ? { clickable: true } : false}
            >
                {items?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div 
                            className='slide-wrapper'
                            style={item.background ? { backgroundImage: `url(${item.background})` } : undefined}
                        >
                            <div className='container'>
                                <div className='slide-inner'>
                                    <div className='content-wrapper'>
                                        {item.title && (
                                            <h1>{item.title}</h1>
                                        )}
                                        {item.description && (
                                            <p>{item.description}</p>
                                        )}
                                        {item.actions}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}