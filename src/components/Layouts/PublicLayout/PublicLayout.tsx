import { Outlet } from 'react-router-dom';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import ScrollToTop from '../../ScrollToTop/ScrollToTop';

import './PublicLayout.scss';

export default function PublicLayout() {

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ScrollToTop />
        </>
    )
}
