class PlaylistsSongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    // this.getNotesHandler = this.getNotesHandler.bind(this);
    // this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    // this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    // this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async postPlaylistSongHandler(request, h) {
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

  async getPlaylistSongsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistSongByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyPlaylistOwner(id, credentialId);

    await this._service.deletePlaylistSongById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }
}

module.exports = PlaylistsSongsHandler;
