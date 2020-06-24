const db = require('./connection');
const Joi = require('joi');
require('dotenv').config();

const schema = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  subject: Joi.string().required(),
  message: Joi.string().max(500).required(),
  imageUrl: Joi.string().uri({
    scheme: [
      /https?/
    ]
  })
});

const messages = db.get('messages');
const fetch = require('node-fetch');

function getAll() {
  return messages.find();
}
const giphyUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API}=25`;
function insert(msg) {
  if (!msg.username) {
    msg.username = 'Anonymous';
  }
  const result = Joi.validate(msg, schema);
  if (result.error === null) {
    msg.created = new Date();
    if (!msg.imageUrl) {
      insertRandomImage(msg);
    }
    return messages.insert(msg);
  } else {
    return Promise.reject(result.error);
  }
}

function insertRandomImage(msg) {

  let randomUrl = '';
  fetch(giphyUrl)
    .then(res => res.json())
    .then(result => {
      const index = Math.floor(Math.random()*25);
      randomUrl = `https://media2.giphy.com/media/${result.data[index].id}/giphy.webp`;
      msg.imageUrl = randomUrl;
    })

}
module.exports = {
  getAll,
  insert
}
