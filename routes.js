'use strict';

var teams = [
                {"teamID": "ENG", "name": "England", "is_still_in": true, "matches": [{"opponent": "Sweden", "outcome": "W"}]},
                {"teamID": "FRA", "name": "France", "is_still_in": true, "matches": [{"opponent": "Belgium", "outcome": "W"}]}
            ];


function routes (app) {

    app.route("/").get(function(req,res){
        res.status(200).send("Welcome to RUSSIA 2018 World CUP")
    });

	app.route('/teams')
		.get(function(req,res){
            res.status(200).json(teams);
        })
        .post(function(req,res){
            var newTeam = {"teamID": req.body.teamID, "name": req.body.name, "is_still_in": req.body.is_still_in, "matches": req.body.matches}
            console.log(newTeam);
            teams.push(newTeam);
            res.status(200).send("Team has been saved to the list");
        });
        
    app.route('/teams/:id')
        .get(function(req,res){
            var identifier = req.params.id;
            for(var i = 0; i < teams.length; i++){
                if (teams[i].teamID == identifier) {
                    res.status(200).json(teams[i]);
                }
            }
            res.status(404).end("Unable to find team with the specified ID");
        })
        .put(function(req,res){
            var identifier = req.params.id;
            for(var i = 0; i < teams.length; i++){
                if (teams[i].teamID == identifier) {
                    teams[i].teamID = req.body.teamID;
                    teams[i].name = req.body.name;
                    teams[i].is_still_in = req.body.is_still_in;
                    teams[i].matches = req.body.matches;
                    res.status(200).json(teams[i]);
                }
            }
            res.status(404).end("Unable to find team with the specified ID");  
        });

    app.route('/teams/:idT/matches')
        .post(function(req,res){
            var identifier = req.params.idT;
            for(var i = 0; i < teams.length; i++){
                if(teams[i].teamID == identifier){
                    teams[i].matches.push({"opponent": req.body.opponent, "outcome": req.body.outcome});
                    res.status(200).send("Match has been saved to the list");
                }
            }
            res.status(404).end("Unable to find team with the specified ID");
        });

    app.route('/teams/:idT/matches/:idM')
        .get(function(req,res){
            var teamIdentifier = req.params.idT;
            var matchIdentifier = req.params.idM;
            for(var i = 0; i < teams.length; i++){
                if(teams[i].teamID == teamIdentifier){
                    for(var j = 0; j < teams[i].matches.length; j++){
                        if(teams[i].matches[j].opponent == matchIdentifier)
                            res.status(200).json(teams[i].matches[j]);
                    }
                }
            }
            res.status(404).end("Unable to find team or matches with the specified ID");
        })
        .put(function(req,res){
            var teamIdentifier = req.params.idT;
            var matchIdentifier = req.params.idM;
            for(var i = 0; i < teams.length; i++){
                if(teams[i].teamID == teamIdentifier){
                    for(var j = 0; j < teams[i].matches.length; j++){
                        if(teams[i].matches[j].opponent == matchIdentifier){
                            teams[i].matches[j].opponent = req.body.opponent;
                            teams[i].matches[j].outcome = req.body.outcome;
                            res.status(200).json(teams[i].matches[j])
                        }
                            
                    }
                }
            }
            res.status(404).end("Unable to find team or matches with the specified ID");
        });
};

exports.routes = routes;