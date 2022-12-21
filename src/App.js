import { useState, useEffect } from "react"
import './App.css';
import { db } from "./Firebase/Firebase"
import { collection, getDocs } from "firebase/firestore"
import Main from "./Pages/Main/Main"
import Login from "./Pages/Login/Login"
import EnterScore from "./Pages/EnterScore/EnterScore";
import Recent from "./Pages/Recent/Recent";
import {
  Box, Typography, TextField, Button, ThemeProvider
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

const App = () => {
  const mobileView = useMediaQuery('(max-width:500px)');
  const DEFAULT_USER_INFO = {
    id: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    phoneNumber: undefined,
    isAdmin: undefined,
  }
  const [pageState, setPageState] = useState("login")
  const [currUser, setCurrUser] = useState(DEFAULT_USER_INFO)
  const [email, setEmail] = useState()
  const [users, setUsers] = useState([])
  const [games, setGames] = useState([])
  const [scores, setScores] = useState([])
  const usersCollectionRef = collection(db, "users")

  const logoutBtnStyle = {
    height: "100%",
    width: mobileView ? "11rem" : "16rem",
    fontWeight: 600,
    background: "#493E37",
    "&:hover": {
      background: "#726256",
    }
  }
  const fancyTitleBoxStyle = {
    width: "18%",
    height: "2rem",
    background: "#8E7A6B",
    zIndex: "10000",
    position: "relative",
    left: mobileView ? "0" : "2.5%",
    top: "75%",
    borderRadius: "0 0 20px 20px"
  }
  const boldStyle = {
    fontWeight: 500,
  }
  const logoStyle = {
    width: "10rem",
    height: "3.5rem",
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      let temp = users.find((user) => user.email === email)
      setCurrUser(temp)
    }
    email && currUser.id === undefined && getUsers()
  }, [email])

  useEffect(() => {
    currUser.id && setPageState("main")
  }, [currUser])

  const logout = () => {
    setCurrUser(DEFAULT_USER_INFO)
    setEmail("")
    setPageState("login")
  }

  return (
    <div className="App">
      <div className='headerStyle'>
        <img
          alt="logo"
          src="./Images/logoVL2.png"
          style={logoStyle}
        />
        {pageState === "main" && <Box sx={fancyTitleBoxStyle}>
          <Typography color="#2E2823" variant="body1" sx={boldStyle}>{mobileView ? "Recent" : "Recent Scores"}</Typography>
        </Box>}
        {pageState !== "login" && <Button variant="contained" sx={logoutBtnStyle} onClick={() => logout()}>Log Out</Button>}
      </div>
      <div className="Body">
        {pageState === "login" && <Login setEmail={setEmail} />}
        {pageState === "main" && <Main currUser={currUser} users={users} games={games} scores={scores} setGames={setGames} setScores={setScores} setPageState={setPageState} />}
        {pageState === "enterScore" && <EnterScore currUser={currUser} setPageState={setPageState} games={games} scores={scores} />}
        {pageState === "recent" && <Recent currUser={currUser} setPageState={setPageState} games={games} />}
      </div>
    </div>
  );
}

export default App;
