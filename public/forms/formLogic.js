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
        let date = localStorage.getItem('Date_played')
        console.log(date)
        try{

            //Run the query that fetches players for each team
            const hostPlayers = await fetch(`/players/${hostTeam}`).then((res)=> res.json());
            const guestPlayers = await fetch(`/players/${guestTeam}`).then((res)=> res.json());
            
            //Will contain the id's we need to create a box score
            let listOfHostPlayerIDs = []
            let listOfGuestPlayerIDs = []

            //For each host player, create a form field for them
            //---------------------Fill the form with the host players
            let hosti = 0   //keep track of everyone that is to be inserted into database
            hostPlayers.forEach(function(player){
                listOfHostPlayerIDs.push(player.Player_id)
                let playerStatContainer = document.createElement("div")
                playerStatContainer.className = "player-stats-container"
                
                //Creating the container for the first name
                let scoreContainer = document.createElement("div")

                let label = document.createElement("label")
                let text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "First Name:"
                label.setAttribute('for', `HFname${hosti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `HFname${hosti}`
                input.name = `HFname${hosti}`
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
                label.setAttribute('for', `HLname${hosti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `HLname${hosti}`
                input.name = `HLname${hosti}`
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
                label.setAttribute('for', `HFree_Throws_Made${hosti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `HFree_Throws_Made${hosti}`
                input.name = `HFree_Throws_Made${hosti}`
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
                label.setAttribute('for', `HFree_Throws_Attempted${hosti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `HFree_Throws_Attempted${hosti}`
                input.name = `HFree_Throws_Attempted${hosti}`
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
                label.setAttribute('for', `HField_Goals_Made${hosti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `HField_Goals_Made${hosti}`
                input.name = `HField_Goals_Made${hosti}`
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
                label.setAttribute('for', `HField_Goals_Attempted${hosti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `HField_Goals_Attempted${hosti}`
                input.name = `HField_Goals_Attempted${hosti}`
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
                label.setAttribute('for', `HThree_pointers_made${hosti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `HThree_pointers_made${hosti}`
                input.name = `HThree_pointers_made${hosti}`
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
                label.setAttribute('for', `HThree_pointers_attempted${hosti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `HThree_pointers_attempted${hosti}`
                input.name = `HThree_pointers_attempted${hosti}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for Assists
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "Assists:"
                label.setAttribute('for', `HAssists${hosti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `HAssists${hosti}`
                input.name = `HAssists${hosti}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)
                                
                
                //Creating the container for Rebounds
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "Rebounds:"
                label.setAttribute('for', `HRebounds${hosti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `HRebounds${hosti}`
                input.name = `HRebounds${hosti}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)
                                
                
                //Creating the container for Steals
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "Steals:"
                label.setAttribute('for', `HSteals${hosti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `HSteals${hosti}`
                input.name = `HSteals${hosti}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                hostContainer.appendChild(playerStatContainer)
                hosti++
            })

            //---------------------Fill the form with the guest players
            let guesti = 0
            //Repeat the same procudure for the guest team
            guestPlayers.forEach(function(player){
                listOfGuestPlayerIDs.push(player.Player_id)
                let playerStatContainer = document.createElement("div")
                playerStatContainer.className = "player-stats-container"
                
                //Creating the container for the first name
                let scoreContainer = document.createElement("div")

                let label = document.createElement("label")
                let text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "First Name:"
                label.setAttribute('for', `GFname${guesti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `GFname${guesti}`
                input.name = `GFname${guesti}`
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
                label.setAttribute('for', `GLname${guesti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "text"
                input.id = `GLname${guesti}`
                input.name = `GLname${guesti}`
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
                label.setAttribute('for', `GFree_Throws_Made${guesti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `GFree_Throws_Made${guesti}`
                input.name = `GFree_Throws_Made${guesti}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for the Free Throws Attempted
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "FT Attempted:"
                label.setAttribute('for', `GFree_Throws_Attempted${guesti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `GFree_Throws_Attempted${guesti}`
                input.name = `GFree_Throws_Attempted${guesti}`
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
                label.setAttribute('for', `GField_Goals_Made${guesti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `GField_Goals_Made${guesti}`
                input.name = `GField_Goals_Made${guesti}`
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
                label.setAttribute('for', `GField_Goals_Attempted${guesti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `GField_Goals_Attempted${guesti}`
                input.name = `GField_Goals_Attempted${guesti}`
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
                label.setAttribute('for', `GThree_pointers_made${guesti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `GThree_pointers_made${guesti}`
                input.name = `GThree_pointers_made${guesti}`
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
                label.setAttribute('for', `GThree_pointers_attempted${guesti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `GThree_pointers_attempted${guesti}`
                input.name = `GThree_pointers_attempted${guesti}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)

                //Creating the container for Assists
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "Assists:"
                label.setAttribute('for', `GAssists${guesti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `GAssists${guesti}`
                input.name = `GAssists${guesti}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)
                                
                
                //Creating the container for Rebounds
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "Rebounds:"
                label.setAttribute('for', `GRebounds${guesti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `GRebounds${guesti}`
                input.name = `GRebounds${guesti}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)
                                
                
                //Creating the container for Steals
                scoreContainer = document.createElement("div")

                label = document.createElement("label")
                text = document.createElement("p")
                text.className = "small-label"
                text.textContent = "Steals:"
                label.setAttribute('for', `GSteals${guesti}`)
                label.appendChild(text)

                input = document.createElement("input")
                input.className = "small-input"
                input.type = "number"
                input.id = `GSteals${guesti}`
                input.name = `GSteals${guesti}`
                input.value = 0

                scoreContainer.appendChild(label)
                scoreContainer.appendChild(input)
                playerStatContainer.appendChild(scoreContainer)
                guestContainer.appendChild(playerStatContainer)
                guesti++
            })

             // Add event listener to the form submit event
            document.getElementById("my-form").addEventListener("submit", function(event) {
                event.preventDefault(); // Prevent the default form submission

                let formData = new FormData(this); // Get form data and store it like a dictionary key/value
                
                let data = {};
                //Store each key value pair of the form data into our data dictionary
                for (var pair of formData.entries()) {
                    data[pair[0]] = pair[1];
                }
                
                //Data contains a dictionary that we need to parse through

                //console.log(data["HFree_Throws_Attempted1"])
                const jsDate = new Date();
                //For each record we created for host, run a loop that takes each input value and create a query for it
                for(let z = 0; z < hosti; z++){
                    //Convert each list of stats for one host player (denoted by z) into the correct format to insert into the table
                    let param = {
                        "Player_id": listOfHostPlayerIDs[z],
                        "Date": date,
                        "Assists": parseInt(data[`HAssists${z}`]),
                        "Rebounds": parseInt(data[`HRebounds${z}`]),
                        "Steals": parseInt(data[`HSteals${z}`]),
                        "Free_Throws_Made": parseInt(data[`HFree_Throws_Made${z}`]),
                        "Free_Throws_Attempted": parseInt(data[`HFree_Throws_Attempted${z}`]),
                        "Field_Goals_Made": parseInt(data[`HField_Goals_Made${z}`]),
                        "Field_Goals_Attempted": parseInt(data[`HField_Goals_Attempted${z}`]),
                        "Three_pointers_made": parseInt(data[`HThree_pointers_made${z}`]),
                        "Three_pointers_attempted": parseInt(data[`HThree_pointers_attempted${z}`]),
                    }

                    console.log(param["Three_pointers_made"])
                    //  jsDate.setDate(5)
                    //  jsDate.setMonth(5)
                    //  jsDate.setFullYear(2021)
                    // jsDate = jsDate.toISOString().split("T")[0]

                    // console.log(typeof(jsDate.toISOString().split("T")[0]))
                    // console.log(param['Date'])
                   
                try{
                    fetch('/box-score', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(param)
                    })
                    .then(response => response.text()).then(data => alert(data))
                }
                catch(error){
                    console.error("Box score could not be added", err)
                }
                    
                }

                //Once we are done, we route user back to the matches page
                //location.href = "../pages/matches-page.html"
            })
        }
        catch (error){
            console.error("Failed to fetch the players:", error)

        }
    }
});


