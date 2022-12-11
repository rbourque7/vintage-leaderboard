import React, { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/Firebase"
import {
    Box, Typography, CircularProgress
} from "@mui/material";
import GamesDDL from "../../Common/GamesDDL/GamesDDL";
import LeaderboardTile from "../../Common/LeaderboardTile/LeaderboardTile";
import ReBox from "../../Common/ReBox/ReBox"
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import useMediaQuery from '@mui/material/useMediaQuery';
import { collection, getDocs } from "firebase/firestore"


const Main = ({ currUser, users, games, scores, setPageState, setGames, setScores }) => {
    const gamesCollectionRef = collection(db, "games")
    const scoresCollectionRef = collection(db, "scoresList")
    const mobileView = useMediaQuery('(max-width:500px)');
    const [currGame, setCurrGame] = useState()
    const [currScoresList, setCurrScoresList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const containerStyle = {
        width: "100%",
        height: mobileView ? "100%" : "91vh",
        overflowX: "hidden",
        overflowY: mobileView ? "scroll" : "hidden"
    }
    const recentScoresBoxStyle = {
        display: "flex",
        justifyContent: mobileView ? "space-around" : "space-between",
        padding: "1rem 1.5rem",
        height: "3rem",
        borderRadius: "0 0 50px 50px",
        background: "#726256",
        boxShadow: "none",
        mb: "2rem",
        boxShadow: "0px 2px 3px 1px #2E2823",
        position: mobileView && "absolute",
        width: mobileView ? "88%" : "auto",
        zIndex: 9999
    }
    const newScoreBoxStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: mobileView ? "37.5%" : "22.5%",
    }
    const addMarginStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "22.5%",
        mr: "10%",
    }
    const newScoreStyle = {
        display: mobileView ? "column" : "flex",
        justifyContent: "center",
    }
    const scoreTextStyle = {
        fontSize: mobileView ? "0.85rem" : "1rem",
        mr: "0.25rem"
    }
    const mainAreaStyle = {
        display: "flex",
        flexDirection: mobileView ? "column" : "row",
        padding: mobileView ? "0rem 1rem" : "0rem 4rem",
        height: "100%",
        mt: mobileView && "4rem",
    }
    const leaderboarAreaStyle = {
        width: mobileView ? "100%" : "50%",
        mt: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
    const navBoxStyle = {
        width: mobileView ? "100%" : "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: mobileView && "2rem"
    }
    const navPStyle = {
        width: mobileView ? "100%" : "80%",
        background: "#726256",
        height: mobileView ? "20rem" : "50%",
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "10px",
        boxShadow: "0px 2px 3px 1px #2E2823",
    }
    const navBtnStyle = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "0",
        background: "transparent",
        boxShadow: "none",
        width: "50%",
        height: "50%",
        color: "#2E2823",
        '&:hover': {
            backgroundColor: '#2E2823',
            color: '#8E7A6B',
            transition: "background 0.45s",
        }
    }
    const navBtnStyleC = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "0",
        background: "transparent",
        boxShadow: "none",
        width: "100%",
        height: "50%",
        color: "#2E2823",
        '&:hover': {
            backgroundColor: '#2E2823',
            color: '#8E7A6B',
            transition: "background 0.45s",
        }
    }
    const iconStyle = {
        fontSize: "6rem",
    }
    const leaderboardStyle = {
        textAlign: "center",
        width: mobileView ? "90%" : "75%",
        padding: "0 1rem 1.5rem 1rem",
        background: "#726256",
        mt: "1rem",
        height: mobileView ? "25rem" : "62.5%",
        display: "flex",
        flexDirection: "column",
        alignItems: currScoresList.length === 0 && "center",
        borderRadius: "10px",
        boxShadow: "0px 2px 3px 1px #2E2823",
        mb: mobileView && "2rem"
    }
    const tileStyle = {
        display: "flex",
        justifyContent: "center",
        width: mobileView ? "auto" : "100%",
        height: "2rem",
        borderRadius: "10px",
        alignItems: "center",
        padding: "1rem",
    }
    const tilesStyle = {
        width: "100%",
        height: "100%",
        padding: "0 0.5rem 0 0",
        overflowX: "hidden",
        overflowY: currScoresList.length > 5 ? "scroll" : "hidden",
        "&::-webkit-scrollbar": {
            width: "10px",
            border: "1px solid #2E2823",
            borderRadius: "5px",
            background: "#493E37"
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: "5px",
            background: "#2E2823"
        }
    }
    const boldStyle = {
        fontWeight: 500
    }
    const nameStyle = {
        fontWeight: 500,
        fontSize: mobileView ? "1.75rem" : "2.125rem"
    }
    const leaderTitleStyle = {
        fontSize: mobileView ? "1.5rem" : "2.125rem",
        mt: "1rem",
        fontWeight: 600
    }

    useEffect(() => {
        const getGamesAndScores = async () => {
            const data = await getDocs(gamesCollectionRef)
            setGames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            const scoreData = await getDocs(scoresCollectionRef)
            setScores(scoreData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        currUser.id && getGamesAndScores()
    }, [currUser])

    useEffect(() => {
        if (games) {
            setCurrGame({ id: 0, name: "Choose a Game" })
        }
    }, [games])

    useEffect(() => {
        if (games !== undefined && scores !== undefined && currGame && currScoresList) {
            setIsLoading(false)
        }
    }, [games, scores])

    useEffect(() => {
        if (scores && currGame) {
            let temp = scores.filter((score) => score.gameId === currGame.id)
            if (!temp) {
                const temp = scores.find((score) => score.gameId === currGame.id)
                temp && setCurrScoresList(temp)
            }
            let sorted = temp.sort((a, b) => {
                return b.score - a.score
            })
            temp && setCurrScoresList(sorted)
        }
    }, [currGame])

    const handleSettingClick = () => {
        console.log("clicked")
    }

    const handleBookmarkClick = () => {
        console.log("clicked")
    }

    const handleCreateClick = () => {
        setPageState("enterScore")
    }

    const handleAdminSettingClick = () => {
        console.log("clicked")
    }

    return (
        <Box sx={containerStyle}>
            {scores && users &&
                <ReBox style={recentScoresBoxStyle}>
                    {
                        scores.slice(mobileView ? -2 : -4).map((score, index) => (
                            <Box sx={index !== 1 ? newScoreBoxStyle : !mobileView ? addMarginStyle : newScoreBoxStyle}>
                                <Typography variant="h4" sx={nameStyle} color="#2E2823">
                                    {users.find((user) => user.id === score.userId).firstName}
                                </Typography>
                                <Box sx={newScoreStyle}>
                                    <Typography sx={scoreTextStyle} variant="body1" color="#2E2823">
                                        {score.name}
                                    </Typography>
                                    <Typography sx={scoreTextStyle} variant="body1" color="#2E2823">
                                        {score.score}
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    }
                </ReBox>
            }
            <Box sx={mainAreaStyle}>
                <Box sx={leaderboarAreaStyle}>
                    <Typography variant="h4" color="#2E2823" sx={boldStyle}>
                        Leaderboard
                    </Typography>
                    {isLoading ? <CircularProgress /> : <GamesDDL games={games} currGame={currGame} setCurrGame={setCurrGame} />}
                    <ReBox style={leaderboardStyle}>
                        {!isLoading ?
                            <>
                                <Box sx={tileStyle}>
                                    <Typography variant="h4" color="#2E2823" sx={leaderTitleStyle}>
                                        {currGame.name} {currGame.id !== 0 && "Highscores"}
                                    </Typography>
                                </Box>
                                {currScoresList.length > 0 ?
                                    <Box sx={tilesStyle}>
                                        {currScoresList.map((score, index) => (
                                            <LeaderboardTile score={score} users={users} index={index} currUser={currUser} />
                                        ))}
                                    </Box>

                                    :
                                    <Typography variant="body1" color="#2E2823">
                                        {currGame.id !== 0 ? "There are no recorded scores for this game." : "Please select a game."}
                                    </Typography>
                                }
                            </> :
                            <CircularProgress />
                        }
                    </ReBox>
                </Box>
                <Box sx={navBoxStyle}>
                    <Box sx={navPStyle}>
                        <ReBox style={navBtnStyle} button={true} clickHandler={() => handleSettingClick()}>
                            <SettingsIcon fontSize="large" sx={iconStyle} />
                            <Typography variant="body1">
                                Settings
                            </Typography>
                        </ReBox>
                        <ReBox style={navBtnStyle} button={true} clickHandler={() => handleBookmarkClick()}>
                            <BookmarkIcon fontSize="large" sx={iconStyle} />
                            <Typography variant="body1">
                                Bookmark Games
                            </Typography>
                        </ReBox>
                        <ReBox style={currUser.isAdmin === false ? navBtnStyleC : navBtnStyle} button={true} clickHandler={() => handleCreateClick()}>
                            <CreateIcon fontSize="large" sx={iconStyle} />
                            <Typography variant="body1">
                                Add a Score
                            </Typography>
                        </ReBox>
                        {currUser.isAdmin && <ReBox style={navBtnStyle} button={true} clickHandler={() => handleAdminSettingClick()}>
                            <AdminPanelSettingsIcon fontSize="large" sx={iconStyle} />
                            <Typography variant="body1">
                                Admin Portal
                            </Typography>
                        </ReBox>}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Main;
