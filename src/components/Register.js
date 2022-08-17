import {
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    Typography,
  } from "@mui/material";
import useForm from "../hooks/useForm";
import React, { useState, useContext} from "react";
import Center from "./Center";
import axios from '../api/axios';
import {Link} from 'react-router-dom'
import AuthContext from "../hooks/AuthProvider";
import {useNavigate} from "react-router";

const getNewModel = () => ({
    email: "",
    password: "",
  });

  export default function Login({history}) {
      const { user, setUser } = useContext(AuthContext);
    const { values, errors, setErrors, handleInputChange } =
      useForm(getNewModel);
    const navigate = useNavigate()
      const UserRegister = async (e) => {
          e.preventDefault();
          if(validate()){
          try {
              const res = await axios.post("users/login", {
                  email: values.email,
                  password: values.password
              });

              const userData = {
                  ...user,
                  isLoggedIn: true,
                  user_id: res.data.user_id,
                  token: res.data.token,
                  roles_id: res.data.roles_id,
              };

              setUser(userData);

              localStorage.setItem("user", JSON.stringify(userData));
                navigate('/home')
          } catch (error) {
              alert(error);
          }
      }
      }

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
            <center>
          <CardContent>
            <Typography variant="h3" sx={{ my: 3 , textAlign: "center",}}>
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
                <Link to="/">
                <Button variant="text" size="small">
              Already have an account ? Log in
                </Button>
                </Link>
              </form>
            </Box>
          </CardContent>
            </center>
        </Card>
      </Center>
    );
  }
