const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());


Companies =require('./models/manager');

// Connect to Mongoose
//mongoose.connect('mongodb://localhost/manager');

mongoose.connect('mongodb://admin:admin@ds131312.mlab.com:31312/manager');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/Companiess');
});


app.get('/api/companies', (req, res) => {
	Companies.getCompanies((err, companies) => {
		if(err){
			throw err;
		}
		res.json(companies);
	});
});

app.get('/api/companies/:_id', (req, res) => {
	Companies.getCompanyById(req.params._id, (err, company) => {
		if(err){
			throw err;
		}
		res.json(company);
	});
});

app.post('/api/companies', (req, res) => {
	var company = req.body;
	Companies.addCompany(company, (err, company) => {
		if(err){
			throw err;
		}
		res.json(company);
	});
});

app.put('/api/companies/:_id', (req, res) => {
	var id = req.params._id;
	var company = req.body;
	Companies.updateCompany(id, company, {}, (err, company) => {
		if(err){
			throw err;
		}
		res.json(company);
	});
});

app.delete('/api/companies/:_id', (req, res) => {
	var id = req.params._id;
	Companies.removeCompany(id, (err, company) => {
		if(err){
			throw err;
		}
		res.json(company);
	});
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log('Listening to port:  ' + port);
});
