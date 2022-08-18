import {
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import useForm from "../hooks/useForm";
import React, {useContext} from "react";
import Center from "./Center";
import axios from '../api/axios';
import AuthContext from "../hooks/AuthProvider";
import {Link} from "react-router-dom"


const getNewQuestion = () => ({
    create_question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: 0,
});

export default function CreateQuestion() {
    const { user } = useContext(AuthContext);
    const { values, errors, setErrors, handleInputChange } =
        useForm(getNewQuestion);
    const isAdmin = user.roles_id === 2
    const PostNewQuestion = async (e) => {
        e.preventDefault();
            await axios.post("/Tests/newQuestion", {
                question: values.create_question,
                option1: values.option1,
                option2: values.option2,
                option3: values.option3,
                option4: values.option4,
                answer: values.answer,
            }).then(res => {console.log(res.data)
            alert("New question created")
            })
                .catch(error =>
                    alert(error.response.data))
        console.log(values)
    };

    return (
        {isAdmin} ?
                <Center>
            <Card sx={{ maxwidth: 450 }}>
                <center>
                    <CardContent>
                        <Typography variant="h3" sx={{ my: 3 , textAlign: "center",}}>
                            Create Question
                        </Typography>
                        <Box
                            sx={{
                                "& .MuiTextField-root": { my: 2, mx: 2, width: "60%" },
                                "& .MuiButtonBase-root": { my:2, mx: 1, width: "50%" }
                            }}
                        >
                            <form noValidate autoComplete="off" onSubmit={PostNewQuestion}>
                                <div>
                                    <TextField
                                        required
                                        label="Question"
                                        name="create_question"
                                        value={values.create_question}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </div>
                                    <TextField
                                    required
                                    label="Option 1"
                                    name="option1"
                                    value={values.option1}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    label="Option 2"
                                    name="option2"
                                    value={values.option2}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    label="Option 3"
                                    name="option3"
                                    value={values.option3}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    label="Option 4"
                                    name="option4"
                                    value={values.option4}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    label="Correct Option Number"
                                    name="answer"
                                    type="number"
                                    value={values.answer}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />

                                <Button type="submit" variant="contained" size="large">
                                    Submit
                                </Button>
                                <Link style={{ textDecoration: 'none'}} to="/home">
                                    <Button variant="text" size="small">
                                        Back to home
                                    </Button>
                                </Link>
                            </form>
                        </Box>
                    </CardContent>
                </center>
            </Card>
        </Center> : "Wrong page!"
    )
}
