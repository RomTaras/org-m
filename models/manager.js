const mongoose = require('mongoose');

// Companies Schema
const CompanySchema = mongoose.Schema({
	parentCompany:{
		type: String
	},
	
    childCompaies:{
    	type: String
    },

	earnings:{
		type: String,
		required: true
	}
});

const Companies = module.exports = mongoose.model('Companies', CompanySchema);

// Get Companies
module.exports.getCompanies = (callback, limit) => {
	Companies.find(callback).limit(limit);
}

// Get Company
module.exports.getCompanyById = (id, callback) => {
	Companies.findById(id, callback);
}

// Add Company
module.exports.addCompany = (company, callback) => {
	Companies.create(company, callback);
}

// Update Company
module.exports.updateCompany = (id, company, options, callback) => {
	var query = {_id: id};
	var update = {
		parentCompany: company.parentCompany,
		childCompaies: company.childCompaies,
		earnings: company.earnings
		
	}
	Companies.findOneAndUpdate(query, update, options, callback);
}

// Delete Companies
module.exports.removeCompany = (id, callback) => {
	var query = {_id: id};
	Companies.remove(query, callback);
}
