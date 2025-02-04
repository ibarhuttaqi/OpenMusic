class PlaylistsSongsHandler {
  constructor(playlistsSongsService, playlistSongsActivitiesService, validator) {
    this._playlistsSongsService = playlistsSongsService;
    this._playlistSongsActivitiesService = playlistSongsActivitiesService;
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getPlaylistSongsHandler = this.getPlaylistSongsHandler.bind(this);
    this.deletePlaylistSongByIdHandler = this.deletePlaylistSongByIdHandler.bind(this);
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsSongsService.verifyPlaylistAccess(playlistId, credentialId);

    const result = await this._playlistsSongsService.addPlaylistSong({
      playlistId, songId,
    });

    try {
      await this._playlistSongsActivitiesService.addPlaylistSongActivity({
        playlistId, songId, userId: credentialId, action: 'add',
      });
    } catch (error) {
      console.log('error', error);
    }

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

    await this._playlistsSongsService.verifyPlaylistAccess(playlistId, credentialId);
    const playlist = await this._playlistsSongsService.getPlaylistSongs(playlistId);

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

    await this._playlistsSongsService.verifyPlaylistAccess(playlistId, credentialId);

    await this._playlistsSongsService.deletePlaylistSongById(playlistId, songId);

    await this._playlistSongsActivitiesService.addPlaylistSongActivity({
      playlistId, songId, userId: credentialId, action: 'delete',
    });

    return {
      status: 'success',
      message: 'Lagu dalam Playlist berhasil dihapus',
    };
  }
}

module.exports = PlaylistsSongsHandler;
