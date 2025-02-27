class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserAlbumLikeHandler = this.postUserAlbumLikeHandler.bind(this);
    this.getUserAlbumLikesHandler = this.getUserAlbumLikesHandler.bind(this);
    this.deleteUserAlbumLikeByIdHandler = this.deleteUserAlbumLikeByIdHandler.bind(this);
  }

  async postUserAlbumLikeHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { albumId } = request.params;

    const userAlbumLikeId = await this._service.addUserAlbumLike(
      {
        userId: credentialId,
        albumId,
      },
    );

    const response = h.response({
      status: 'success',
      message: 'Menambahkan like album',
      data: {
        userAlbumLikeId,
      },
    });
    response.code(201);
    return response;
  }

  async getUserAlbumLikesHandler(request, h) {
    const { albumId } = request.params;
    const { isCache, result: likes } = await this._service.getUserAlbumLikes(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });

    if (isCache) {
      response.header('X-Data-Source', 'cache');
    } else {
      response.header('X-Data-Source', 'not-cache');
    }

    return response;
  }

  async deleteUserAlbumLikeByIdHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { albumId } = request.params;
    await this._service.deleteUserAlbumLikeById(credentialId, albumId);

    return {
      status: 'success',
      message: 'Menghapus like album berdasarkan id',
    };
  }
}

module.exports = AlbumsHandler;
