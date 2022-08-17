import React, { useEffect, useState, useContext } from 'react'
import axios from '../api/axios'
import AuthContext from '../hooks/AuthProvider'
import { Card, CardContent, CardHeader, List, ListItemButton, Typography, Box, LinearProgress } from '@mui/material'
import { useNavigate } from 'react-router';


export default function Quiz() {

    const [qns, setQns] = useState([])
    const [qnIndex, setQnIndex] = useState(0)
    const [timeTaken, setTimeTaken] = useState(0)
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    let timer;

    const startTimer = () => {
        timer = setInterval(() => {
            setTimeTaken(prev => prev + 1)
        }, [1000])
    }

    useEffect(() => {
        setUser({
            timeTaken: 0,
            selectedOptions: []
        })
        axios
            .get('tests')
            .then(res => {
                setQns(res.data)
                startTimer()
            })
            .catch(err => { console.log(err); })
        return () => { clearInterval(timer) }
    }, [])

    const updateAnswer = (question_id, optionIdx) => {
        const temp = [...user.selectedOptions]
        temp.push({
            question_id,
            selected: optionIdx
        })
        if (qnIndex < 4) {
            setUser({ selectedOptions: [...temp] })
            setQnIndex(qnIndex + 1)
        }
        else {
            setUser({ selectedOptions: [...temp], timeTaken })
            navigate('/result')
        }
    }
    const getFormatTime = sec => {
        return Math.floor(sec / 60).toString().padStart(2, '0') + ':' + Math.floor(sec % 60).toString().padStart(2, '0')
    }

    return (
        qns.length != 0
            ? <Card
                sx={{
                    maxWidth: 640, mx: 'auto', mt: '20%', justifyContent: "center", alignItems:"center",
                    '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' }
                }}>
                <CardHeader
                    title={'Question ' + (qnIndex + 1) + ' of 5'}
                    action={<Typography>{getFormatTime(timeTaken)}</Typography>} />
                <Box>
                    <LinearProgress variant="determinate" value={(qnIndex + 1) * 100 / 5} />
                </Box>
                <CardContent>
                    <Typography variant="h6">
                        {qns[qnIndex].question}
                    </Typography>
                    <List>
                        {qns[qnIndex].options.map((item, idx) =>
                            <ListItemButton disableRipple key={idx} onClick={() => updateAnswer(qns[qnIndex].question_id, idx)}>
                                <div>
                                    <b>{String.fromCharCode(65 + idx) + " . "}</b>{item}
                                </div>

                            </ListItemButton>
                        )}

                    </List>
                </CardContent>
            </Card>
            : null
    )
}
