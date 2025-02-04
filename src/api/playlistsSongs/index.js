const PlaylistsSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsSongs',
  version: '1.0.0',
  register: async (server, { playlistsSongsService, playlistSongsActivitiesService, validator }) => {
    const playlistsSongsHandler = new PlaylistsSongsHandler(playlistsSongsService, playlistSongsActivitiesService, validator);
    server.route(routes(playlistsSongsHandler));
  },
};
