const mongoose = require('mongoose');

const FoodShelfLifeSchema = mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: false
  },
  storage: {

  },
  shelfLife: {
    
  },
  unitOfTime: {

  }
})