const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler,
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
    path: '/playlists/{playlistId}',
    handler: handler.deletePlaylistByIdHandler,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
];

module.exports = routes;
