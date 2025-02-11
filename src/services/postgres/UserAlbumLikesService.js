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
    // Cek apakah album ini ada
    const albumQuery = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [albumId],
    };
    const albumResult = await this._pool.query(albumQuery);

    if (!albumResult.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }

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

    try {
      const result = await this._pool.query(query);
      if (!result.rows[0].id) {
        throw new InvariantError('Like gagal ditambahkan');
      }

      return result.rows[0].id;
    } catch (error) {
      console.log('error : ', error);
      return error;
    }
  }

  async getUserAlbumLikes(albumId) {
    const UserAlbumLikesQuery = {
      text: 'SELECT CAST(COUNT(*) AS INTEGER) FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };
    const UserAlbumLikesResult = await this._pool.query(UserAlbumLikesQuery);

    if (!UserAlbumLikesResult.rowCount) {
      throw new NotFoundError('Belum ada yang menyukai album ini');
    }

    return UserAlbumLikesResult.rows[0].count;
  }

  async deleteUserAlbumLikeById(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Like gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = UserAlbumLikesService;
