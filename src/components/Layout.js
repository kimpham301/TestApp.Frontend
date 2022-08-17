import { AppBar, Button, Container, Toolbar, Typography, Tooltip } from '@mui/material'
import React, {useContext} from 'react'
import { Outlet, useNavigate } from 'react-router'
import AuthContext from '../hooks/AuthProvider'

export default function Layout() {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("user");
        setUser({ isLoggedIn: false });
        navigate("/")
    }

    return (
        <>
            <AppBar position="sticky">
                <Toolbar sx={{ m: 'auto' }}>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{ flexGrow: 1 }}>
                        Quiz App
                    </Typography>
                    <Button variant="contained"
                            size= "large"
                            onClick={logout}
                    sx={{left:'30vw' ,}}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </>
    )
}
