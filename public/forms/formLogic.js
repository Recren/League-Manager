//import { getTeamNames } from '../../database.js';

document.addEventListener("DOMContentLoaded", async function() {

    if (window.location.href == "http://localhost:8080/forms/add-player-form.html"){
        const dropdown = document.getElementById("Team_id");
        try {
            // Call the getTeamNames function to fetch team names
            const teams = await fetch("/teams/names").then((res)=> res.json());
            console.log(teams);
    
            // Populate dropdown with team names
            teams.forEach(function(team) {
                let option = document.createElement('option');
                option.value = team.Team_Name;
                option.textContent = team.Team_Name;
                dropdown.appendChild(option);
            });
        } catch (error) {
            console.error('Failed to fetch team names:', error);
        }
    }

    if(window.location.href == "http://localhost:8080/forms/add-match-form.html"){
        const hostDropdown = document.getElementById("Host_id")
        const guestDropdown = document.getElementById("Guest_Id")
        try{
            // Call the getTeamNames function to fetch team names
            const teams = await fetch("/teams/names").then((res)=> res.json());

            teams.forEach(function(team){
                let optionHost = document.createElement("option")
                optionHost.value = team.Team_Name
                optionHost.textContent = team.Team_Name
                
                let optionGuest = document.createElement("option")
                optionGuest.value = team.Team_Name
                optionGuest.textContent = team.Team_Name

                guestDropdown.appendChild(optionHost)
                hostDropdown.appendChild(optionGuest)
            })

        }
        catch (error){
            console.error("Failed to fetch team names:", error)
        }
    }

});


