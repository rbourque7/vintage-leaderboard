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
  const [scores, setScores] = useState(undefined)
  const usersCollectionRef = collection(db, "users")
  const gamesCollectionRef = collection(db, "games")
  const scoresCollectionRef = collection(db, "scoresList")

  const logoutBtnStyle = {
    height: "100%",
    width: "16rem",
    background: "#493E37",
    "&:hover": {
      background: "#726256",
    }
  }
  const fancyTitleBoxStyle = {
    width: "15%",
    height: "2rem",
    background: "#8E7A6B",
    zIndex: "10000",
    position: "relative",
    right: "8%",
    top: "75%",
    borderRadius: "0 0 20px 20px"
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
    const getGamesAndScores = async () => {
      const data = await getDocs(gamesCollectionRef)
      setGames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      const scoreData = await getDocs(scoresCollectionRef)
      console.log(scoreData)
      setScores(scoreData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    currUser.id && getGamesAndScores()
  }, [currUser])

  useEffect(() => {
    games !== undefined && scores !== undefined && setPageState("main")
  }, [games, scores])

  const logout = () => {
    setCurrUser(DEFAULT_USER_INFO)
    setPageState("login")
  }

  return (
    <div className="App">
      <div className='headerStyle'>
        <Typography color="#2E2823" variant="h3">Vintage Leaderboard</Typography>
        {pageState === "main" && <Box sx={fancyTitleBoxStyle}>
          <Typography color="#2E2823" variant="body1">Recent Scores</Typography>
        </Box>}
        {pageState !== "login" && <Button variant="contained" sx={logoutBtnStyle} onClick={() => logout()}>Log Out</Button>}
      </div>
      <div className="Body">
        {pageState === "login" && <Login setEmail={setEmail} />}
        {pageState === "main" && <Main currUser={currUser} users={users} games={games} scores={scores} />}
      </div>
    </div>
  );
}

export default App;
