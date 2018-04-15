var express = require('express');
var bodyParser = require('body-parser');
var app = express();
 var authors = require('../database-mongo');


app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())


app.post('/adding',function(req,res) {
	console.log(req.body)
	var auth = new authors.Author ({
		name: req.body.newAuthor,
		books: req.body.books
	})
	auth.save()
  res.send('success')
})

app.post('/searching', function (req, res) {
   authors.Author.find({name : req.body.oldAuthor},function(err,Authors) {
   console.log(Authors)
    res.send(Authors)
  })

});

app.get('/searching',function(req,res) {
	//console.log(req.body)
	authors.Author.find({name : req.body.oldAuthor},function(err,data) {
		if (err) {
			res.sendStatus(500);
		} else {
			//console.log('name',this.req.body.name)
			if (req.body.name === data.name) {
				
			res.json(data);
			}
			
		}
	})
})

app.get('/',function(req,res){
	res.send()
})
app.listen(3000, function() {
  console.log('listening on port 3000!');
});

