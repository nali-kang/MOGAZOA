import ImageService from './Image.service';
import { PostImagePayload } from './Image.type';

const queryKeys = {
  postImage: (image: string) => ['postImage', image] as const,
  putImage: (file: File | null) => ['putImage', { file }] as const,
  getImage: (presignedUrl: string) => ['getImage', presignedUrl] as const,
};

const queryOptions = {
  postImage: (image: string) => ({
    mutationKey: queryKeys.postImage(image),
    mutationFn: (postData: PostImagePayload) => ImageService.postImage(postData),
  }),
  putImage: (file: File | null) => ({
    mutationKey: queryKeys.putImage(file),
    mutationFn: ({ putFile, putPresignedUrl }: { putFile: File; putPresignedUrl: string }) =>
      ImageService.putImage(putFile, putPresignedUrl),
  }),
  getImage: (presignedUrl: string) => ({
    queryKey: queryKeys.getImage(presignedUrl),
    queryFn: () => ImageService.getImage(presignedUrl),
  }),
};

export default queryOptions;
