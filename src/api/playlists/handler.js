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
    this._validator.validateNotePayload(request.payload);
    const { name = 'untitled' } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const noteId = await this._service.addPlaylist({
      name, userId: credentialId,
    });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        noteId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
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
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyPlaylistOwner(id, credentialId);

    await this._service.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }
}

module.exports = PlaylistsHandler;
