const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postNoteHandler,
  },
  {
    method: 'GET',
    path: '/albums',
    handler: handler.getNotesHandler,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteNoteByIdHandler,
  },
];

module.exports = routes;
