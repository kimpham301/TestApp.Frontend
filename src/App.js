import Login from './components/Login';
import  { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import React, {useEffect, useState} from 'react';
import Register from './components/Register';
import Home from './components/Home';
import Authenticate from "./components/Authenticate";
import Layout from "./components/Layout";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import AuthContext from "./hooks/AuthProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import CreateQuestion from "./components/CreateQuestion"

function App() {
    const [user, setUser] = useState({ isLoggedIn: false });
    useEffect(() => {
        let userStorage = localStorage.getItem("user");
        if (userStorage) {
            userStorage = JSON.parse(userStorage);
            setUser(userStorage);
        }
    }, []);
    console.log(user)
    const darkTheme = createTheme({
        palette: {
            background: {
                default: "#414254",},
            primary: {
                light: '#757ce8',
                main: '#000000',
                dark: '#002884',
                contrastText: '#fff',
            },
        },
    });
  return (
          <ThemeProvider theme={darkTheme}>
              <CssBaseline>
      <AuthContext.Provider value={{ user, setUser }}>
      <Router>
      <Routes>

          <Route path='/createTest' element={<CreateQuestion />} />
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<Authenticate />} >
            <Route path="/" element={<Layout />} >
                <Route path='/home' element={<Home />} />
                <Route path='/tests' element={<Quiz />} />
                <Route path='/result' element={<Result />} />
            </Route>
          </Route>
      </Routes>
      </Router>
    </AuthContext.Provider>
</CssBaseline>
</ThemeProvider>
  );
}

export default App;
