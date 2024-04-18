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
// async function getAllTeamsQuery() {
//     //Note: await is waiting for the pool to fulfill its query promise
//     const [result] = await pool.query("SELECT * FROM Team");
//     console.log(result)

// }

// // Call the async function to start query
// getAllTeamsQuery();

// Basic query to get all the teams
// async function getSingleTeam(teamName) {
//     //Note: await is waiting for the pool to fulfill its query promise
//     const [result] = await pool.query(`SELECT * FROM Team
//                                        WHERE Team_name = ?`, [teamName]); //Using a prepared value
//     console.log(result)

// }
// getSingleTeam("Comets");