import { Alert, Button, Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router';
import Axios from "../api/axios"
import { green } from '@mui/material/colors';
import Answer from './Answer';
import AuthProvider from "../hooks/AuthProvider";

export default function Result() {
    const { user, setUser } = useContext(AuthProvider)
    const [score, setScore] = useState(0)
    const [qnAnswers, setQnAnswers] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const ids = user.selectedOptions.map(x => x.question_id)
        Axios
            .post('Tests/answers',ids)
            .then(res => {
                const qna = user.selectedOptions
                    .map(x => ({
                        ...x,
                        ...(res.data.find(y => y.question_id == x.question_id))

                    }))
                setQnAnswers(qna)
                calculateScore(qna)

            })
            .catch(err => console.log(err))
    }, [user.selectedOptions])

    const calculateScore = qna => {
        let tempScore = qna.reduce((acc, curr) => {
            return curr.answer == curr.selected ? acc + 1 : acc;
        }, 0)
        setScore(tempScore)
    }
    console.log(qnAnswers)
    const restart = () => {
        setUser({
            timeTaken: 0,
            selectedOptions: []
        })
        navigate("/tests")
    }
    const submitScore = async () => {
       await Axios
            .put(`users/${JSON.parse(localStorage.getItem("user")).user_id}`,{
                user_id:JSON.parse(localStorage.getItem("user")).user_id,
                score: score,
                timeTaken: user.timeTaken
            })
           .then(res => {
               setShowAlert(true)
               setTimeout(() => {
                   setShowAlert(false)
               }, 4000);
               console.log(res.data)
           })
           .catch(err => { console.log(err) })
    }

    const getFormatTime = sec => {
        return Math.floor(sec / 60).toString().padStart(2, '0') + ':' + Math.floor(sec % 60).toString().padStart(2, '0')
    }
    return (
        <>
            <Card sx={{ mt: 5, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 640, mx: 'auto', textAlign: "center" }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
                        <Typography variant="h4">{score > 3 ? 'Congratulations!' : 'Try Harder'}</Typography>
                        <Typography variant="h6">
                            YOUR SCORE
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            <Typography variant="span" color={green[500]}>
                                {score}
                            </Typography>/5
                        </Typography>
                        <Typography variant="h6">
                            Took {getFormatTime(user.timeTaken) + ' mins'}
                        </Typography>
                        <Button variant="contained"
                                sx={{ mx: 1 }}
                                size="small"
                                onClick={submitScore}>
                            Submit
                        </Button>
                        <Button variant="contained"
                                sx={{ mx: 1 }}
                                size="small"
                                onClick={restart}>
                            Re-try
                        </Button>
                        <Alert
                            severity="success"
                            variant="string"
                            sx={{
                                width: '60%',
                                m: 'auto',
                                visibility: showAlert ? 'visible' : 'hidden'
                            }}>
                            Score Updated.
                        </Alert>
                    </CardContent>
                </Box>
                <Answer qnAnswers={qnAnswers} />
            </Card>

        </>
    )
}
