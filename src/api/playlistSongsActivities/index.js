const PlaylistSongsActivitiesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistSongsActivities',
  version: '1.0.0',
  register: async (server, { service }) => {
    const playlistSongsActivitiesHandler = new PlaylistSongsActivitiesHandler(service);
    server.route(routes(playlistSongsActivitiesHandler));
  },
};
