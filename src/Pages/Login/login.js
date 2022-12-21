import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import {
    Box, Typography, TextField, Button
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import useMediaQuery from '@mui/material/useMediaQuery';

const Login = ({ setEmail }) => {
    const mobileView = useMediaQuery('(max-width:500px)');
    const [currEmailVal, setCurrEmailVal] = useState("")
    const [currPassVal, setCurrPassVal] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: mobileView ? "92.85vh" : "inherit",
    }
    const textFieldStyle = {
        mb: "1rem",
        width: "100%",
        '& label.Mui-focused': {
            color: '#2E2823',
        },
        '& .MuiFilledInput-underline:before': { borderBottomColor: '#2E2823' },
        '& .MuiFilledInput-underline:after': { borderBottomColor: '#2E2823' },
        '& :-webkit-autofill': {
            transitionDelay: "9999s"
        },
    }
    const inputAreaStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: mobileView ? "75%" : "20%",
    }
    const loginBtnStyle = {
        background: "#493E37",
        width: "100%",
        "&:hover": {
            background: "#726256",
        }
    }
    const eyeDropStyle = {
        mt: "0.25rem",
        fontSize: "2.5rem"
    }

    const attemptLogin = () => {
        const checkCreds = async () => {
            try {
                const user = await signInWithEmailAndPassword(
                    auth,
                    currEmailVal,
                    currPassVal
                );
                user && setEmail(user.user.email)
                resetFields()
            } catch (error) {
                console.log(error, "There is no user with this email or password");
                resetFields()
            }
        }
        if (currEmailVal && currPassVal) {
            checkCreds()
        } else { console.log("Please enter login information") }
    }

    const resetFields = () => {
        setCurrEmailVal("")
        setCurrPassVal("")
    }

    return (
        <Box sx={containerStyle}>
            <Typography variant="h4" sx={{ fontWeight: 500, mb: "1rem" }}>
                Login
            </Typography>
            <Box sx={inputAreaStyle}>
                <TextField
                    value={currEmailVal}
                    sx={textFieldStyle}
                    placeholder="Required"
                    label="Email"
                    variant="filled"
                    size="small"
                    onChange={(e) => setCurrEmailVal(e.target.value)}
                />

                <TextField
                    type={showPassword ? "text" : "password"}
                    value={currPassVal}
                    sx={textFieldStyle}
                    placeholder="Required"
                    label="Password"
                    variant="filled"
                    size="small"
                    onChange={(e) => setCurrPassVal(e.target.value)}
                />

                <Button variant="contained" sx={loginBtnStyle} onClick={() => attemptLogin()}>Login</Button>
                <VisibilityIcon sx={eyeDropStyle} onClick={() => setShowPassword(s => !s)} />
            </Box>
        </Box>
    );
};

export default Login