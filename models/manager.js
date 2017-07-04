const mongoose = require('mongoose');

// Companies Schema
const CompanySchema = mongoose.Schema({
	companyName:{
		type: String
	},
	
    parentCompany:{
    	type: String
    },

	earnings:{
		type: Number,
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
	
	if(!company.parentCompany){
		company.parentCompany = 0;
	}
	Companies.create(company, callback);
}

// Update Company
module.exports.updateCompany = (id, company, options, callback) => {
	var query = {_id: id};
	var update = {
		companyName: company.companyName,
		parentCompany: company.parentCompany,
		earnings: company.earnings
		
	}
	Companies.findOneAndUpdate(query, update, options, callback);
}

// Delete Companies
module.exports.removeCompany = (id, callback) => {
	var query = {_id: id};
	Companies.remove(query, callback);
}
