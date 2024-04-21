//import { getTeamNames } from '../../database.js';

document.addEventListener("DOMContentLoaded", async function() {
    var dropdown = document.getElementById("Team_id");

    try {
        // Call the getTeamNames function to fetch team names
        const teams = await fetch("/teams/names").then((res)=> res.json());
        console.log(teams);

        // Populate dropdown with team names
        teams.forEach(function(team) {
            var option = document.createElement('option');
            option.value = team.Team_Name;
            option.textContent = team.Team_Name;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to fetch team names:', error);
    }
});

// Import the necessary function to create a player

document.addEventListener("DOMContentLoaded", function() {
    // Select the form element
    var playerForm = document.getElementById("player-form");

    // Add an event listener to the form submission
    playerForm.addEventListener("submit", async function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get form field values
        var player = {
            Player_id: Math.floor(Math.random() * 100), // Get Player_id from form input
            Team_id: document.getElementById("team").value, // Get Team_id from form input
            Fname: document.getElementById("fname").value, // Get Fname from form input
            Lname: document.getElementById("lname").value, // Get Lname from form input
            year_in_league: document.getElementById("experience").value, // Get year_in_league from form input
            Jersey_num: document.getElementById("jesery_num").value, // Get Jersey_num from form input
            is_active: true // Get is_active from form input
        };
        

        try {
            // Send a POST request with form data to create a new player
            const playerId = await fetch("/players", {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(player),
              });

            // Optionally, handle the response
            console.log("New player created with ID:", playerId);
        } catch (error) {
            console.error('Failed to create player:', error);
        }
    });
});
