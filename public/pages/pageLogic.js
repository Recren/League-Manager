window.addEventListener('DOMContentLoaded', async function(){
    //These run when the team pages is open
    if (window.location.href == "http://localhost:8080/pages/team-page.html"){
    console.log("hi")
        //This takes each team object, creates an html card for it and then displays it on the team page
        const teamPageContainer = document.querySelector(".teams-page-container")
        try {
            // Call the getTeamNames function to fetch all the team records
            const teams = await fetch("/teams").then((res)=> res.json());

            // Populate dropdown with team names
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
            console.error('Failed to fetch team names:', error);
        }

    }
}) 
