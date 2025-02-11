const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');

class UserAlbumLikesService {
  constructor() {
    this._pool = new Pool();
  }

  async addUserAlbumLike({ userId, albumId }) {
    // Cek apakah user sudah menyukai album ini
    const checkQuery = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const checkResult = await this._pool.query(checkQuery);
    if (checkResult.rowCount > 0) {
      throw new ClientError('Anda sudah menyukai album ini');
    }

    const id = `like-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Like gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getUserAlbumLikes(albumId) {
    const UserAlbumLikesQuery = {
      text: 'SELECT COUNT(*) FROM user_album_likes WHERE id = $1',
      values: [albumId],
    };
    const UserAlbumLikesResult = await this._pool.query(UserAlbumLikesQuery);

    if (!UserAlbumLikesResult.rowCount) {
      throw new NotFoundError('Belum ada yang menyukai album ini');
    }

    return UserAlbumLikesResult.rows[0].count;
  }

  async deleteUserAlbumLikeById(albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE id = $1 RETURNING id',
      values: [albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Like gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = UserAlbumLikesService;
