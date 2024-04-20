import express from "express";
import bodyParser from "body-parser"

//Get our query functions from our database
import {createNewTeam, getAllTeamsQuery, getSingleTeam, getSinglePlayerById, getSinglePlayerByName, createPlayer, deletePlayer} from './database.js'

const app = express()
app.use(express.json())
//ALlows express to parse through HTML Forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Static pages will only be hosted in public directory
app.use(express.static('public'))



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

// GET endpoint to get a player by Player_id
app.get("/players/:id", async (req, res) => {
    const playerId = req.params.id;
    const player = await getSinglePlayerById(playerId);
    res.send(player);
});

// GET endpoint to get a player by Fname and Lname
app.get("/players/:fname/:lname", async (req, res) => {
    const fname = req.params.fname;
    const lname = req.params.lname;
    const player = await getSinglePlayerByName(fname, lname);
    res.send(player);
});


//------------------------------------Delete REQUESTS-----------------------------------------------------------------------------------

app.delete("/players/:id", async (req, res) => {
    const playerId = req.params.id;
    try {
        const playerDeleted = await deletePlayer(playerId);
        if (playerDeleted) {
            res.status(200).send({ message: "Player deleted successfully" });
        } else {
            res.status(404).send({ message: "Player not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Failed to delete player", error: error.message });
    }
});



//------------------------------------POST REQUESTS-----------------------------------------------------------------------------------
//Post request to create a team and insert it into the Team Table
app.post("/teams", async (req,res) =>{
    const {Team_Name, Wins, Losses, Ties, Coach, Stadium, City, Conference} = req.body
    const team = await createNewTeam(Team_Name, Wins, Losses, Ties, Coach, Stadium, City, Conference)

    res.status(201).send("Team Added")
})


app.post("/players", async (req, res) => {
    const playerData = req.body; // Assuming the request body contains the player data
    try {
        const playerId = await createPlayer(playerData);
        res.status(201).send({ id: playerId, message: "Player created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Failed to create player", error: error.message });
    }
});

app.use((err, req, res, next) =>{
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(8080, () =>{
    console.log("Server is running on http://localhost:8080/pages/homepage.html")
})
