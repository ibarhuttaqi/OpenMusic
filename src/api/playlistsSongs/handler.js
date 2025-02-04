class PlaylistsSongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getPlaylistSongsHandler = this.getPlaylistSongsHandler.bind(this);
    // this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    // this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deletePlaylistSongByIdHandler = this.deletePlaylistSongByIdHandler.bind(this);
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistAccess(playlistId, credentialId);

    const result = await this._service.addPlaylistSong({
      playlistId, songId,
    });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke dalam Playlist',
      data: {
        playlistSongId: result,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this._service.verifyPlaylistAccess(playlistId, credentialId);
    const playlist = await this._service.getPlaylistSongs(playlistId);

    // console.log({
    //   status: 'success',
    //   data: {
    //     playlists,
    //   },
    // });

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongByIdHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistAccess(playlistId, credentialId);

    await this._service.deletePlaylistSongById(playlistId, songId);

    return {
      status: 'success',
      message: 'Lagu dalam Playlist berhasil dihapus',
    };
  }
}

module.exports = PlaylistsSongsHandler;
