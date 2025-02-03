const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistsSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSong({
    playlistsId, songId,
  }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO playlists_songs VALUES($1, $2) RETURNING id',
      values: [id, playlistsId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Musik gagal ditambahkan ke Playlist');
    }

    return result.rows[0].id;
  }

  async getPlaylistSongs({ playlistId }) {
    const playlistQuery = {
      text: 'SELECT playlists.id, playlists.name, users.username FROM playlists JOIN users ON playlists.user_id = users.id WHERE playlists.user_id = $1',
      values: [playlistId],
    };

    const playlistResult = await this._pool.query({ playlistQuery });

    if (!playlistResult.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const songsQuery = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM songs JOIN playlists_songs ON songs.id = playlists_songs.song_id WHERE playlists_songs.playlist_id = $1',
      values: [playlistId],
    };
    const songsResult = await this._pool.query(songsQuery);

    return {
      id: playlistResult.rows[0].id,
      name: playlistResult.rows[0].name,
      username: playlistResult.rows[0].username,
      songs: songsResult.rows,
    };
  }

  async deletePlaylistSongById(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlists_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu dalam Playlist gagal dihapus. Id tidak ditemukan');
    }
  }

  async verifyCollaborator(playlistId, userId) {
    const query = {
      text: 'SELECT * FROM playlists_songs JOIN playlists ON playlists.id = playlists_songs.playlist_id WHERE playlists_songs.playlist_id = $1 AND playlists.user_id = $2',
      values: [playlistId, userId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Kolaborasi gagal diverifikasi');
    }
  }
}

module.exports = PlaylistsSongsService;
