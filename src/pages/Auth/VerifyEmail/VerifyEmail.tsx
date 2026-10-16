import VerificationForm from '../../../components/Verification/VerificationForm/VerificationForm'

import HeroPage from '../../../components/Hero/HeroPage'
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs'
import heroBackground from '../../../assets/img/demo-background.jpg'

import './VerifyEmail.scss'

export default function VerifyEmail() {
    const title = 'Verify Email'

    return(
        <>
            <HeroPage title={title} background={heroBackground} />
            <Breadcrumbs items={[
                { label: 'Home', link: '/' },
                { label: title },
            ]} />
            <section>
                <div className="container">
                    <div className="section-inner">
                        <VerificationForm />
                    </div>
                </div>
            </section>
        </>
    )
}