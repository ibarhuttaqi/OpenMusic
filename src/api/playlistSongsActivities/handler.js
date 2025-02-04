class PlaylistsSongsActivitiesHandler {
  constructor(service) {
    this._service = service;

    this.getPlaylistSongsActivitiesHandler = this.getPlaylistSongsActivitiesHandler.bind(this);
  }

  async getPlaylistSongsActivitiesHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this._service.verifyPlaylistOwner(playlistId, credentialId);

    const activities = await this._service.getPlaylistSongsActivities(playlistId);

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
