var Skill = require('../models/skill').Skill;
var UserSkill = require('../models/userSkill').UserSkill;
var extend = require('extend');

exports.getUserSkills = function (req, res) {
    // use mongoose to get all todos in the database
    UserSkill.find(function (err, skills) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(skills); // return all todos in JSON format
    });
};
exports.postUserSkill = function (req, res) {
    UserSkill.findById(req.body._id, function (err, skill) {
        if (skill) {
            extend(skill, req.body);
        }
        else {
            skill = new UserSkill(req.body);
        }

        skill.save(function (err, skill) {
            if (err)
                res.send(err);
            else
                res.json(skill);
        });
    });
};
exports.deleteUserSkill = function (req, res) {
    console.log(req.params.skill_id);
    UserSkill.remove({
        _id: req.params.skill_id
    }, function (err) {
        if (err)
            res.send(err);
        else
            res.sendStatus(200);
    });
};

exports.get = function (req, res) {
    // use mongoose to get all todos in the database
    Skill.find(function (err, skills) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(skills); // return all todos in JSON format
    });
};
exports.post = function (req, res) {
    Skill.findById(req.body._id, function (err, skill) {
        if (skill) {
            extend(skill, req.body);
        }
        else {
            skill = new Skill(req.body);
        }

        skill.save(function (err, skill) {
            if (err)
                res.send(err);
            else
                res.json(skill);
        });
    });
};
exports.delete = function (req, res) {
    Skill.remove({
        _id: req.params.skill_id
    }, function (err) {
        if (err)
            res.send(err);
        else
            res.sendStatus(200);
    });
};
