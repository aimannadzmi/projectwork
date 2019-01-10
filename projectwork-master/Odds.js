$(document).ready(function () {

    hidebuttons($('#currentGames'), true)

    var nbaBtn = ['Lakers', 'Suns', 'Knicks', 'Pacers', 'Spurs', 'Rockets', 'Warriors', 'Kings', 'Clippers', 'Thunder', 'Wizards', 'Timberwolves', 'Hornets', 'Jazz', 'Nets', 'Pistons', 'Trail_Blazers', 'Pelicans', 'Hawks', 'Grizzlies', 'Magic', 'Bucks', 'Bulls', 'Maverics', '76ers', 'Cavaliers', 'Celtics', 'Raptors', 'Nuggets', 'Heat'];
    var nbaCities = ['Los_Angeles_', 'Phoenix_', 'New_York_', 'Indiana_', 'San_Antonio_', 'Houston_', 'Golden_State_', 'Sacramento_', 'Los_Angeles_', 'Oklahoma_City_', 'Washington_', 'Minnisota_', 'Charlotte_', 'Utah_', 'New_Jersey_', 'Detroit_', 'Portland_', 'New_Orleans', 'Atlanta_', 'Memphis_', 'Orlando_', 'Milwaukee_', 'Chicago_', 'Dallas_', 'Philadelphia_', 'Clevland', 'Boston_', 'Toronto_', 'Denver_', 'Miami_']
    var nbaShort= ['lal', 'phx', 'nyk', 'ind','sas','hou', 'gsw', 'sac', 'lac', 'okc', 'was', 'min', 'cha', 'uta', 'bkn', 'det', 'por', 'nop', 'atl', 'mem', 'orl', 'mil', 'chi', 'dal', 'phi', 'cle', 'bos', 'tor', 'den', 'mia']
    function appendOptions(array, array2, array3, appendHere) {
        for (var i = 0; i < array.length; i++) {
            //append the option
            appendHere;
            var option = $('<option>');
            option.attr('value', array3[i]);
            option.text(array[i]);
            appendHere.append(option)
        }
    };
    appendOptions(nbaBtn, nbaCities, nbaShort, $("#teamSel"));

    //when submit button is clicked
    $("#submit").on("click", function () {
        event.preventDefault();
        var input = $("#searchteams").val();
        // console.log(input);
        $("#searchteams").val("");
        //appendTeams();
        //appendScores();
    });
    $('#defaultGames');
    $('#currentGames');

    function hidebuttons(selectedGroup, question) {
        if (question === true) {
            // console.log("Hiding- " + selectedGroup)
            selectedGroup.hide()
        } else if (question === false) {
            // console.log("Showing- " + selectedGroup)
            selectedGroup.show()
        }
    };

    function teamRankings() {

        $.ajax
        ({
          method: "GET",
          url: 'https://cors-escape.herokuapp.com/https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/overall_team_standings.json',
          dataType: 'json',
          async: false,
          headers: {
            "Authorization": "Basic " + btoa('9f0ad004-47be-4b5c-93ce-c24f24' + ":" + 'palabra11'),
          },

        }).then(function (response) {
            // console.log(response);
            // console.log(response.overallteamstandings.teamstandingsentry[0].team.City);
            for (var i = 0; i < response.overallteamstandings.teamstandingsentry.length; i++) {
                var newEntry = $('<div>');

                var rank = response.overallteamstandings.teamstandingsentry[i].rank;
                var city = response.overallteamstandings.teamstandingsentry[i].team.City;
                var team = response.overallteamstandings.teamstandingsentry[i].team.Name;

                newEntry.html('<br>' + 'Team Rank: ' + rank + '<br>' + 'Team: ' + city + ' ' + team)

                // $('#defaultGames').append(newEntry)
            }
        })

    };
    teamRankings();

    function defaultGames() {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
        dd = '0' + dd;
        }

        if (mm < 10) {
        mm = '0' + mm;
        }

        today = yyyy + mm + dd;
        console.log('today is: ' + today);

        $.ajax
        ({
          method: "GET",
          url: 'https://cors-escape.herokuapp.com/https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/scoreboard.json?fordate=' + today,
          dataType: 'json',
          async: false,
          headers: {
            "Authorization": "Basic " + btoa('9f0ad004-47be-4b5c-93ce-c24f24' + ":" + 'palabra11'),
          },

        }).then(function (response) {
            console.log(response)
            for (var i = 0; i < response.scoreboard.gameScore.length; i++) {
                var game = $('<div>');
                var home = $('<div>');
                var away = $('<div>');
                var newDiv = $('<div>');
                var newDiv2 = $('<div>');
                var newDiv3 = $('<div>');
                var newDiv4 = $('<div>');
                var newDiv5 = $('<div>');

                var newRow = $('<tr>');
                var newRow2 = $('<tr>');
                var newRow3 = $('<tr>');
                var newRow4 = $('<tr>');
                var newRow5 = $('<tr>');

                var homeTeamCity = response.scoreboard.gameScore[i].game.homeTeam.City;
                var homeTeamName = response.scoreboard.gameScore[i].game.homeTeam.Name;

                var awayTeamCity = response.scoreboard.gameScore[i].game.awayTeam.City;
                var awayTeamName = response.scoreboard.gameScore[i].game.awayTeam.Name;

                var homeTeamScore = response.scoreboard.gameScore[i].homeScore;
                var awayTeamScore = response.scoreboard.gameScore[i].awayScore;

                var gameDate = response.scoreboard.gameScore[i].game.date;
                var gameTime = response.scoreboard.gameScore[i].game.time;

                var homeImage = $("<img>");
                var awayImage = $("<img>");
                homeImage.attr("src", "images/" + homeTeamName + ".gif" );
                awayImage.attr("src", "images/" + awayTeamName + ".gif");

                console.log(homeTeamName);

                game.attr("id", "game");
                game.html('<br>' + gameDate + '<br>' + gameTime);

                home.attr("id", "homeDiv");
                home.append(homeTeamCity + ' ' + homeTeamName + ': ' + homeTeamScore);

                away.attr("id", "awayDiv");
                away.html(awayTeamCity + ' ' + awayTeamName + ': ' + awayTeamScore);

                // newTD.append(homeImage);
                homeImage.attr("id", "logoimage1");
                newDiv.append(newRow);
                newRow.append(homeImage);
                $("#homeLogo").append(newRow);


                // newTD2.append(home);
                newDiv2.attr("id", "div2");
                newRow2.attr("id", "row2");
                newDiv2.append(newRow2);
                newRow2.append(home);
                $('#homeScore').append(newRow2);

                // newTD3.append(game);
                newDiv3.attr("id", "div3");
                newDiv3.append(newRow3);
                newRow3.append(game);
                $('#gameDate').append(newRow3);

                
                // newTD4.append(away);
                newDiv4.attr("id", "div4");
                newDiv4.append(newRow4);
                newRow4.append(away)
                $('#awayScore').append(newRow4);

                // newTD5.append(awayImage)
                awayImage.attr("id", "logoimage2");
                newDiv5.append(newRow5);
                newRow5.append(awayImage);
                $('#awayLogo').append(newRow5);


            }
        })

    };
    defaultGames();

    var teamAbb;

    function pullGames() {
        $('#submitTeam').on('click', function () {
            hidebuttons($('#defaultGames'), true);
            hidebuttons($('#currentGames'), false);
        teamAbb = $('#teamSel').val().trim()
        var date = 'since-2-weeks-ago'

        $.ajax
        ({
          method: "GET",
          url: 'https://cors-escape.herokuapp.com/https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/team_gamelogs.json?team=' + teamAbb + '&date=' + date,
          dataType: 'json',
          async: false,
          headers: {
            "Authorization": "Basic " + btoa('9f0ad004-47be-4b5c-93ce-c24f24' + ":" + 'palabra11'),
          },

        }).then(function (response2) {

        $('#currentGames').empty();
        for (var i = 1; i < response2.teamgamelogs.gamelogs.length; i++) {

            var game = $('<p>')
            var team = $('<p>')
            var otherTeam = $('<p>')
            

            var homeTeamCity = response2.teamgamelogs.gamelogs[i].game.homeTeam.City;
            var homeTeamName = response2.teamgamelogs.gamelogs[i].game.homeTeam.Name;

            var awayTeamCity = response2.teamgamelogs.gamelogs[i].game.awayTeam.City;
            var awayTeamName = response2.teamgamelogs.gamelogs[i].game.awayTeam.Name;

            var teamScore = response2.teamgamelogs.gamelogs[i].stats.Pts['#text'];
            var teamScoreAgainst = response2.teamgamelogs.gamelogs[i].stats.PtsAgainst['#text'];

            var gameDate = response2.teamgamelogs.gamelogs[i].game.date;
            var gameTime = response2.teamgamelogs.gamelogs[i].game.time;

            if (teamAbb.toUpperCase() == response2.teamgamelogs.gamelogs[i].game.homeTeam.Abbreviation) {
                team.text(homeTeamCity + ' ' + homeTeamName + ': ' + teamScore);
                otherTeam.text(awayTeamCity + ' ' + awayTeamName + ': ' + teamScoreAgainst);
            } else {
                team.text(awayTeamCity + ' ' + awayTeamName + ': ' + teamScoreAgainst);
                otherTeam.text(homeTeamCity + ' ' + homeTeamName + ': ' + teamScore)
            }

            game.text(gameDate + ' ' + gameTime);
            
            
            $('#currentGames').append(game, '<br>', team, '<br>', otherTeam);

            
        }

        })


    })
    }
    pullGames();

    function upcomingGames() {
        $('#submitTeam').on('click', function () {
        teamAbb = $('#teamSel').val().trim()
        var date = 'until-5-days-from-now'

        $.ajax
        ({
          method: "GET",
          url: 'https://cors-escape.herokuapp.com/https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/full_game_schedule.json?team=' + teamAbb + '&date=' + date,
          dataType: 'json',
          async: false,
          headers: {
            "Authorization": "Basic " + btoa('9f0ad004-47be-4b5c-93ce-c24f24' + ":" + 'palabra11'),
          },

        }).then(function (response2) {
        console.log(response2)

        for (var i = 0; i < response2.fullgameschedule.gameentry.length; i++) {

            var game = $('<p>')
            var team = $('<p>')
            var otherTeam = $('<p>')
            
            console.log('UPCOMING')
            var homeTeamCity = response2.fullgameschedule.gameentry[i].homeTeam.City;
            var homeTeamName = response2.fullgameschedule.gameentry[i].homeTeam.Name;
            console.log(response2.fullgameschedule.gameentry[0].homeTeam.City)
            var awayTeamCity = response2.fullgameschedule.gameentry[i].awayTeam.City;
            var awayTeamName = response2.fullgameschedule.gameentry[i].awayTeam.Name;

            var gameDate = response2.fullgameschedule.gameentry[i].date;
            var gameTime = response2.fullgameschedule.gameentry[i].time;
            
            if (teamAbb.toUpperCase() == response2.fullgameschedule.gameentry[i].homeTeam.Abbreviation) {
                console.log(teamAbb)
                team.text(homeTeamCity + ' ' + homeTeamName);
                otherTeam.text(awayTeamCity + ' ' + awayTeamName);
            } else {
                team.text(awayTeamCity + ' ' + awayTeamName);
                otherTeam.text(homeTeamCity + ' ' + homeTeamName)
            }

            game.text(gameDate + ' ' + gameTime);
            console.log(game)
            
            $('#currentGames').prepend(game, '<br>', team, '<br>', otherTeam);

            console.log(game, team)
        }   

        })


    })
    }
    upcomingGames();

    function injuries() {
        $('#submitTeam').on('click', function () {
        
            teamAbb = $('#teamSel').val().trim()

        $.ajax
        ({
          method: "GET",
          url: 'https://cors-escape.herokuapp.com/https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/player_injuries.json?team=' + teamAbb,
          dataType: 'json',
          async: false,
          headers: {
            "Authorization": "Basic " + btoa('9f0ad004-47be-4b5c-93ce-c24f24' + ":" + 'palabra11'),
          },

        }).then(function (response) {
            console.log(response.playerinjuries.playerentry[0]);
            
            for (var i = 0; i < response.playerinjuries.playerentry.length; i++) {
                var newEntry = $('<div>');
                var newEntry2 = $('<div>');
                var newRow = $("<tr>");
                var newRow2 = $("<tr>");

                var fn = response.playerinjuries.playerentry[i].player.FirstName;
                var ln = response.playerinjuries.playerentry[i].player.LastName;
                var injury = response.playerinjuries.playerentry[i].injury;
                
                newEntry.attr("id", "playerName");
                newEntry.html(fn + ' ' + ln);
                newRow.append(newEntry);
                $('#playerNames').prepend(newEntry);

                newEntry2.attr("id", "playerInjury");
                newEntry2.html(injury);
                newRow.append(newEntry2);
                $('#playerInjuries').prepend(newEntry2);
            }

        })
    })
    };
    injuries();

    //betting odds api
    var apiKey = 'f19092ccab23fca0c43360e65380f0b8'
    var queryURL = 'https://api.the-odds-api.com/v3/odds?sport=basketball_nba&region=us&mkt=h2h&mkt=spreads&apiKey=' + apiKey
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .then(function (response) {
            // console.log(response)
            var fetch = response.data
            // console.log(response.data.length)
            for (var i = 0; i < response.data.length; i++) {
                // console.log('Sites.lenght: ' + fetch[i].sites.length);
                var homeTeam = fetch[i].home_team;
                var fetchSites;

                if (fetch[i].sites.length > 0) {
                    fetchSites = fetch[i].sites[0].site_key;
                    // console.log('fetch sites: ' + fetchSites)
                } else {
                    continue
                }
                var fetchOdds = fetch[i].sites[0].odds.spreads.odds;
                var getSpread = fetch[i].sites[0].odds.spreads.points;
                var visitorTeam = fetch[i].teams[0];
                var fetchVOdds = fetchOdds[0];
                var fetchHOdds = fetchOdds[1];
                var getVSpread = getSpread[0];
                var getHSpread = getSpread[1];
                // console.log(homeTeam);
                // console.log(fetchSites);
                // console.log(fetchOdds);
                // console.log(getSpread);

                var newRow = $("<tr>");
                var newRow2 = $("<tr>");
                var newRow3 = $("<tr>");
                var newRow4 = $("<tr>");
                var newRow5 = $("<tr>");
                var newRow6 = $("<tr>");
                var newRow7 = $("<tr>");

                var newDiv = $('<div>');
                var newDiv2 = $('<div>');
                var newDiv3 = $('<div>');
                var newDiv4 = $('<div>');
                var newDiv5 = $('<div>');
                var newDiv6 = $('<div>');
                var newDiv7 = $('<div>');

                // var newCol = $("<td>");
                // newCol.attr("id", "newcol");
                // newCol.append('<br>Home: ' + homeTeam + ' <br>Spread: ' + getHSpread + " <br> Odds: " + fetchHOdds + '<br><br> Visitor: ' + visitorTeam + '<br> Spread: ' + getVSpread + " <br>Odds: " + fetchVOdds + "<br>" + "Source: " + fetchSites);
                // newRow.append(newCol);
                // $("#displayOdds").append(newRow);
                function appendOdds(){
                newDiv.attr("id", "homeTeam1");
                newRow.append(homeTeam);
                newDiv.append(newRow);
                $("#homeBet").append(newDiv);

                newDiv2.attr("id", "visitorTeam1");
                newRow2.append(visitorTeam);
                newDiv2.append(newRow2)
                $("#awayBet").append(newDiv2);

                newDiv3.attr("id", "hSpread");
                newRow3.append(getHSpread);
                newDiv3.append(newRow3)
                $("#homeSpread").append(newDiv3);

                newDiv4.attr("id", "hOdds");
                newRow4.append(fetchHOdds);
                newDiv4.append(newRow4);
                $("#homeOdds").append(newDiv4);

                newDiv5.attr("id", "vSpread");
                newRow5.append(getVSpread);
                newDiv5.append(newRow5);
                $("#awaySpread").append(newDiv5);

                newDiv6.attr("id", "vOdds");
                newRow6.append(fetchVOdds);
                newDiv6.append(newRow6);
                $("#awayOdds").append(newDiv6);

                newDiv7.attr("id", "sites");
                newRow7.append(fetchSites);
                newDiv7.append(newRow7);
                $("betSource").html(newDiv7);
                
                console.log("test!!");
                }
                appendOdds();






            }
        });

});

