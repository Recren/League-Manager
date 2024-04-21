//import { getTeamNames } from '../../database.js';

document.addEventListener("DOMContentLoaded", async function() {
    var dropdown = document.getElementById("team");

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
