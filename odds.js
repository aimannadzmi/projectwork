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
            "Authorization": "Basic " + btoa('4b9b56f3-9244-40f1-a108-f02fe9' + ":" + 'palabra11'),
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
          url: 'https://cors-escape.herokuapp.com/https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/scoreboard.json?fordate=20190107',
          dataType: 'json',
          async: false,
          headers: {
            "Authorization": "Basic " + btoa('4b9b56f3-9244-40f1-a108-f02fe9' + ":" + 'palabra11'),
          },

        }).then(function (response) {
            console.log(response)
            for (var i = 0; i < response.scoreboard.gameScore.length; i++) {
                var game = $('<div>');
                var home = $('<div>');
                var away = $('<div>');


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

                game.html('<br>' + gameDate + ' ' + gameTime);
                home.append(homeTeamCity + ' ' + homeTeamName + ': ' + homeTeamScore);
                away.html(awayTeamCity + ' ' + awayTeamName + ': ' + awayTeamScore);

                $('#defaultGames').append(game)
                $('#defaultGames').append(home)
                $('#defaultGames').append(away)



                $("#defaultGames").append(homeImage, "<div class='vs'> vs.  </div>", awayImage);
               
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
            "Authorization": "Basic " + btoa('4b9b56f3-9244-40f1-a108-f02fe9' + ":" + 'palabra11'),
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
            "Authorization": "Basic " + btoa('4b9b56f3-9244-40f1-a108-f02fe9' + ":" + 'palabra11'),
          },

        }).then(function (response) {
            console.log(response.playerinjuries.playerentry[0]);
            
            for (var i = 0; i < response.playerinjuries.playerentry.length; i++) {
                var newEntry = $('<div>');

                var fn = response.playerinjuries.playerentry[i].player.FirstName;
                var ln = response.playerinjuries.playerentry[i].player.LastName;
                var injury = response.playerinjuries.playerentry[i].injury;
                
                newEntry.html(fn + ' ' + ln + '<br>' + injury)

                $('#playerInjury').prepend(newEntry, '<br>')
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
                var newCol = $("<td>");
                newCol.attr("id", "newcol");
                newCol.append('<br>Home: ' + homeTeam + ' <br>Spread: ' + getHSpread + " <br> Odds: " + fetchHOdds + '<br><br> Visitor: ' + visitorTeam + '<br> Spread: ' + getVSpread + " <br>Odds: " + fetchVOdds + "Source: " + fetchSites);
                newRow.append(newCol);
                $("#displayOdds").append(newRow);
            }
        });

});
