const db = require('./connection');
const Joi = require('joi');

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

function getAll() {
  return messages.find();
}

function insert(msg) {
  if (!msg.username) {
    msg.username = 'Anonymous';
  }
  const result = Joi.validate(msg, schema);
  if (result.error === null) {
    msg.created = new Date();
    return messages.insert(msg);
  } else {
    return Promise.reject(result.error);
  }
}

module.exports = {
  getAll,
  insert
}
