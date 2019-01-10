$(document).ready(function () {

    // NBA Teams Btn create / append.
    var nbaBtn = ['Lakers', 'Suns', 'Knicks', 'Pacers', 'Spurs', 'Rockets', 'Warriors', 'Kings', 'Clippers', 'Thunder', 'Wizards', 'Timberwolves', 'Hornets', 'Jazz', 'Nets', 'Pistons', 'Trail_Blazers', 'Pelicans', 'Hawks', 'Grizzlies', 'Magic', 'Bucks', 'Bulls', 'Maverics', '76ers', 'Cavaliers', 'Celtics', 'Raptors', 'Nuggets', 'Heat'];
    var nbaCities = ['Los_Angeles_', 'Phoenix_', 'New_York_', 'Indiana_', 'San_Antonio_', 'Houston_', 'Golden_State_', 'Sacramento_', 'Los_Angeles_', 'Oklahoma_City_', 'Washington_', 'Minnisota_', 'Charlotte_', 'Utah_', 'New_Jersey_', 'Detroit_', 'Portland_', 'New_Orleans', 'Atlanta_', 'Memphis_', 'Orlando_', 'Milwaukee_', 'Chicago_', 'Dallas_', 'Philadelphia_', 'Clevland', 'Boston_', 'Toronto_', 'Denver_', 'Miami_']
    var teamNameId = [];
    for (var z = 0; z < nbaBtn.length; z++) {
        teamNameId.push(nbaCities[z] + nbaBtn[z]);
    };
    getScoreboard();
    function appendBtn(array, array2, appendHere) {
        for (var i = 0; i < array.length; i++) {
            appendHere;
            var btns = $('<button>');
            btns.attr('id', array[i]);
            btns.attr('value', array2[i] + array[i]);
            btns.addClass('btn-dark');
            btns.text(array[i]);
            appendHere.append(btns);
        }
    };
    appendBtn(nbaBtn, nbaCities, $(".nbateams"));
    function getScoreboard() {
        teamNameId;
        // console.log(teamNameId);
        getTeamId();
        function getTeamId() {
            localStorage.setItem('teams', teamNameId);
            localStorage.getItem('teamSelected');
            for (var u = 0; u < teamNameId.length; u++) {
                var queryURL = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=' + teamNameId[u];
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    //  console.log(response);
                    var teamId = response.teams[0].idTeam;
                    //  console.log('teamId- ' + teamId);
                    teamNum = u
                    pullHeader(teamId);
                });
            }
        };
        function pullHeader(teamId) {
            // console.log(teamId);
            var queryURL3 = "https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=" + teamId;
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (response3) {
                //  console.log(response3);
                var appendHere = $('.carousel-inner')
                for (var i = 0; i < response3.results.length; i++) {
                    var item = $('<div>');
                    item.addClass('carousel-item');
                    var container = $('<div>');
                    container.addClass('container');
                    container.attr('id', 'scoreboard');
                    var row = $('<div>');
                    row.addClass('row');
                    var home = response3.results[i].strHomeTeam;
                    var homeScore = response3.results[i].intHomeScore;
                    var away = response3.results[i].strAwayTeam;
                    var awayScore = response3.results[i].intAwayScore;
                    var gameDate = response3.results[i].dateEvent;
                    var date = new Date(gameDate);
                    // var month = date.getMonth() + 1;
                    // var day = date.getDate();
                    // var year = date.getFullYear();
                    var weekday= date.getDay();
                    var days= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    var dayOfWeek= days[weekday];
                    
                    // var displayDate = month + '-' + day + '-' + year;
                    appendItems(homeScore, awayScore);
                    function appendItems(homeScore, awayScore) {
                        if (homeScore >= awayScore) {
                            var scoreboardArray = ('<strong>' + home + '</strong>' + '<div id= "scoreC">' + homeScore + '</div>' + '<strong>' + ' Vs.' + '</strong>' + '<strong>' + away + '</strong>' + '<div id= "scoreI">' + awayScore + '</div>' + '<strong>' + ' Last - ' + dayOfWeek + '</strong>');
                        }else if (awayScore >= homeScore){
                            var scoreboardArray = ('<strong>' + home + '</strong>' + '<div id= "scoreI">' + homeScore + '</div>' + '<strong>' + ' Vs.' + '</strong>' + '<strong>' + away + '</strong>' + '<div id= "scoreC">' + awayScore + '</div>' + '<strong>' + ' Last - ' + dayOfWeek + '</strong>');
                        }
                        row.html(scoreboardArray);
                        container.append(row)
                        item.html(container)
                        appendHere.append(item);
                    }
                }
            });
        };
    };
    //Hide Buttons 
    function hidebuttons(selectedGroup, question) {
        if (question === true) {
            console.log("Hiding- " + selectedGroup)
            selectedGroup.hide()
        } else if (question === false) {
            console.log("Showing- " + selectedGroup)
            selectedGroup.show()
        }
    }
    hidebuttons($('#logout'), true);
    hidebuttons($('#signup'), false);

    //Show Password
    $("#showPassword").on('click', function () {
        if (showPassword.checked === true) {
            $('#password').attr('type', "text");
            $('#passwordAttempt').attr('type', 'text');
            console.log('showing password')
        } else {
            $('#password').attr('type', "password");
            $('#passwordAttempt').attr('type', 'password');
        }
    });

    //NBA Btn on click function
    var selectedTeams = [];
    var teamCount = 0
    $('button').click(function () {
        selectedTeams;
        teamCount;
        if (this.id === 'removeSelected') {
            return
        } else if (this.id === 'submit') {
            return
        } else if (this.id === 'submitTeam') {
            return
        };
        teamCount++
        if (teamCount <= 5) {
            selectedTeams.push($(this).val());
            $(this).attr('disabled', 'disabled');
            var teamname = this.id;
            var team = $('<h3>');
            team.addClass('selectedTeam');
            team.text(teamname);
            $('#selectedTeams').append(teamCount + '. ' + teamname + ' <br>');
        }else {
            return
        }
    });

    // Remove teams on click function
    $('#removeSelected').click(function () {
        $('p').text(' ');
        $('button').removeAttr('disabled');
        selectedTeams = [];
        teamCount = 0
    });

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBhI9rPJEX8w3KJI7Xfl5AA2r6OmuUxGCM",
        authDomain: "project-profile-c0267.firebaseapp.com",
        databaseURL: "https://project-profile-c0267.firebaseio.com",
        projectId: "project-profile-c0267",
        storageBucket: "project-profile-c0267.appspot.com",
        messagingSenderId: "136887813838"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    //Submit Btn on click function
    $("#submit").on("click", function () {
        window.location = 'signin.html'
        var firstName = $('#fName').val();
        var lastName = $('#lName').val();
        var email = $('#email').val();
        var userName = $("#user").val();
        var password = $('#password').val();
        database.ref('/user').push({
            userProfile: {
                userName: userName,
                acctInfo: {
                    first: firstName,
                    last: lastName,
                    email: email,
                    favoriteTeam: {
                        teamName: selectedTeams
                    },
                    SecureNoAccess: {
                        password: password
                    }
                }
            }
        })
    });

    //Username Pull
    var accountData = [];
    var usernames = [];
    var passwords = [];
    var userIndex = 0;
    var query = firebase.database().ref("user").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                passwords.push(childData.userProfile.acctInfo.SecureNoAccess.password);
                usernames.push(childData.userProfile.userName);
                accountData.push(childData.userProfile)
                console.log(passwords);
                console.log(usernames);
                console.log(accountData);
            });
        });

    // Username and Password checker.
    $('#login').on('click', function () {
        console.log(usernames);
        var userAttempt = $('#userAttempt').val();
        var passwordAttempt = $('#passwordAttempt').val();
        for (var i = 0; i < usernames.length; i++) {
            if (userAttempt === usernames[i]) {
                console.log('correct username');
                if (passwords[i] === passwordAttempt) {
                    hidebuttons($('#logout'), false);
                    hidebuttons($('#signup'), true);
                    console.log('correct password');
                    userIndex = i;
                    var currentUser = accountData[i];
                    console.log('Active User: ' + JSON.stringify(currentUser.userName));
                    localStorage.setItem('loggedInInfo', currentUser);
                    var userFirstLast = currentUser.acctInfo.first + ' ' + currentUser.acctInfo.last;
                    localStorage.setItem('firstLastName', userFirstLast);
                    console.log(localStorage.getItem('firstLastName'));
                    for (var i = 0; i < currentUser.acctInfo.favoriteTeam.teamName.length; i++) {
                        var favTeams = currentUser.acctInfo.favoriteTeam.teamName[i];
                        console.log('fav team: ' + favTeams);
                        localStorage.setItem('favTeams' + i, currentUser.acctInfo.favoriteTeam.teamName[i]);
                        console.log(localStorage.getItem('favTeams' + i));
                        var favoriteTeams = 0;
                        if (favoriteTeams <= i) {
                            favoriteTeams = i;
                        }
                    }
                    window.location = 'dashboard.html';
                    getDashboard(favoriteTeams);
                }
                else {
                    console.log('wrong password');
                    return false
                };
            }
            else if (userAttempt !== usernames[i]) {
                // console.log('error username does not match: ' + i)
            };
        };
    });
   $('#viewProfile').ready(function() {
        getDashboard()
    });
    function getDashboard() {
        var userDashName = localStorage.getItem('firstLastName');
        console.log(userDashName);
        // add code to put welcome on dash\
        var welcomeDiv = $('#welcomeUser');
        var welcomeP = $('<p>')
        welcomeP.text('Welcome ' + userDashName + '!');
        welcomeDiv.html(welcomeP)
        for (var i = 0; i <= 5; i++) {
            var userTeams = localStorage.getItem('favTeams' + i);

            if (userTeams === null) {
                return
            } else {
                userTeams = userTeams
            }
            // console.log(userTeams);
            // add code to put user teams stats and betting odds
            getTeamId(userTeams);

            // PREVIOUS GAMES ADDED TO DASBOARD
            function getTeamId() {
                var queryURL = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=' + userTeams;
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    var teamId = response.teams[0].idTeam;
                    console.log('teamId- ' + teamId);
                    pullGames(teamId);
                });
            };

            function pullGames(teamId) {
                var queryURL2 = "https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=" + teamId;
                $.ajax({
                    url: queryURL2,
                    method: "GET"
                }).then(function (response2) {
                    console.log(response2)
                    var homeDiv = $('#home');
                    var awayDiv = $('#away');
                    var scoreDiv = $('#score');
                    var dateDiv = $('#date');
                    for (var i = 0; i < response2.results.length; i++) {
                        var home = response2.results[i].strHomeTeam;
                        var homeScore = response2.results[i].intHomeScore;
                        var away = response2.results[i].strAwayTeam;
                        var awayScore = response2.results[i].intAwayScore;
                        var gameDate = response2.results[i].dateEvent;
                        var date = new Date(gameDate);
                        var month = date.getMonth() + 1;
                        var day = date.getDate() ;
                        var year = date.getFullYear() ;
                        var displayDate = month + '-' + day + '-' + year;
                        var score = homeScore + ' - ' + awayScore
                        var homeTeam = $('<p>');
                        homeTeam.attr('scope', 'row');
                        homeTeam.attr('id', 'hometeam' + i)
                        homeTeam.text(home);
                        homeDiv.append(homeTeam);
                        var scoreTeam = $('<p>');
                        scoreTeam.text(score);
                        scoreDiv.append(scoreTeam);
                        var dateTeam = $('<p>');
                        dateTeam.text(displayDate);
                        dateDiv.append(dateTeam);
                        var awayTeam = $('<p>');
                        awayTeam.text(away);
                        awayDiv.append(awayTeam);
                        console.log(home)
                    }
                });
            };
        };
    };
});

$('#logout').on('click', function () {
    localStorage.clear();
    hidebuttons($('#logout'), true);
    hidebuttons($('#signup'), false);
    //return to home screen
});


