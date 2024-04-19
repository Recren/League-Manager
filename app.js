import express from "express";

//Get our query functions from our database
import {createNewTeam, getAllTeamsQuery, getSingleTeam} from './database.js'

const app = express()
app.use(express.json())

//------------------------------------GET REQUESTS-----------------------------------------------------------------------------------
//When we get to this page, we send the page the results of the query we call
app.get("/teams", async (req, res)=>{
    const teams = await getAllTeamsQuery()
    res.send(teams)
})
//Get the database info of a certain team
app.get("/teams/:name", async (req, res)=>{
    const name = req.params.name
    const team = await getSingleTeam(name)
    res.send(team)
})

//------------------------------------POST REQUESTS-----------------------------------------------------------------------------------
//Post request to create a team and insert it into the Team Table
app.post("/teams", async (req,res) =>{
    const {Team_Name, Wins, Losses, Ties, Coach, Stadium, City, Conference} = req.body
    const team = await createNewTeam(Team_Name, Wins, Losses, Ties, Coach, Stadium, City, Conference)

    res.status(201).send(team)
})






app.use((err, req, res, next) =>{
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(8080, () =>{
    console.log("Server is running on port 8080")
})