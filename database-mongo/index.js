var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Authors');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var authorSchema = mongoose.Schema({
  name: String,
  books: String

});

var Author = mongoose.model('Author', authorSchema);

var selectAll = function(callback) {
  Author.find({}, function(err, Authors) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, Authors);
    }
  });
};
var save = function(data,callback){
  var author = new Author(data)
  author.save(function(err,dataRes){
    if(err){
      callback(err)
    }
    callback(dataRes)
  })
};

module.exports.Author = Author;
module.exports.selectAll = selectAll;
module.exports.save = save;
