$(document).ready(function () {

    hidebuttons($('#currentGames'), true)

    var nbaBtn = ['Lakers', 'Suns', 'Knicks', 'Pacers', 'Spurs', 'Rockets', 'Warriors', 'Kings', 'Clippers', 'Thunder', 'Wizards', 'Timberwolves', 'Hornets', 'Jazz', 'Nets', 'Pistons', 'Trail_Blazers', 'Pelicans', 'Hawks', 'Grizzlies', 'Magic', 'Bucks', 'Bulls', 'Maverics', '76ers', 'Cavaliers', 'Celtics', 'Raptors', 'Nuggets', 'Heat'];
    var nbaCities = ['Los_Angeles_', 'Pheonix_', 'New_York_', 'Indiana_', 'San_Antonio_', 'Houston_', 'Golden_State_', 'Sacramento_', 'Los_Angeles_', 'Oklahoma_City_', 'Washington_', 'Minnisota_', 'Charlotte_', 'Utah_', 'New_Jersey_', 'Detroit_', 'Portland_', 'New_Orleans', 'Atlanta_', 'Memphis_', 'Orlando_', 'Milwaukee_', 'Chicago_', 'Dallas_', 'Philadelphia_', 'Clevland', 'Boston_', 'Toronto_', 'Denver_', 'Miami_']
    function appendOptions(array, array2, appendHere) {
        for (var i = 0; i < array.length; i++) {
            //append the option
            appendHere;
            var option = $('<option>');
            option.attr('value', array2[i] + array[i]);
            option.text(array[i]);
            appendHere.append(option)
        }
    };
    appendOptions(nbaBtn, nbaCities, $("#teamSel"));

    //when submit button is clicked
    $("#submit").on("click", function () {
        event.preventDefault();

        var input = $("#searchteams").val();

        console.log(input);

        $("#searchteams").val("");

        //appendTeams();
        //appendScores();


    })
 $('#defaultGames')
 $('#currentGames')

    function hidebuttons(selectedGroup, question) {
        if (question === true) {
            console.log("Hiding- "+ selectedGroup)
            selectedGroup.hide()
        } else if (question === false) {
            console.log("Showing- " + selectedGroup)
            selectedGroup.show()
        }
    }
    

    function defaultGames() {


        var queryURL3 = 'https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4387'


        $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function (response3) {
            console.log(response3);
            console.log(response3.events[0].strFilename)
            for (var i = 0; i < 5; i++) {
                var newGame2 = $('<div>');
                newGame2.attr("id", "newgame2");
                var newRow = $("<tr>");

                var game2 = response3.events[i].strFilename;
                var home2 = response3.events[i].strHomeTeam + ": " + response3.events[i].intHomeScore;
                var away2 = response3.events[i].strAwayTeam + ": " + response3.events[i].intAwayScore;
                newGame2.html('<br>'+ game2 + '<br>' + home2 + '<br>' + away2);


                $('#defaultGames').append(newGame2)
            }

        })



    }    
defaultGames();    
    
    


    function getTeamId() {
        $('#submitTeam').on('click', function(){
            hidebuttons($('#defaultGames'), true);
            hidebuttons($('#currentGames'), false);
            var teamName = $('#teamSel').val().trim();
            localStorage.setItem('teamSelected', teamName);
            
            console.log("local Storage: " + localStorage.getItem('teamSelected'));
            var queryURL = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=' + localStorage.getItem('teamSelected');
       
        
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            
            var teamId = response.teams[0].idTeam;
            console.log(response.teams[0].idTeam)
            console.log(teamId)
            pullGames(teamId);
        })
        });
        

    }

    getTeamId();
    function pullGames(teamId) {


        var queryURL2 = "https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=" + teamId;


        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response2) {

            for (var i = 0; i < response2.results.length; i++) {
                var newGame = $('<div>');
                newGame.attr("id", "newgame");

                var game = response2.results[i].strFilename;
                var home = response2.results[i].strHomeTeam + ": " + response2.results[i].intHomeScore;
                var away = response2.results[i].strAwayTeam + ": " + response2.results[i].intAwayScore;
                newGame.html('<br>'+game + '<br>' + home + '<br>' + away);
                
                $('#currentGames').append(newGame)
            }

        })



    }
 


    //betting odds api
    var apiKey = 'f19092ccab23fca0c43360e65380f0b8'
    var queryURL = 'https://api.the-odds-api.com/v3/odds?sport=basketball_nba&region=us&mkt=h2h&mkt=spreads&apiKey=' + apiKey
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .then(function (response) {
            console.log(response)
            var fetch = response.data
            console.log(response.data.length)
            for (var i = 0; i < response.data.length; i++) {
                console.log('Sites.lenght: '+fetch[i].sites.length);
                var homeTeam = fetch[i].home_team;
                var fetchSites;
                
                if (fetch[i].sites.length > 0){
                    fetchSites = fetch[i].sites[0].site_key;
                    console.log('fetch sites: ' + fetchSites)
                }else{
                    continue
                }                                                                
                var fetchOdds = fetch[i].sites[0].odds.spreads.odds;
                var getSpread = fetch[i].sites[0].odds.spreads.points;
                var visitorTeam = fetch[i].teams[0];
                var fetchVOdds = fetchOdds[0];
                var fetchHOdds = fetchOdds[1];
                var getVSpread = getSpread[0];
                var getHSpread = getSpread[1];
                console.log(homeTeam);
                console.log(fetchSites);
                console.log(fetchOdds);
                console.log(getSpread);

                var newRow = $("<tr>");
                var newCol = $("<td>");
                newCol.attr("id", "newcol");
                newCol.append('<br>Home: ' + homeTeam + ' <br>Spread: ' + getHSpread + " <br> Odds: " + fetchHOdds + '<br><br> Visitor: ' + visitorTeam + '<br> Spread: ' + getVSpread + " <br>Odds: " + fetchVOdds + "<br>Source: " + fetchSites);
                newRow.append(newCol);
                $("#displayOdds").append(newRow);
            }
        });

})