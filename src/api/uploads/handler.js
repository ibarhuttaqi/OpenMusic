class UploadsHandler {
  constructor(storageService, albumsService, validator) {
    this._storageService = storageService;
    this._albumsService = albumsService;
    this._validator = validator;

    this.postUploadCoverHandler = this.postUploadCoverHandler.bind(this);
  }

  async postUploadCoverHandler(request, h) {
    const { cover } = request.payload;
    this._validator.validateCoverHeaders(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const fileUrl = `http://${process.env.HOST}:${process.env.PORT}/upload/covers/${filename}`;

    const { albumId } = request.params;
    try {
      await this._albumsService.editAlbumCoverById(albumId, fileUrl);
    } catch (error) {
      console.log('error : ', error);
    }

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
      data: {
        // Maka fileLocation akan bernilai:`http://localhost:3000/upload/cover/${filename}`
        fileLocation: fileUrl,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
