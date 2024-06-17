/* eslint-disable class-methods-use-this */
import { PostImagePayload } from './Image.type';
import { apiFileRequestor, apiRequestorNoBaseUrl } from '../requestor';

import { removeQueryParams } from '../Utils';

class ImageService {
  postImage(payload: PostImagePayload) {
    return apiFileRequestor.post('/images/upload', payload);
  }

  putImage(file: File, presignedUrl: string) {
    return apiFileRequestor.put(presignedUrl, file);
  }

  getImage(presignedUrl: string) {
    const cleanUrl = removeQueryParams(presignedUrl); // query params 제거
    return apiRequestorNoBaseUrl.get(cleanUrl);
  }
}

export default new ImageService();
