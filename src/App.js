import { useState, useEffect } from "react"
import './App.css';
import { db } from "./Firebase/Firebase"
import { collection, getDocs } from "firebase/firestore"
import Main from "./Pages/Main/Main"
import Login from "./Pages/Login/Login"
import {
  Box, Typography, TextField, Button
} from "@mui/material";

const App = () => {
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
  const [games, setGames] = useState(undefined)
  const usersCollectionRef = collection(db, "users")
  const gamesCollectionRef = collection(db, "games")

  const logoutBtnStyle = {
    height: "100%",
    width: "16rem",
    background: "#493E37",
    "&:hover": {
      background: "#726256",
    }
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
    const getGames = async () => {
      const data = await getDocs(gamesCollectionRef)
      setGames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    currUser.id && getGames()
  }, [currUser])

  useEffect(() => {
    console.log(games)
    games !== undefined && setPageState("main")
  }, [games])

  const logout = () => {
    setCurrUser(DEFAULT_USER_INFO)
    setPageState("login")
  }

  return (
    <div className="App">
      <div className='headerStyle'>
        <Typography color="#2E2823" variant="h3">header</Typography>
        {pageState !== "login" && <Button variant="contained" sx={logoutBtnStyle} onClick={() => logout()}>Log Out</Button>}
      </div>
      {pageState === "login" && <Login setEmail={setEmail} />}
      {pageState === "main" && <Main currUser={currUser} games={games} />}
    </div>
  );
}

export default App;
