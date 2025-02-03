const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: handler.postPlaylistSongHandler,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: handler.getPlaylistSongsHandler,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
  // {
  //   method: 'GET',
  //   path: '/notes/{id}',
  //   handler: handler.getNoteByIdHandler,
  //   options: {
  //     auth: 'notesapp_jwt',
  //   },
  // },
  // {
  //   method: 'PUT',
  //   path: '/notes/{id}',
  //   handler: handler.putNoteByIdHandler,
  //   options: {
  //     auth: 'notesapp_jwt',
  //   },
  // },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: handler.deletePlaylistSongByIdHandler,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
];

module.exports = routes;
