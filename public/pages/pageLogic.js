window.addEventListener('DOMContentLoaded', async function(){
    //--------------------------------------------------TEAM RELATED FUNCTIONS------------------------------------------------
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
            let Team_id = team.Team_Name
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

            //view more info about the team button
            let viewMore = document.createElement("button")
            viewMore.textContent = "View more"
            viewMore.style.fontSize = "16px"
            //When we click the button, we store the team name in local storage which is to be used as a query for the team-info.html page
            viewMore.onclick = function(){
                localStorage.setItem("team", team.Team_Name)
                location.href = "team-info.html"
            }
            teamInfoCard.appendChild(teamName)
            teamInfoCard.appendChild(coachName)
            teamInfoCard.appendChild(stadiumName)
            teamInfoCard.appendChild(city)
            teamInfoCard.appendChild(record)
            teamInfoCard.appendChild(viewMore)
            teamPageContainer.appendChild(teamInfoCard)

            });
        } catch (error) {
            console.error('Failed to fetch teams:', error);
        }

    }

    if (window.location.href == "http://localhost:8080/pages/team-info.html"){
        try{
            //If we are here, we fetch which team we are working with
            let teamToDisplay = localStorage.getItem('team')

            //Run the query that fetches the data for a single team
            const [team] = await fetch(`/teams/${teamToDisplay}`).then((res)=> res.json());
            let teamInfoHeader = this.document.querySelector(".team-info-header")
            //Coach name
            let coachName = document.createElement("p")
            coachName.style.fontSize = "20px"
            coachName.style.margin = "10px";
            coachName.textContent = "Head Coach: " + team.Coach
            
            //Stadium
            let stadiumName = document.createElement("p")
            stadiumName.style.fontSize = "20px"
            stadiumName.style.margin =  "10px";
            stadiumName.textContent = "Stadium: " + team.Stadium
                        
            //City
            let city = document.createElement("p")
            city.style.fontSize = "20px"
            city.style.margin =  "10px";
            city.textContent = "City: " + team.City
            
            //Record
            let record = document.createElement("p")
            record.style.fontSize = "20px"
            record.style.margin =  "10px";
            if(team.Ties == 0){
                record.textContent = "Record: " + team.Wins + " - " + team.Losses
            }
            else{
                record.textContent = "Record: " + team.Wins + " - " + team.Losses + " - " +  team.Ties
            }
            
            teamInfoHeader.appendChild(coachName)
            teamInfoHeader.appendChild(stadiumName)
            teamInfoHeader.appendChild(city)
            teamInfoHeader.appendChild(record)

            try{
                //Fetch all the players that belong to that team
                const players = await fetch(`/players/${teamToDisplay}`).then((res)=> res.json())
                const container = document.querySelector(".container")

                console.log(players)
                //Display all the players on the team
                players.forEach(function(player) {

                    let playerContainer = document.createElement("div")
                    playerContainer.className = "players-record"

                    let playerName = document.createElement("p")
                    playerName.style.margin = "0px"
                    playerName.style.marginTop = "20px"
                    playerName.style.fontSize = "25px"
                    playerName.textContent = player.Fname + " " + player.Lname

                    let jersey = document.createElement("p")
                    jersey.style.margin = "2px"
                    jersey.style.fontSize = "25px"
                    jersey.textContent = player.Jersey_num

                    let experience = document.createElement("p")
                    experience.style.margin = "2px"
                    experience.style.fontSize = "18px"
                    if(player.year_in_league == 0){
                        experience.textContent = "Experience: Rookie"
                    }
                    else{
                        experience.textContent = "Experience: " + player.year_in_league
                    }

                    //Insert a query to fetch their stats and fill in the stats here:
                    let playerStats = document.createElement("div")
                    playerStats.className = "player-stats"

                    let pointsPerGame = document.createElement("p")
                    pointsPerGame.style.margin = "0px"
                    pointsPerGame.textContent = "P.P.G: " + "0"

                    let assistsPerGame = document.createElement("p")
                    assistsPerGame.style.margin = "0px"
                    assistsPerGame.textContent = "A.P.G: " + "0"

                    let reboundsPerGame = document.createElement("p")
                    reboundsPerGame.style.margin = "0px"
                    reboundsPerGame.textContent = "R.P.G: " + "0"

                    let freeThrowPercent = document.createElement("p")
                    freeThrowPercent.style.margin = "0px"
                    freeThrowPercent.textContent = "F.T %: " + "0"

                    let fieldGoalPercent = document.createElement("p")
                    fieldGoalPercent.style.margin = "0px"
                    fieldGoalPercent.textContent = "F.G %: " + "0"

                    let threePointPercent = document.createElement("p")
                    threePointPercent.style.margin = "0px"
                    threePointPercent.textContent = "3.P %: " + "0"

                    playerContainer.appendChild(playerName)
                    playerContainer.appendChild(jersey)
                    playerContainer.appendChild(experience)
                    playerStats.appendChild(pointsPerGame)
                    playerStats.appendChild(assistsPerGame)
                    playerStats.appendChild(reboundsPerGame)
                    playerStats.appendChild(freeThrowPercent)
                    playerStats.appendChild(fieldGoalPercent)
                    playerStats.appendChild(threePointPercent)
                    playerContainer.appendChild(playerStats)
                    container.appendChild(playerContainer)
                });

            }
            catch (error){
                console.error('Failed to fetch the players on that specific team', error);
            }
        }
        catch (error){ 
            console.error('Failed to fetch info on that specific team', error);
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

    //Displays all the current matches
    if (window.location.href == "http://localhost:8080/pages/matches-page.html"){

        let container = document.querySelector(".container")

        try{
            //Fetch all the records of the games and display them
            const gameRecords = await fetch("/games").then((res)=> res.json());
            console.log(gameRecords)

            gameRecords.forEach(function(game){
                let gameContainer = document.createElement("div")
                gameContainer.className = "game-info-card"

                let date = document.createElement("h1")
                let tempDate = game.Date.split("T")[0]
                tempDate = tempDate.split("-")
                date.textContent = tempDate[1] + "/" + tempDate[2] + "/" + tempDate[0]

                let teamHeadline = document.createElement("h2")
                teamHeadline.textContent = game.Host_id + " vs " + game.Guest_Id

                let score = document.createElement("h3")
                score.textContent = game.Host_Score + " - " + game.Guest_Score


                gameContainer.appendChild(date)
                gameContainer.appendChild(teamHeadline)
                gameContainer.appendChild(score)
                container.appendChild(gameContainer)
            })

        }
        catch (error){
            console.error("Failed to fetch game records", error)
        }
    }
}) 
