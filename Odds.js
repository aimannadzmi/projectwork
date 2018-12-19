var apiKey = '42ae06dd17e454fc09825d38b8ab43b6'
var queryURL = 'https://api.the-odds-api.com/v3/odds?sport=basketball_nba&region=us&mkt=h2h&apiKey=42ae06dd17e454fc09825d38b8ab43b6'
$.ajax({
    url: queryURL,
    method: 'GET'
})
    .then (function(response) {
        console.log(response)
        var fetch= response.data
for (var i=0; i< fetch.length; i++){
            var fetchSites = fetch[i].sites[i].site_key;
            console.log(fetchSites)
            var fetchOdds= fetch[i].sites[i].odds.h2h
            console.log(fetchOdds)

}
            
    });

//----create new div to store Odds and append to displayOdds div.
// var newDiv = $("<div>");
// newDiv.attr("class", );
// newDiv.append(fetchSites);
// newDiv.append(fetchOdds);
// $("#displayOdds").append(newDiv);
// var fetchOdds = response.data[i].sites[i].h2h

