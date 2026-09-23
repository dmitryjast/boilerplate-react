import { useAuth } from '../../context/AuthContext'
import { authApi } from '../../api/auth/auth.api'
import { Navigate, useNavigate } from 'react-router-dom'

import DropDown from '../ui/DropDown/DropDown'

export default function HeaderActions() {

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const dropDownAuthItems = [
        { label: "Sign In", to: "/login" },
        { label: "Sign Up", to: "/register" },
        { label: "Forgot Password", to: "/forgot" },
    ];

    const dropDownProfileItems = [
        { label: "My Purchases", to: "/my-purchases" },
        { label: "Edit Profile", to: "/edit-profile" },
        { label: "Change Password", to: "/change-password" },
        { label: "Billing & Shipping info",to: "/billing-info" },
        {
        label: "Logout",
            onClick: () => {
                logout();
                navigate("/");
            },
        },
    ];

    
    return(
        <div className='profile-wrapper'>
            {user ? (
                <DropDown 
                    label={'Profile'} 
                    align='right' 
                    items={dropDownProfileItems}
                />
            ) : (
                <DropDown 
                    label={'Sign In / Sign Up'} 
                    align='right' 
                    items={dropDownAuthItems}
                />
            )}
        </div>
    )
}