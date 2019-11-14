
const entryServices = require("../services/entryServices.js")

module.exports = {
	
	getEntryList(req, res) {
		return entryServices.getEntries;
	}

	getEntryById(req, res) {
		return entryServices.getEntryById;
	}

	addEntry(req, res) {
		return entryServices.createEntry;
	}

	updateEntry(req, res) {
		return entryServices.updateEntry;
	}

	deleteEntry(req, res) {
		return entryServices.deleteEntry;
	}

}