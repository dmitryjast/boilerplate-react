import DropDown from '../ui/DropDown/DropDown'

export default function HeaderActions() {
    
    return(
        <div className='header-actions'>
            <DropDown 
                label={
                    <>
                        <span>Sign In / Sign Up</span>
                    </>
                } 
                align='right' 
                items={[
                    {label: 'Sign In', to: '/login'},
                    {label: 'Sign Up', to: '/register' },
                    {label: 'Forgot Password', to: '/forgot' },
                ]}
            />
        </div>
    )
}