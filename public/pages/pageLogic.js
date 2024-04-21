window.addEventListener('DOMContentLoaded', async function(){
    //These run when the team pages is open
    if (window.location.href == "http://localhost:8080/pages/team-page.html"){
    
        //This takes each team object, creates an html card for it and then displays it on the team page
        const teamPageContainer = document.querySelector(".teams-page-container")
        try {
            // Call the getAllTeams function to fetch all the team records
            const teams = await fetch("/teams").then((res)=> res.json());

            teams.forEach(function(team) {
            //container for the teams
            let teamInfoCard = document.createElement("div");
            teamInfoCard.className = "team-info-card"

            //heading for team name
            let teamName = document.createElement("h3")
            teamName.style.cssText="font-size: 30px; margin: 0; margin-top: 20px"
            teamName.textContent = team.Team_Name
            
            //Coach name
            let coachName = document.createElement("p")
            coachName.style.margin = "10px";
            coachName.textContent = "Head Coach: " + team.Coach

            //Stadium
            let stadiumName = document.createElement("p")
            stadiumName.style.margin =  "10px";
            stadiumName.textContent = "Stadium: " + team.Stadium
            
            //City
            let city = document.createElement("p")
            city.style.margin =  "10px";
            city.textContent = "City: " + team.City

            //Record
            let record = document.createElement("p")
            record.style.margin =  "10px";
            if(team.Ties == 0){
                record.textContent = "Record: " + team.Wins + " - " + team.Losses
            }
            else{
                record.textContent = "Record: " + team.Wins + " - " + team.Losses + " - " +  team.Ties
            }

            teamInfoCard.appendChild(teamName)
            teamInfoCard.appendChild(coachName)
            teamInfoCard.appendChild(stadiumName)
            teamInfoCard.appendChild(city)
            teamInfoCard.appendChild(record)
            teamPageContainer.appendChild(teamInfoCard)

            });
        } catch (error) {
            console.error('Failed to fetch teams:', error);
        }

    }

       //Displays all the players in the database
       if (window.location.href == "http://localhost:8080/pages/player-page.html"){

            const playerPageContainer = document.querySelector(".players-page-container")
            try {
                // Call the getAllPlayers function to fetch all the player records
                const players = await fetch("/players").then((res)=> res.json());
    
                // Populate page with all the players
                players.forEach(function(player) {

                //container for the players
                let playerInfoCard = document.createElement("div");
                playerInfoCard.className = "player-info-card"
    
                //heading for the players name
                let playerName = document.createElement("h3")
                playerName.style.cssText="font-size: 30px; margin: 0; margin-top: 20px"
                playerName.textContent = player.Fname + " " + player.Lname
                
                //Team Name
                let teamName = document.createElement("p")
                teamName.style.margin = "10px";
                teamName.textContent = "Team: " + player.Team_id
    
                                
                //Jersey number
                let jersey = document.createElement("p")
                jersey.style.margin =  "10px";
                jersey.textContent = "Jersey number: " + player.Jersey_num

                //exp.
                let experience = document.createElement("p")
                experience.style.margin =  "10px";
                if(player.year_in_league == 0){
                    experience.textContent = "Experience: Rookie"
                }
                else{
                    experience.textContent = "Experience: " + player.year_in_league
                }
                


    
                playerInfoCard.appendChild(playerName)
                playerInfoCard.appendChild(teamName)
                playerInfoCard.appendChild(jersey)
                playerInfoCard.appendChild(experience)
                playerPageContainer.appendChild(playerInfoCard)
    
                });
            } catch (error) {
                console.error('Failed to fetch players:', error);
            }
    
        }
}) 
