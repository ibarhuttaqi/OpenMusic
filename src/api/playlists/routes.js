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
      auth: 'notesapp_jwt',
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
  // {
  //   method: 'DELETE',
  //   path: '/notes/{id}',
  //   handler: handler.deleteNoteByIdHandler,
  //   options: {
  //     auth: 'notesapp_jwt',
  //   },
  // },
];

module.exports = routes;
