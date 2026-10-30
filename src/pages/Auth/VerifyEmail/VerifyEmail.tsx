import VerificationForm from '../../../components/Verification/VerificationForm/VerificationForm'

import HeroPage from '../../../components/Hero/HeroPage'
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs'

import './VerifyEmail.scss'

export default function VerifyEmail() {
    const title = 'Verify Email'

    return(
        <>
            <HeroPage title={title} />
            <Breadcrumbs items={[
                { label: 'Home', link: '/' },
                { label: title },
            ]} />
            <section className='section-verify-email pt-60 pb-120'>
                <div className="container">
                    <div className="section-inner">
                        <VerificationForm />
                    </div>
                </div>
            </section>
        </>
    )
}