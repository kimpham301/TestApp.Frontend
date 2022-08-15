import {
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    Typography,
  } from "@mui/material";
  import useForm from "../hooks/useForm";
  import React, { useState } from "react";
  import Center from "./Center";
  import axios from 'axios';
  import {Link} from 'react-router-dom'
  const getNewModel = () => ({
    email: " ",
    password: "",
  });
  
  export default function Login() {
    const { values, setValues, errors, setErrors, handleInputChange } =
      useForm(getNewModel);
  
    const UserRegister = (e) => {
        const data = { 
            email: values.email,
            password: values.password
        }
        const url = 'https://localhost:7045/Users/register';
      e.preventDefault();
      if (validate()){
        axios.post(url, data).then((result)=>{
            alert(result.data);
        }).catch((errors)=>{
            alert(errors);
        })
        
      };
    };
  
    const validate = () => {
      let temp = {};
      temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Email is not valid.";
      temp.password = values.password != "" ? "" : "This field is required.";
      setErrors(temp);
      return Object.values(temp).every((x) => x == "");
    };
  
    return (
      <Center>
        <Card sx={{ maxwidth: 450 }}>
          <CardContent>
            <Typography variant="h3" sx={{ my: 3 }}>
              Register
            </Typography>
            <Box
              sx={{
                "& .MuiTextField-root": { my: 2, mx: 2, width: "60%" },
                "& .MuiButtonBase-root": { my:2, mx: 1, width: "50%" }
              }}
            >
              <form noValidate autoComplete="off" onSubmit={UserRegister}>
                <div>
                  <TextField
                    required
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    {...(errors.email && { error: true, helperText: errors.email })}
                  />
                </div>
                <TextField
                  required
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.password && { error: true, helperText: errors.password })}
                />
                <Button type="submit" variant="contained" size="large">
                  Register
                </Button>
                <Link to="/Users/login">
                <Button variant="text" size="small">
              Already have an account ? Log in
                </Button>
                </Link>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Center>
    );
  }
  