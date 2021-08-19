const mongoose = require('mongoose');
const User = require('./UserModel');

const ItemSchema = mongoose.Schema({
	itemID: {
		type: String,
		required: true,
		trim: true
	},
	itemName: {
		type: String,
		required: true,
		trim: true
	},
	pantryTips: {
		type: Array,
		required: true,
	},
	pantryDates: {
		type: Map,
		required: true,
	}
});

const PantrySchema = mongoose.Schema({
	lastUpdated: {
		type: Date
	}
});

const PantrySnapshotID = mongoose.Schema({
	userID: {
		type: String,
		required: true,
	},
	snapshot: [{
		type: String,
	}],
	date: {
		type: Date,
	}
});