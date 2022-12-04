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
  const usersCollectionRef = collection(db, "users")

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])

  useEffect(() => {
    const login = () => {
      let temp = users.find((user) => user.email === email)
      console.log(temp)
      setCurrUser(temp)
    }
    console.log(email && users)
    email && users && login()
  }, [email, users])

  useEffect(() => {
    const changePage = () => {
      console.log("page changed")
      setPageState("main")
    }
    console.log(currUser)
    currUser.id && changePage()
  }, [currUser])

  const logout = () => {
    console.log("xd")
    setCurrUser(DEFAULT_USER_INFO)
    setPageState("login")
  }

  return (
    <div className="App">
      <div className='headerStyle'>
        <h1>header</h1>
        {pageState !== "login" && <Button variant="outlined" onClick={() => logout()}>Log Out</Button>}
      </div>
      {pageState === "login" && <Login setEmail={setEmail} />}
      {pageState === "main" && <Main currUser={currUser} setCurrUser={setCurrUser} />}
    </div>
  );
}

export default App;
