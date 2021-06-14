const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  createdBy: {
    type: String
  },
  status: {
    type: String
  },
  location:  {
      type: [Number],
      required: true
  }
},{
  timestamps:true
})

module.exports = mongoose.model('post', postSchema)
