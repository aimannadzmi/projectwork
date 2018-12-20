var teamId = '';

            function getTeamId() {
                // var teamName = $('#input').val().trim();
                var queryURL = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=Los_Angeles_Lakers';

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    
                    teamId = response.teams[0].idTeam;
                    console.log(response.teams[0].idTeam)
                    console.log(teamId)
                })


            }

            getTeamId();


            function pullGames() {

                
                var queryURL = "https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=134867";


                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    
                    for (var i = 0; i < response.results.length; i++) {
                        var newGame = $('<div>');

                        var game = response.results[i].strFilename;
                        var home = response.results[i].strHomeTeam + ": " + response.results[i].intHomeScore;
                        var away = response.results[i].strAwayTeam + ": " + response.results[i].intAwayScore;
                        newGame.html(game + '<br>' + home + '<br>' + away);

                        $('.currentGames').append(newGame)
                    }

                })


                
            }


            pullGames();