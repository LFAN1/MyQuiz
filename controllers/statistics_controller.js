var models = require('../models/models.js');

var statistics = {
       	questions: 0,
        comments: 0,
		commented: 0,
		uncommented: 0
 };
   
exports.calcular = function(req, res, next) {

        models.Quiz.count()
        .then(function(questions) {
            statistics.questions = questions;
            return models.Comment.countAll();
        })
        .then(function(comments){
            statistics.comments = comments;
            return models.Comment.countCommented();
        })
        .then(function(commented){
        	statistics.commented = commented;
			statistics.uncommented = statistics.questions - commented;
         })
        .catch(function(error) {next(error)})
        .finally(function(){next()});
};
   
exports.index = function(req, res) {
        res.render('quizes/statistics', {statistics: statistics, errors: []});
 };