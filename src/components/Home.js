import React, {useContext} from "react"
import Center from "./Center";
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import AuthContext from "../hooks/AuthProvider";

export default function Home(){
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    if (user.user_id == 0)
        navigate('/')
    return (
        <Center>
            <Card>
                <center>
                <CardContent>
                    <Typography variant="h3" sx={{ my: 3, textAlign: "center",}}>
                            Ready to take the Quiz ?
                        </Typography>
                        <Box
                            sx={{
                                "& .MuiButtonBase-root": { my: 2, mx: 2, width: "50%" },
                            }}
                        >
                                <Link style={{ textDecoration: 'none' }} to="/tests">
                                    <Button variant="outlined" size="large">
                                        Start
                                    </Button>
                                </Link>
                            {user.roles_id === 2 ? <Link to="/createTest">
                                <Button variant="text" size="large">
                                    Create Question
                                </Button></Link> : null}
                        </Box>
                    </CardContent>
                </center>
            </Card>
        </Center>
    );
}
