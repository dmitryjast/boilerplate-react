import type { ReactNode } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay, Pagination } from 'swiper/modules'

import './Slider.scss'

interface SliderItem {
    content?: ReactNode;
    background?: string;
}

interface SliderProps {
    items: SliderItem[];
    autoplay: boolean;
    autoplayTiming: number;
    pagination: boolean;
    className?: string;
}

export default function Slider({items, autoplay, autoplayTiming, pagination, className} :SliderProps) {
    return(
        <div className={`slider-section ${className}`}>
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
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}