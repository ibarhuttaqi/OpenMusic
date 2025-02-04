class PlaylistsSongsActivitiesHandler {
  constructor(service) {
    this._service = service;

    // this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getPlaylistSongsActivitiesHandler = this.getPlaylistSongsActivitiesHandler.bind(this);
  }

  // async postPlaylistSongHandler(request, h) {
  //   // this._validator.validatePlaylistSongPayload(request.payload);
  //   const { playlistId } = request.params;
  //   const { songId } = request.payload;
  //   const { id: credentialId } = request.auth.credentials;

  //   await this._service.verifyPlaylistAccess(playlistId, credentialId);

  //   const result = await this._service.addPlaylistSong({
  //     playlistId, songId,
  //   });

  //   const response = h.response({
  //     status: 'success',
  //     message: 'Lagu berhasil ditambahkan ke dalam Playlist',
  //     data: {
  //       playlistSongId: result,
  //     },
  //   });
  //   response.code(201);
  //   return response;
  // }

  async getPlaylistSongsActivitiesHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    // console.log('playlistId', playlistId);
    // console.log('credentialId', credentialId);

    await this._service.verifyPlaylistOwner(playlistId, credentialId);

    // await this._service.verifyPlaylistAccess(playlistId, credentialId);
    const activities = await this._service.getPlaylistSongsActivities(playlistId);

    // console.log({
    //   status: 'success',
    //   data: {
    //     playlists,
    //   },
    // });

    return {
      status: 'success',
      data: {
        playlistId,
        activities,
      },
    };
  }
}

module.exports = PlaylistsSongsActivitiesHandler;
