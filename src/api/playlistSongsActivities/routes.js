const routes = (handler) => [
  // {
  //   method: 'POST',
  //   path: '/playlists/{playlistId}/activities',
  //   handler: handler.postPlaylistSongActivityHandler,
  //   options: {
  //     auth: 'openmusicapp_jwt',
  //   },
  // },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/activities',
    handler: handler.getPlaylistSongsActivitiesHandler,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
];

module.exports = routes;
