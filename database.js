import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

//Create our pool of connection to the mysql server
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise()

// Basic query to get all the teams
export async function getAllTeamsQuery() {
    //Note: await is waiting for the pool to fulfill its query promise
    const [result] = await pool.query("SELECT * FROM Team");
    return result
}

//Basic query to get a single team
export async function getSingleTeam(teamName) {
    //Note: await is waiting for the pool to fulfill its query promise
    const [result] = await pool.query(`SELECT * FROM Team
                                       WHERE Team_name = ?`, [teamName]); //Using a prepared value
    return result
}

//Insert Query
export async function createNewTeam(Team_Name, Wins, Losses, Ties, Coach, Stadium, City, Conference){
    const [result] = await pool.query(`INSERT INTO Team (Team_Name, Wins, Losses, Ties, Coach, Stadium, City, Conference)
                      VALUES (?,?,?,?,?,?,?,?)`, [Team_Name, Wins, Losses, Ties, Coach, Stadium, City, Conference])
    return result
}

//createNewTeam("testTeam", 0, 0, 0, "coach", "stadium", "city", "conference")

