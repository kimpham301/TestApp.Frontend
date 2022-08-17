import React, {useContext} from 'react'
import { Navigate, Outlet } from 'react-router'
import AuthContext  from '../hooks/AuthProvider'

export default function Authenticate() {
    const { user } = useContext(AuthContext)

    return (
        user.user_id == 0
            ? <Navigate to="/" />
            : <Outlet />
    )
}
