/* eslint-disable class-methods-use-this */
import { PostImagePayload } from './Image.type';
import { apiFileRequestor, apiRequestorNoBaseUrl, apiRequestorToken } from '../requestor';

import { removeQueryParams } from '../Utils';

class ImageService {
  postImage(payload: PostImagePayload) {
    return apiRequestorToken.post('/images/upload', payload);
  }

  putImage(file: File, presignedUrl: string) {
    return apiFileRequestor.put(presignedUrl, file);
  }

  getImage(presignedUrl: string) {
    const cleanUrl = removeQueryParams(presignedUrl); // query params 제거
    return apiRequestorNoBaseUrl.put(cleanUrl);
  }
}

export default new ImageService();
