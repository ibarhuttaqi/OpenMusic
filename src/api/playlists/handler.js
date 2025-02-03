class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    // this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    // this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { name = 'untitled' } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._service.addPlaylist({
      name, userId: credentialId,
    });

    // console.log('sdafsafasdfsadfdasf', playlistId);

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    // console.log('credentialId', credentialId);
    // console.log('request', request);
    const playlists = await this._service.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  // async getNoteByIdHandler(request, h) {
  //   const { id } = request.params;
  //   const { id: credentialId } = request.auth.credentials;
  //   await this._service.verifyNoteAccess(id, credentialId);

  //   const note = await this._service.getNoteById(id);
  //   return {
  //     status: 'success',
  //     data: {
  //       note,
  //     },
  //   };
  // }

  // async putNoteByIdHandler(request, h) {
  //   this._validator.validateNotePayload(request.payload);
  //   const { id } = request.params;
  //   const { id: credentialId } = request.auth.credentials;
  //   await this._service.verifyNoteAccess(id, credentialId);

  //   await this._service.editNoteById(id, request.payload);

  //   return {
  //     status: 'success',
  //     message: 'Catatan berhasil diperbarui',
  //   };
  // }

  async deletePlaylistByIdHandler(request, h) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyPlaylistOwner(playlistId, credentialId);

    await this._service.deletePlaylistById(playlistId);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }
}

module.exports = PlaylistsHandler;
