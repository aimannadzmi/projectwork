$( document ).ready(function() {
    
    //run the currentGames function 
    currentGames();

    //when submit button is clicked
    $("#submit").on("click", function(){
        event.preventDefault();
        
        var input = $("#searchteams").val();
        
        console.log(input);
        
        $("#searchteams").val("");

        //appendTeams();
        //appendScores();
        

    })

function appendTeams() {
    var team = $("#searchteams").val().toLowerCase();
    var apikey2 = ;
    var queryURL2 = " " + team + apikey2;
    $.ajax({
        url: queryURL2,
        method: 'GET'
    })
        .then(function (response){
            console.log(response)
            //pull team data
            var getTeams = response.data
            var getScores = response.data
            
            var newCol = $("<td>");
            newCol.append(getTeams + getScores);

        })
}

function appendScores() {

}

//when user first loads page
function currentGames() {

}


//betting odds api
var apiKey = '42ae06dd17e454fc09825d38b8ab43b6'
var queryURL = 'https://api.the-odds-api.com/v3/odds?sport=basketball_nba&region=us&mkt=h2h&apiKey=42ae06dd17e454fc09825d38b8ab43b6'
$.ajax({
    url: queryURL,
    method: 'GET'
})
    .then(function (response) {
        console.log(response)
        var fetch = response.data
        for (var i = 0; i < fetch.length; i++) {
            var fetchSites = fetch[i].sites[i].site_key;
            console.log(fetchSites)
            var fetchOdds = fetch[i].sites[i].odds.h2h
            console.log(fetchOdds)

            var newRow = $("<tr>");
            var newCol = $("<td>");
            newCol.attr("id", "newcol");
            newCol.append("Source: " + fetchSites + " Odds: " + fetchOdds);
            newRow.append(newCol);
            $("#displayOdds").append(newRow);
        }
    });

});
