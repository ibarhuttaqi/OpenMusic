const Joi = require('joi');

const PlaylistSongActivityPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { PlaylistSongActivityPayloadSchema };
