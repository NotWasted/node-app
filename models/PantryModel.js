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
	itemDescription: {
		type: String,
		required: true,
		trim: true
	},
	unitOfMeasurement: {
		type: String,
	},
	quantity: {
		type: Double
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