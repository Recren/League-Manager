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


//--------------------------------------------------GET FUNCTIONS-----------------------------------------
// Basic query to get all the teams
export async function getAllTeamsQuery() {
    //Note: await is waiting for the pool to fulfill its query promise
    const [result] = await pool.query("SELECT * FROM Team");
    return result
}

// Query to get Team names

export async function getTeamNames() {
    //Note: await is waiting for the pool to fulfill its query promise
    const [result] = await pool.query("SELECT Team_Name FROM Team");
    return result
}

//Basic query to get a single team
export async function getSingleTeam(teamName) {
    //Note: await is waiting for the pool to fulfill its query promise
    const [result] = await pool.query(`SELECT * FROM Team
                                       WHERE Team_name = ?`, [teamName]); //Using a prepared value
    return result
}

// Export async function to get all the players
export async function getAllPlayers() {
    const [result] = await pool.query(`SELECT * FROM Player`);
    return result;
}

// Export async function to get player by Player_id
export async function getSinglePlayerById(playerId) {
    const [result] = await pool.query(`SELECT * FROM Player
                                       WHERE Player_id = ?`, [playerId]); //Using a prepared value
    return result;
}

// Export async function to get player by Fname and Lname
export async function getSinglePlayerByName(fname, lname) {
    const [result] = await pool.query(`SELECT * FROM Player
                                       WHERE Fname = ? AND Lname = ?`, [fname, lname]); //Using prepared values
    return result;
}

//Return all the players in a certain team
export async function getAllPlayersInTeam(Team_id){
    const [result] = await pool.query(`SELECT * FROM Player
                                       WHERE Team_id = ?`, [Team_id]);

    return result;
}

export async function getAllGames(){
    const [result] = await pool.query(`SELECT * From Game`)
    return result
}
//--------------------------------------------------CREATE FUNCTIONS-----------------------------------------

//Insert Query
export async function createNewTeam(Team_Name, Wins, Losses, Ties, Coach, Stadium, City, Conference){
    const [result] = await pool.query(`INSERT INTO Team (Team_Name, Wins, Losses, Ties, Coach, Stadium, City, Conference)
                      VALUES (?,?,?,?,?,?,?,?)`, [Team_Name, Wins, Losses, Ties, Coach, Stadium, City, Conference])
    return result
}



// Export async function to create a single player
export async function createPlayer(playerData) {
    const { Player_id = 0, Team_id, Fname, Lname, year_in_league, Jersey_num, is_active = true } = playerData;
    const query = `INSERT INTO Player (Player_id, Team_id, Fname, Lname, year_in_league, Jersey_num, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = await pool.query(query, [Player_id, Team_id, Fname, Lname, year_in_league, Jersey_num, is_active]);
    return result.insertId; // Return the ID of the newly created player
}


// Insert Query to create a new game
export async function createNewGame(Date, Host_id, Guest_Id, Host_Score, Guest_Score) {
        const sql = `INSERT INTO Game (Date, Host_id, Guest_Id, Host_Score, Guest_Score)
                     VALUES (?, ?, ?, ?, ?)`;
        const result = await pool.query(sql, [Date, Host_id, Guest_Id, Host_Score, Guest_Score]);
        return result;

}

//--------------------------------------------------DELETE FUNCTIONS-----------------------------------------

// Export async function to delete a single player
export async function deletePlayer(playerId) {
    const query = `DELETE FROM Player WHERE Player_id = ?`;
    const result = await pool.query(query, [playerId]);
    return result.affectedRows > 0; // Return true if a player was deleted, false otherwise
}

export async function deleteTeam(Team_Name){
    const result = await pool.query(`DELETE FROM Team
                                     WHERE Team_Name = ?`, [Team_Name])
    return result.affectedRows > 0; // Return true if a team was deleted, false otherwise
}


//Determine Winner function
export async function determineGameWinner(Date, Host_id, Guest_Id) {
    try {
        const sql = `SELECT Host_Score, Guest_Score FROM Game 
                     WHERE Date = ? AND Host_id = ? AND Guest_Id = ?`;
        const [games] = await pool.query(sql, [Date, Host_id, Guest_Id]);


        if (games.length > 0) {
            const game = games[0];
            if (game.Host_Score > game.Guest_Score) {
                return 'Host Wins';
            } else if (game.Host_Score < game.Guest_Score) {
                return 'Guest Wins';
            } else {
                return 'Tie';
            }
        } else {
            return 'Game not found';
        }
    } catch (error) {
        console.error('Failed to determine game winner:', error);
        throw error;
    }
}

//const data = await getTeamNames();
//console.log(data);
//createNewTeam("testTeam", 0, 0, 0, "coach", "stadium", "city", "conference")

