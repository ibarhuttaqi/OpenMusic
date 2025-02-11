const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{albumId}/likes',
    handler: handler.postAlbumHandler,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/albums/{albumId}/likes',
    handler: handler.getAlbumByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{albumId}/likes',
    handler: handler.deleteAlbumByIdHandler,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
];

module.exports = routes;
