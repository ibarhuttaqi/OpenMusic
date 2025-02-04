const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistSongsActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSongActivity({
    playlistId, songId, userId, action,
  }) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_songs_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, action, time],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Aktifitas Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylistSongsActivities(playlistId) {
    const playlistQuery = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const playlistResult = await this._pool.query(playlistQuery);
    if (!playlistResult.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const query = {
      text: `SELECT users.username, songs.title, playlist_songs_activities.action, playlist_songs_activities.time
        FROM playlist_songs_activities 
        JOIN songs ON playlist_songs_activities.song_id = songs.id 
        JOIN users ON playlist_songs_activities.user_id = users.id
        WHERE playlist_songs_activities.playlist_id = $1`,
      values: [playlistId],
    };
    // console.log('query', query);

    const result = await this._pool.query(query);
    // console.log('cvbcbxcbcxbxb', result.rows);

    return result.rows;
  }

  async verifyPlaylistOwner(playlistId, userId) {
    const query = {
      text: 'SELECT * FROM playlists WHERE playlists.id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const playlist = result.rows[0];

    if (playlist.user_id !== userId) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = PlaylistSongsActivitiesService;
