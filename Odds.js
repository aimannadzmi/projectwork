$(document).ready(function () {
    var nbaBtn = ['Lakers', 'Suns', 'Knicks', 'Pacers', 'Spurs', 'Rockets', 'Wariors', 'Kings', 'Clippers', 'Thunder', 'Wizards', 'Timberwolves', 'Hornets', 'Jazz', 'Nets', 'Pistons', 'Trail_Blazers', 'Pelicans', 'Hawks', 'Grizzlies', 'Magic', 'Bucks', 'Bulls', 'Maverics', '76ers', 'Cavaliers', 'Celtics', 'Raptors', 'Nuggets', 'Heat'];
    var nbaCities= ['Los_Angeles_', 'Phenox_', 'New_York_', 'Indiana_', 'San_Antonio_', 'Houston_', 'Golden_State_','Sacramento_', 'Los_Angeles_', 'Oklahoma_City_', 'Washington_', 'Minnisota_', 'Charlotte_', 'Utah_', 'New_Jersey_', 'Detroit_', 'Portland_','New_Orleans', 'Atlanta_', 'Memphis_', 'Orlando_','Milwaukee_','Chicago_','Dallas_', 'Philadelphia_', 'Clevland','Boston_', 'Toronto_', 'Denver_', 'Miami_']
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
    //run the currentGames function 
    //currentGames();

    //when submit button is clicked
    $("#submit").on("click", function () {
        event.preventDefault();

        var input = $("#searchteams").val();

        console.log(input);

        $("#searchteams").val("");

        //appendTeams();
        //appendScores();


    })

    // function appendTeams() {
    //     var team = $("#searchteams").val().toLowerCase();
    //     var apikey2 = ;
    //     var queryURL2 = " " + team + apikey2;
    //     $.ajax({
    //         url: queryURL2,
    //         method: 'GET'
    //     })
    //         .then(function (response){
    //             console.log(response)
    //             //pull team data
    //             var getTeams = response.data
    //             var getScores = response.data

    //             var newCol = $("<td>");
    //             newCol.append(getTeams + getScores);

    //         })
    // }

    // function appendScores() {

    // }

    // //when user first loads page
    // function currentGames() {

    // }


    //betting odds api
    var apiKey = 'f19092ccab23fca0c43360e65380f0b8'
    var queryURL = 'https://api.the-odds-api.com/v3/odds?sport=basketball_nba&region=us&mkt=h2h&mkt=spreads&apiKey='+apiKey
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .then(function (response) {
            console.log(response)
            var fetch = response.data
            for (var i = 0; i < response.data.length; i++) {
                var homeTeam = fetch[i].home_team;
                var fetchSites = fetch[i].sites[i].site_key;
                var fetchOdds = fetch[i].sites[i].odds.spreads.odds;
                var getSpread= fetch[i].sites[i].odds.spreads.points;
                var visitorTeam= fetch[i].teams[0];
                var fetchVOdds= fetchOdds[0];
                var fetchHOdds= fetchOdds[1];
                var getVSpread= getSpread[0];
                var getHSpread= getSpread[1];
                console.log(homeTeam);
                console.log(fetchSites);
                console.log(fetchOdds);
                console.log(getSpread);

                var newRow = $("<tr>");
                var newCol = $("<td>");
                newCol.attr("id", "newcol");
                newCol.append('<br>Home: ' + homeTeam + ' <br>Spread: ' + getHSpread + " <br> Odds: " + fetchHOdds + '<br><br> Visitor: ' + visitorTeam + ' Spread: ' + getVSpread + " <br>Odds: " + fetchVOdds + "Source: " + fetchSites );
                newRow.append(newCol);
                $("#displayOdds").append(newRow);
            }
        });

});
