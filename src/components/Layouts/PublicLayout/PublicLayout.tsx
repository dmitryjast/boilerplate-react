import { Outlet } from 'react-router-dom';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import ScrollToTop from '../../ScrollToTop/ScrollToTop';
import CookiesPopup from '../../CookiesPopup/CookiesPopup';
import BannerStack from '../../ui/BannerStack/BannerStack';

import './PublicLayout.scss';

export default function PublicLayout() {

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ScrollToTop />
            <BannerStack position='bottom-left'>
                <CookiesPopup />
            </BannerStack>
        </>
    )
}
