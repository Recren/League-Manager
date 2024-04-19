import express from "express";

//Get our query functions from our database
import {getAllTeamsQuery, getSingleTeam} from './database.js'

const app = express()

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

app.use((err, req, res, next) =>{
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(8080, () =>{
    console.log("Server is running on port 8080")
})