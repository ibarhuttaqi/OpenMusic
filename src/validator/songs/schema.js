const Joi = require('joi');

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.number().required(),
  performer: Joi.string().required(),
  duration: Joi.number().optional(),
  albumId: Joi.string().optional(),
});

module.exports = { SongPayloadSchema };
