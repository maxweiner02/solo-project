/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.DB_KEY;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

const { Schema } = mongoose;

const buttonSchema = new Schema({
  text: { type: String, required: true },
  connection: { type: String },
});

const nodeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  text: { type: String, required: true, default: '' },
  locationX: { type: Number, required: true },
  locationY: { type: Number, required: true },
  buttons: [buttonSchema],
});

const Button = mongoose.model('Button', buttonSchema);
const StoryNode = mongoose.model('Story_Nodes', nodeSchema);

module.exports = {
  StoryNode,
  Button,
};
