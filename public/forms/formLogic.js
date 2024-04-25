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

    if(window.location.href == "http://localhost:8080/forms/add-box-score.html"){
        const hostContainer = document.querySelector(".host-players-container")
        const guestContainer = document.querySelector(".guest-players-container")
        //If we are here, we fetch the teams involved in the matches
        let hostTeam = localStorage.getItem('Host_team')
        let guestTeam = localStorage.getItem('Guest_team')

        try{

            //Run the query that fetches players for each team
            const hostPlayers = await fetch(`/players/${hostTeam}`).then((res)=> res.json());
            const guestPlayers = await fetch(`/players/${guestTeam}`).then((res)=> res.json());
            
            //For each host player, create a form field for them
            
            //---------------------Fill the form with the host players
            let i = 0   //keep track of everyone that is to be inserted into database
            hostPlayers.forEach(function(player){

                let playerStatContainer = document.createElement("div")
                playerStatContainer.className = "player-stats-container"
                
                //Creating the container for the first name
                let scoreContainer = document.createElement("div")

                let label = document.createElement("label")
                let text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "First Name:"
                label.setAttribute('for', `HFname${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `HFname${i}`
                input.name = `HFname${i}`
                input.value = player.Fname

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the Last name
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "Last Name:"
                label.setAttribute('for', `HLname${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `HLname${i}`
                input.name = `HLname${i}`
                input.value = player.Lname

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the Free Throws Made
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "FT Made:"
                label.setAttribute('for', `HFree_Throws_Made${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `HFree_Throws_Made${i}`
                input.name = `HFree_Throws_Made${i}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the Free Throws Attempted
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "FT Made:"
                label.setAttribute('for', `HFree_Throws_Attempted${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `HFree_Throws_Attempted${i}`
                input.name = `HFree_Throws_Attempted${i}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the Field Throws Made
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "FG Made:"
                label.setAttribute('for', `HField_Goals_Made${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `HField_Goals_Made${i}`
                input.name = `HField_Goals_Made${i}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the Field Throws Attempted
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "FG Attempted:"
                label.setAttribute('for', `HField_Goals_Attempted${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `HField_Goals_Attempted${i}`
                input.name = `HField_Goals_Attempted${i}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the 3 pointers Made
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "3P Made:"
                label.setAttribute('for', `HThree_pointers_made${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `HThree_pointers_made${i}`
                input.name = `HThree_pointers_made${i}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the 3 pointers Attempted
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "3P Attempted:"
                label.setAttribute('for', `HThree_pointers_attempted${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `HThree_pointers_attempted${i}`
                input.name = `HThree_pointers_attempted${i}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)
                hostContainer.appendChild(playerStatContainer)
                i++
            })

            //---------------------Fill the form with the guest players
            i = 0
            //Repeat the same procudure for the guest team
            guestPlayers.forEach(function(player){

                let playerStatContainer = document.createElement("div")
                playerStatContainer.className = "player-stats-container"
                
                //Creating the container for the first name
                let scoreContainer = document.createElement("div")

                let label = document.createElement("label")
                let text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "First Name:"
                label.setAttribute('for', `GFname${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `GFname${i}`
                input.name = `GFname${i}`
                input.value = player.Fname

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the Last name
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "Last Name:"
                label.setAttribute('for', `GLname${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `GLname${i}`
                input.name = `GLname${i}`
                input.value = player.Lname

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the Free Throws Made
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "FT Made:"
                label.setAttribute('for', `GFree_Throws_Made${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `GFree_Throws_Made${i}`
                input.name = `GFree_Throws_Made${i}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the Free Throws Attempted
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "FT Made:"
                label.setAttribute('for', `GFree_Throws_Attempted${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `GFree_Throws_Attempted${i}`
                input.name = `GFree_Throws_Attempted${i}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the Field Throws Made
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "FG Made:"
                label.setAttribute('for', `GField_Goals_Made${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `GField_Goals_Made${i}`
                input.name = `GField_Goals_Made${i}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the Field Throws Attempted
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "FG Attempted:"
                label.setAttribute('for', `GField_Goals_Attempted${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `GField_Goals_Attempted${i}`
                input.name = `GField_Goals_Attempted${i}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the 3 pointers Made
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "3P Made:"
                label.setAttribute('for', `GThree_pointers_made${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `GThree_pointers_made${i}`
                input.name = `GThree_pointers_made${i}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the 3 pointers Attempted
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "3P Attempted:"
                label.setAttribute('for', `GThree_pointers_attempted${i}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `GThree_pointers_attempted${i}`
                input.name = `GThree_pointers_attempted${i}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)
                guestContainer.appendChild(playerStatContainer)
                i++
            })

        }
        catch (error){
            console.error("Failed to fetch the players:", error)
        }
    }
});


